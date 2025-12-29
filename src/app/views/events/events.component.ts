import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { EventCardComponent } from '@/app/shared/components/event-card/event-card.component';
import { PageHeroComponent } from '@/app/shared/components/page-hero/page-hero.component';
import { SHARED_IMPORTS } from '@/app/shared/shared-imports';
import { Event as GymEvent } from '@core/models/event.models';
import { AssetService } from '@core/services/asset.service';
import { EventService } from '@core/services/event.service';
import { ToastService } from '@core/services/toast.service';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule, PageHeroComponent, EventCardComponent, ...SHARED_IMPORTS],
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
})
export class EventsComponent implements OnInit {
  events: GymEvent[] = [];
  loading = false;
  heroImage = 'assets/img/bg/dumbell_bg.png';

  constructor(
    private eventService: EventService,
    private toast: ToastService,
    private router: Router,
    private assetService: AssetService
  ) {}

  ngOnInit(): void {
    this.assetService
      .getCover('main_events_cover')
      .subscribe((img) => (this.heroImage = img || this.heroImage));

    this.loadEvents();
  }

  get featuredEvents(): GymEvent[] {
    return this.events.filter((e) => e.is_featured);
  }

  private loadEvents(): void {
    this.loading = true;

    this.eventService.listEvents().subscribe({
      next: (data) => {
        this.events = this.sortEvents(data);
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.toast.error('Could not load events right now. Please try again soon.');
      },
    });
  }

  private sortEvents(list: GymEvent[]): GymEvent[] {
    return [...list].sort((a, b) => {
      // Featured first
      if (a.is_featured !== b.is_featured) {
        return a.is_featured ? -1 : 1;
      }

      // Then by start date ascending
      const aDate = new Date(a.start_datetime).getTime();
      const bDate = new Date(b.start_datetime).getTime();

      return aDate - bDate;
    });
  }

  openEventDetails(event: GymEvent): void {
    this.router.navigate(['/events', event.id]);
  }

  trackByEventId(_index: number, event: GymEvent): string {
    return event.id;
  }
}
