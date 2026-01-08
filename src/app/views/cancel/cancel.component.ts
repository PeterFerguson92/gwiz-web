import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PageHeroComponent } from '@/app/shared/components/page-hero/page-hero.component';
import { AssetService } from '@core/services/asset.service';
import { EventService } from '@core/services/event.service';
import { FitnessClassService } from '@core/services/fitness-class.service';

type CancelType = 'booking' | 'event_ticket';
type CancelState = 'idle' | 'loading' | 'success' | 'error';

@Component({
  selector: 'app-cancel',
  standalone: true,
  imports: [CommonModule, PageHeroComponent],
  templateUrl: './cancel.component.html',
  styleUrls: ['./cancel.component.scss'],
})
export class CancelComponent implements OnInit {
  cancelType: CancelType | null = null;
  targetId: string | null = null;
  token: string | null = null;
  state: CancelState = 'idle';
  message = '';
  heroImage = 'assets/img/bg/terms_bg.jpg';

  constructor(
    private route: ActivatedRoute,
    private assetService: AssetService,
    private eventService: EventService,
    private fitnessClassService: FitnessClassService
  ) {}

  ngOnInit(): void {
    this.assetService
      .getCover('cancel_cover')
      .subscribe((img) => (this.heroImage = img || this.heroImage));

    const query = this.route.snapshot.queryParamMap;
    const type = query.get('type');
    const id = query.get('id');
    const token = query.get('token');

    if (type === 'booking' || type === 'event_ticket') {
      this.cancelType = type;
    }

    this.targetId = id;
    this.token = token;

    if (!this.cancelType || !this.targetId || !this.token) {
      this.state = 'error';
      this.message = 'This cancellation link is incomplete or invalid.';
    }
  }

  get title(): string {
    if (this.cancelType === 'booking') return 'Cancel your booking?';
    if (this.cancelType === 'event_ticket') return 'Cancel your ticket?';
    return 'Cancel request';
  }

  get heroTitle(): string {
    if (this.cancelType === 'booking') return 'Cancel booking';
    if (this.cancelType === 'event_ticket') return 'Cancel ticket';
    return 'Cancel';
  }

  get confirmLabel(): string {
    if (this.cancelType === 'booking') return 'Yes, cancel booking';
    if (this.cancelType === 'event_ticket') return 'Yes, cancel ticket';
    return 'Confirm cancellation';
  }

  get canConfirm(): boolean {
    return this.state === 'idle' && !!this.cancelType && !!this.targetId && !!this.token;
  }

  confirmCancel(): void {
    if (!this.canConfirm || !this.cancelType || !this.targetId || !this.token) {
      return;
    }

    this.state = 'loading';
    this.message = '';

    const onSuccess = () => {
      this.state = 'success';
      this.message = 'Your request has been processed successfully.';
    };
    const onError = (err: any) => {
      const detail = err?.error?.detail || err?.error?.message;
      this.state = 'error';
      this.message = detail || 'Could not process this cancellation.';
    };

    if (this.cancelType === 'booking') {
      this.fitnessClassService.cancelBookingAsGuest(this.targetId, this.token).subscribe({
        next: () => onSuccess(),
        error: (err) => onError(err),
      });
      return;
    }

    this.eventService.cancelTicket(this.targetId, this.token).subscribe({
      next: () => onSuccess(),
      error: (err) => onError(err),
    });
  }
}
