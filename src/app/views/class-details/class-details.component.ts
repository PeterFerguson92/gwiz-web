import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { loadStripe, Stripe, StripeElements, StripePaymentElement } from '@stripe/stripe-js';
import { finalize } from 'rxjs/operators';

import { AuthService } from '@/app/core/services/auth.service';
import { ToastService } from '@/app/core/services/toast.service';
import { PageHeroComponent } from '@/app/shared/components/page-hero/page-hero.component';
import { SessionListComponent } from '@/app/shared/components/session-list/session-list.component';
import { SidebarComponent } from '@/app/shared/components/sidebar/sidebar.component';
import { FormattersService } from '@/app/shared/service/formatters.service';
import { environment } from '@/environments/environment';
import { BookSessionResponse, ClassSession, FitnessClass } from '@core/models/fitness.models';
import {
  FitnessClassService,
  FitnessClassWithSessions,
} from '@core/services/fitness-class.service';

@Component({
  selector: 'app-class-details',
  standalone: true,
  imports: [CommonModule, PageHeroComponent, SessionListComponent, SidebarComponent],
  templateUrl: './class-details.component.html',
  styleUrls: ['./class-details.component.scss'],
})
export class ClassDetailsComponent implements OnInit, AfterViewInit, OnDestroy {
  classId!: string;
  classData: FitnessClass | null = null;
  sessions: ClassSession[] = [];

  loading = false;
  loadingSessions = false;
  bookingLoading: Record<string, boolean> = {};
  guestName = '';
  guestEmail = '';
  guestPhone = '';
  guestBookingId: string | null = null;
  guestCancelToken: string | null = null;
  guestBookingComplete = false;
  activeGuestSessionId: string | null = null;
  private guestSuccessTimeoutId: number | null = null;

  // ---------------- STRIPE BOOKING STATE ----------------
  showPaymentModal = false;
  stripeClientSecret: string | null = null;
  pendingBooking: BookSessionResponse | null = null;

  stripe: Stripe | null = null;
  elements: StripeElements | null = null;
  paymentElement: StripePaymentElement | null = null;

  paymentError: string | null = null;
  isProcessingPayment = false;

  @ViewChild('paymentElementRef') paymentElementRef!: ElementRef<HTMLDivElement>;

  // ------------------------------------------------------

