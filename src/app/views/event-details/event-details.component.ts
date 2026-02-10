import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { loadStripe, Stripe, StripeElements, StripePaymentElement } from '@stripe/stripe-js';

import { PageHeroComponent } from '@/app/shared/components/page-hero/page-hero.component';
import { FormattersService } from '@/app/shared/service/formatters.service';
import { SHARED_IMPORTS } from '@/app/shared/shared-imports';
import { environment } from '@/environments/environment';
import { Event as GymEvent, EventTicket } from '@core/models/event.models';
import { AuthService } from '@core/services/auth.service';
import { EventService } from '@core/services/event.service';
import { ToastService } from '@core/services/toast.service';

@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, PageHeroComponent, ...SHARED_IMPORTS],
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss'],
})
export class EventDetailsComponent implements OnInit, AfterViewInit, OnDestroy {
  eventId!: string;
  eventData: GymEvent | null = null;

  loading = false;
  purchaseLoading = false;
  purchaseQuantity = 1;
  guestName = '';
  guestEmail = '';
  guestPhone = '';
  guestTicketId: string | null = null;
  guestCancelToken: string | null = null;
  guestPurchaseComplete = false;
  private guestSuccessTimeoutId: number | null = null;

  // Stripe + payment modal state
  showPaymentModal = false;
  stripeClientSecret: string | null = null;
  pendingTicket: EventTicket | null = null;
  paymentError: string | null = null;
  isProcessingPayment = false;

  stripe: Stripe | null = null;
  elements: StripeElements | null = null;
  paymentElement: StripePaymentElement | null = null;

  @ViewChild('paymentElementRef') paymentElementRef!: ElementRef<HTMLDivElement>;