  placeholderImage = 'assets/img/placeholder/fitness-placeholder.jpg';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fitnessClass: FitnessClassService,
    private toast: ToastService,
    private authService: AuthService,
    public formattersService: FormattersService
  ) {}

  // ---------------- LIFECYCLE ----------------

  async ngOnInit(): Promise<void> {
    const id = this.route.snapshot.paramMap.get('id');
    this.classId = id || '';

    if (!this.classId) {
      this.toast.error('Invalid class.');
      this.router.navigate(['/classes']);
      return;
    }

    this.loadClassWithSessions();

    // Preload Stripe.js as early as possible
    this.stripe = await loadStripe(environment.stripePublishableKey);
  }

  ngAfterViewInit(): void {
    // Payment element mounts dynamically when needed
  }

  ngOnDestroy(): void {
    if (this.paymentElement) {
      this.paymentElement.unmount();
    }
    if (this.guestSuccessTimeoutId) {
      window.clearTimeout(this.guestSuccessTimeoutId);
    }
  }

  // ---------------- HELPER GETTERS ----------------

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

  get instructorNames(): string {
    return this.formattersService.formatInstructorNames(this.classData?.instructors);
  }

  getPendingClassName(): string {
    const booking = this.pendingBooking?.booking;
    if (!booking || !booking.class_session) {
      // Fallback to the current class name if we have it, otherwise generic label
      return this.classData?.name ?? 'Class';
    }

    const cs: any = booking.class_session;
    const fc = cs.fitness_class;

    // On /my-bookings/ and some endpoints fitness_class is a full object.
    // On other endpoints it can be just an ID string.
    if (fc && typeof fc === 'object' && 'name' in fc) {
      return (fc as FitnessClass).name;
    }

    // Fallback: use the page class name if available
    return this.classData?.name ?? 'Class';
  }

  // ---------------- LOAD CLASS + SESSIONS ----------------

  loadClassWithSessions(days = 30): void {
    this.loading = true;
    this.loadingSessions = true;

    this.fitnessClass
      .getFitnessClassWithSessions(this.classId, days)
      .pipe(
        finalize(() => {
          this.loading = false;
          this.loadingSessions = false;
        })
      )
      .subscribe({
        next: (fitnessClass: FitnessClassWithSessions) => {
          this.classData = fitnessClass;
          this.sessions = fitnessClass.upcoming_sessions || [];
        },
        error: () => {
          this.toast.error('Failed to load this class.');
          this.router.navigate(['/classes']);
        },
      });
  }

  // ---------------- MOBILE SCROLL HELP ----------------

  scrollToSessions(): void {
    const el = document.querySelector('.session-section');
    el?.scrollIntoView({ behavior: 'smooth' });
  }

  private scrollGuestPanelIntoView(sessionId: string): void {
    const card = document.querySelector(`[data-session-id="${sessionId}"]`);
    if (!card) return;
    card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  // ---------------- BOOK SESSION FLOW ----------------

  bookSession(session: ClassSession): void {
    if (!this.isLoggedIn) {
      if (this.activeGuestSessionId !== session.id) {
        this.activeGuestSessionId = session.id;
        this.guestBookingComplete = false;
        this.guestBookingId = null;
        this.guestCancelToken = null;
        setTimeout(() => this.scrollGuestPanelIntoView(session.id), 80);
      }
      return;
    }

    if (session.status === 'cancelled') {
      this.toast.error('This session has been cancelled.');
      return;
    }

    this.bookingLoading[session.id] = true;

    this.fitnessClass
      .bookSession(session.id)
      .pipe(finalize(() => (this.bookingLoading[session.id] = false)))
      .subscribe({
        next: (res: BookSessionResponse) => {
          this.handleBookingResponse(res, false);
        },
        error: (err) => {
          const message = err?.error?.detail || err?.error?.message || 'Booking failed.';
          this.toast.error(message);
        },
      });
  }

  private bookSessionAsGuest(session: ClassSession): void {
    if (session.status === 'cancelled') {
      this.toast.error('This session has been cancelled.');
      return;
    }

    this.bookingLoading[session.id] = true;

    this.fitnessClass
      .bookSessionAsGuest(session.id, {
        guest_name: this.guestName.trim(),
        guest_email: this.guestEmail.trim(),
        guest_phone: this.guestPhone.trim(),
      })
      .pipe(finalize(() => (this.bookingLoading[session.id] = false)))
      .subscribe({
        next: (res: BookSessionResponse) => {
          this.handleBookingResponse(res, true);
        },
        error: (err) => {
          const message = err?.error?.detail || err?.error?.message || 'Booking failed.';
          this.toast.error(message);
        },
      });
  }

  bookGuestSession(session: ClassSession): void {
    if (!this.isGuestFormValid) {
      this.toast.error('Please enter your name, email, and phone number.');
      return;
    }

    this.guestBookingComplete = false;
    this.guestBookingId = null;
    this.guestCancelToken = null;
    this.bookSessionAsGuest(session);
  }

  private handleBookingResponse(res: BookSessionResponse, isGuest: boolean): void {
    if (isGuest) {
      this.guestBookingId = res.booking?.id ?? null;
      this.guestCancelToken = res.cancel_token ?? res.booking?.cancel_token ?? null;
      if (!res.stripe_client_secret) {
        this.handleGuestSuccess();
      }
    }

    // Case A: membership credit booking → immediate success
    if (!res.stripe_client_secret) {
      this.toast.success(res.message || 'Your class has been booked, check your email.');
      this.loadClassWithSessions();
      return;
    }

    // Case B: Stripe payment required → show modal
    this.pendingBooking = res;
    this.stripeClientSecret = res.stripe_client_secret;
    this.showPaymentModal = true;

    // Mount Stripe element after modal renders
    setTimeout(() => this.initializeStripeElement(), 80);
  }

  // ---------------- STRIPE ELEMENT INITIALIZATION ----------------

  async initializeStripeElement(): Promise<void> {
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

  // ---------------- SUBMIT PAYMENT ----------------

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

    // Payment succeeded (webhook updates backend)
    this.toast.success('Payment received, check your email for booking details.');

    this.closePaymentModal();
    this.loadClassWithSessions(); // refresh spaces_left
    this.refreshMyBookings(); // optional prefetch
    if (this.guestCancelToken) {
      this.handleGuestSuccess();
    }
  }

  // ---------------- CLOSE PAYMENT MODAL ----------------

  closePaymentModal(): void {
    if (this.isProcessingPayment) return;

    this.showPaymentModal = false;
    this.paymentError = null;
    this.stripeClientSecret = null;
    this.pendingBooking = null;

    if (this.paymentElement) {
      this.paymentElement.unmount();
      this.paymentElement = null;
    }
  }

  // ---------------- REFRESH MY BOOKINGS ----------------

  private refreshMyBookings(): void {
    this.fitnessClass.getMyBookings().subscribe({
      next: () => {},
      error: () => {
        console.warn('Failed to refresh bookings (background).');
      },
    });
  }

  cancelGuestBooking(): void {
    if (!this.guestBookingId || !this.guestCancelToken) return;
    this.fitnessClass.cancelBookingAsGuest(this.guestBookingId, this.guestCancelToken).subscribe({
      next: () => {
        this.toast.success('Your booking has been cancelled.');
        this.guestBookingComplete = false;
        this.guestBookingId = null;
        this.guestCancelToken = null;
        this.loadClassWithSessions();
      },
      error: (err) => {
        const detail = err?.error?.detail || err?.error?.message;
        this.toast.error(detail || 'Could not cancel this booking.');
      },
    });
  }

  private handleGuestSuccess(): void {
    this.guestName = '';
    this.guestEmail = '';
    this.guestPhone = '';
    this.guestBookingComplete = true;

    if (this.guestSuccessTimeoutId) {
      window.clearTimeout(this.guestSuccessTimeoutId);
    }

    this.guestSuccessTimeoutId = window.setTimeout(() => {
      this.guestBookingComplete = false;
      this.guestSuccessTimeoutId = null;
    }, 5000);
  }

}