  placeholderImage = 'assets/img/placeholder.jpg';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventService: EventService,
    private toast: ToastService,
    private authService: AuthService,
    public formatters: FormattersService
  ) {}

  async ngOnInit(): Promise<void> {
    const id = this.route.snapshot.paramMap.get('id');
    this.eventId = id || '';

    if (!this.eventId) {
      this.toast.error('Invalid event.');
      this.router.navigate(['/events']);
      return;
    }

    this.loadEvent();
    this.stripe = await loadStripe(environment.stripePublishableKey);
  }

  ngAfterViewInit(): void {}

  ngOnDestroy(): void {
    if (this.paymentElement) {
      this.paymentElement.unmount();
    }
    if (this.guestSuccessTimeoutId) {
      window.clearTimeout(this.guestSuccessTimeoutId);
    }
  }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  get isGuestFormValid(): boolean {
    return (
      this.guestName.trim().length > 0 &&
      this.guestEmail.trim().length > 0 &&
      this.guestPhone.trim().length > 0
    );
  }

  get isFree(): boolean {
    const price = Number(this.eventData?.ticket_price);
    return !isNaN(price) && price <= 0;
  }

  get isSoldOut(): boolean {
    return !!this.eventData?.is_sold_out || (this.eventData?.remaining_tickets ?? 0) <= 0;
  }

  get priceLabel(): string {
    if (!this.eventData) return '';
    const formatted = this.formatters.formatCurrency(this.eventData.ticket_price);
    return this.isFree ? 'Free' : formatted || 'Free';
  }

  get dateLabel(): string {
    return this.eventData ? this.formatters.formatEventDate(this.eventData.start_datetime) : '';
  }

  get timeRangeLabel(): string {
    if (!this.eventData) return '';
    return this.formatters.formatEventTimeRange(
      this.eventData.start_datetime,
      this.eventData.end_datetime
    );
  }

  private loadEvent(): void {
    this.loading = true;
    this.eventService.getEvent(this.eventId).subscribe({
      next: (event) => {
        this.eventData = event;
        this.loading = false;
        this.purchaseQuantity = 1;
      },
      error: () => {
        this.loading = false;
        this.toast.error('Unable to load this event.');
        this.router.navigate(['/events']);
      },
    });
  }

  adjustQuantity(delta: number): void {
    const current = Number(this.purchaseQuantity) || 1;
    const max = this.eventData?.remaining_tickets;
    const upperBound = max != null ? Math.max(max, 1) : Number.MAX_SAFE_INTEGER;
    const next = Math.min(Math.max(current + delta, 1), upperBound);
    this.purchaseQuantity = next;
  }

  onQuantityChange(value: any): void {
    const parsed = Math.floor(Number(value));
    const max = this.eventData?.remaining_tickets;
    const upperBound = max != null ? Math.max(max, 1) : Number.MAX_SAFE_INTEGER;
    if (!parsed || parsed < 1) {
      this.purchaseQuantity = 1;
      return;
    }
    this.purchaseQuantity = Math.min(parsed, upperBound);
  }

  async purchaseTickets(): Promise<void> {
    if (!this.eventData) return;

    const isGuest = !this.isLoggedIn;
    if (isGuest && !this.isGuestFormValid) {
      this.toast.error('Please enter your name, email, and phone number.');
      return;
    }
    if (isGuest) {
      this.guestPurchaseComplete = false;
      this.guestTicketId = null;
      this.guestCancelToken = null;
    }

    if (this.isSoldOut) {
      this.toast.error('This event is sold out.');
      return;
    }

    const max = this.eventData.remaining_tickets ?? this.purchaseQuantity;
    const safeQuantity = Math.min(
      Math.max(Math.floor(Number(this.purchaseQuantity) || 1), 1),
      Math.max(max, 1)
    );
    this.purchaseQuantity = safeQuantity;

    this.purchaseLoading = true;
    const payload = {
      quantity: this.purchaseQuantity,
      ...(isGuest
        ? {
            guest_name: this.guestName.trim(),
            guest_email: this.guestEmail.trim(),
            guest_phone: this.guestPhone.trim(),
          }
        : {}),
    };

    this.eventService.purchaseTickets(this.eventId, payload).subscribe({
      next: (ticket) => {
        this.purchaseLoading = false;
        this.guestTicketId = isGuest ? ticket.id : null;
        this.guestCancelToken = isGuest ? ticket.cancel_token || null : null;
        if (isGuest && !ticket.stripe_client_secret) {
          this.handleGuestSuccess();
        }

        // Free or instantly confirmed ticket
        if (!ticket.stripe_client_secret) {
          this.toast.success('Your ticket is confirmed, check your email for details.');
          this.loadEvent();
          return;
        }

        this.pendingTicket = ticket;
        this.stripeClientSecret = ticket.stripe_client_secret;
        this.showPaymentModal = true;

        setTimeout(() => this.initializeStripeElement(), 80);
      },
      error: (err) => {
        this.purchaseLoading = false;
        const detail = err?.error?.detail || err?.error?.message;
        this.toast.error(detail || 'Could not purchase tickets.');
      },
    });
  }

  private async initializeStripeElement(): Promise<void> {
    if (!this.stripe) {
      this.paymentError = 'Stripe failed to initialize.';
      return;
    }
    if (!this.stripeClientSecret) {
      this.paymentError = 'Missing payment information.';
      return;
    }

    this.elements = this.stripe.elements({
      clientSecret: this.stripeClientSecret,
    });

    this.paymentElement = this.elements.create('payment');

    if (this.paymentElementRef) {
      this.paymentElement.mount(this.paymentElementRef.nativeElement);
    }
  }

  async submitPayment(): Promise<void> {
    if (!this.stripe || !this.elements) {
      this.paymentError = 'Payment system unavailable.';
      return;
    }

    this.isProcessingPayment = true;
    this.paymentError = null;

    const result = await this.stripe.confirmPayment({
      elements: this.elements,
      confirmParams: {
        return_url: `${window.location.origin}/payments/complete`,
      },
      redirect: 'if_required',
    });

    this.isProcessingPayment = false;

    if (result.error) {
      this.paymentError = result.error.message || 'Payment failed. Please try again.';
      return;
    }

    this.toast.success('Payment received, check your email for ticket details.');
    this.closePaymentModal();
    this.loadEvent();
    this.refreshMyTickets();
    if (this.guestCancelToken) {
      this.handleGuestSuccess();
    }
  }

  closePaymentModal(): void {
    if (this.isProcessingPayment) return;

    this.showPaymentModal = false;
    this.paymentError = null;
    this.stripeClientSecret = null;
    this.pendingTicket = null;

    if (this.paymentElement) {
      this.paymentElement.unmount();
      this.paymentElement = null;
    }
  }

  private refreshMyTickets(): void {
    this.eventService.getMyTickets().subscribe({
      next: () => {},
      error: () => {
        // swallow silently
      },
    });
  }

  cancelGuestTicket(): void {
    if (!this.guestTicketId || !this.guestCancelToken) return;
    this.eventService.cancelTicket(this.guestTicketId, this.guestCancelToken).subscribe({
      next: () => {
        this.toast.success('Your ticket has been cancelled.');
        this.guestPurchaseComplete = false;
        this.guestTicketId = null;
        this.guestCancelToken = null;
        this.loadEvent();
      },
      error: (err) => {
        const detail = err?.error?.detail || err?.error?.message;
        this.toast.error(detail || 'Could not cancel this ticket.');
      },
    });
  }

  private handleGuestSuccess(): void {
    this.guestName = '';
    this.guestEmail = '';
    this.guestPhone = '';
    this.guestPurchaseComplete = true;

    if (this.guestSuccessTimeoutId) {
      window.clearTimeout(this.guestSuccessTimeoutId);
    }

    this.guestSuccessTimeoutId = window.setTimeout(() => {
      this.guestPurchaseComplete = false;
      this.guestSuccessTimeoutId = null;
    }, 5000);
  }

}
