import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { SHARED_IMPORTS } from '@/app/shared/shared-imports';
import { BreadcrumbComponent } from '@app/components/breadcrumb/breadcrumb.component';
import {
  ClassSession,
  FitnessClass,
  FitnessClassWithNextSession,
} from '@core/models/booking.models';
import { AuthService } from '@core/services/auth.service';
import { BookingService } from '@core/services/booking.service';
import { ToastService } from '@core/services/toast.service';

@Component({
  selector: 'app-classes-page',
  standalone: true,
  imports: [CommonModule, BreadcrumbComponent, ...SHARED_IMPORTS],
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss'],
})
export class ClassesComponent implements OnInit {
  classes: FitnessClassWithNextSession[] = [];
  loadingClasses = false;
  loadingMoreClasses = false;

  placeholderImage = 'assets/img/placeholder.jpg';

  // per-session loading state for the Book button
  bookingLoading: Record<string | number, boolean> = {};

  constructor(
    private bookingService: BookingService,
    private authService: AuthService,
    private toast: ToastService,
    private router: Router
  ) {}

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  ngOnInit(): void {
    this.loadClassesWithNextSessions();
  }

  /** Load all classes and their next session (within 30 days) */
  private loadClassesWithNextSessions(): void {
    this.loadingClasses = true;

    this.bookingService
      .getFitnessClasses()
      .pipe(
        switchMap((classes: FitnessClass[]) => {
          if (!classes.length) {
            return of([] as FitnessClassWithNextSession[]);
          }

          const requests = classes.map((fitnessClass) =>
            this.bookingService.getSessionsForClass(fitnessClass.id, 30).pipe(
              map((sessions: ClassSession[]) => {
                const nextSession = sessions.length ? sessions[0] : null;
                return {
                  ...fitnessClass,
                  next_session: nextSession,
                } as FitnessClassWithNextSession;
              }),
              catchError((err) => {
                console.error('Error loading sessions for class', fitnessClass.id, err);
                this.toast.error(
                  `Unable to load sessions for ${fitnessClass.name}. You can still view the class details.`
                );
                return of({
                  ...fitnessClass,
                  next_session: null,
                } as FitnessClassWithNextSession);
              })
            )
          );

          return forkJoin(requests);
        })
      )
      .subscribe({
        next: (classesWithNext: FitnessClassWithNextSession[]) => {
          this.classes = classesWithNext;
          this.loadingClasses = false;
        },
        error: (error) => {
          console.error('Error loading classes', error);
          this.loadingClasses = false;
          this.toast.error(
            'Unable to load fitness classes at the moment. Please try again in a few minutes.'
          );
        },
      });
  }

  /** Click handler for the Book button */
  onBook(classItem: FitnessClassWithNextSession): void {
    const session = classItem.next_session;
    if (!session) return;

    // If not logged in, redirect to login with returnUrl and show info toast
    if (!this.isLoggedIn) {
      this.toast.info('Please log in to book a class.');
      this.router.navigate(['/login'], { queryParams: { returnUrl: '/classes' } });
      return;
    }

    const sessionId = session.id;
    this.bookingLoading[sessionId] = true;

    this.bookingService.bookSession(sessionId).subscribe({
      next: () => {
        this.bookingLoading[sessionId] = false;
        this.toast.success('Your booking has been confirmed.');
        this.loadClassesWithNextSessions(); // refresh spaces_left
      },
      error: (error) => {
        console.error('Booking error', error);
        this.bookingLoading[sessionId] = false;

        const message = this.mapBookingError(error);
        this.toast.error(message);
      },
    });
  }

  /** Map backend error codes to user-friendly messages */
  private mapBookingError(error: any): string {
    const code = error?.error?.error || error?.error?.code || error?.error?.detail;

    switch (code) {
      case 'CAPACITY_FULL':
        return 'Sorry, this class is now full.';
      case 'ALREADY_BOOKED':
        return 'You are already booked on this class.';
      case 'CANNOT_BOOK_PAST_SESSION':
        return 'This session has already started or finished.';
      case 'CLASS_CANCELLED':
        return 'This class has been cancelled.';
      default:
        return 'Unable to complete your booking. Please try again.';
    }
  }

  /** Small helpers for template text */
  sessionDateLabel(session: ClassSession | null): string {
    if (!session) return 'No upcoming sessions in the next 30 days';
    return session.date;
  }

  sessionTimeLabel(session: ClassSession | null): string {
    if (!session) return '';
    return `${session.start_time} – ${session.end_time}`;
  }

  trackByClassId(_index: number, item: FitnessClassWithNextSession): number | string {
    return item.id;
  }
  onImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    if (img.src.includes(this.placeholderImage)) {
      // already tried placeholder – avoid infinite loop
      return;
    }
    img.src = this.placeholderImage;
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  onCardClick(cls: any, event: MouseEvent): void {
    const target = event.target as HTMLElement;

    // If user actually clicked a button, let the button handler deal with it
    if (target.closest('button')) {
      return;
    }

    // If there is no upcoming session, do nothing for now
    if (!cls.next_session) {
      return;
    }

    // If booking is disabled (cancelled / full / already loading), do nothing
    const session = cls.next_session;
    if (
      session.status === 'cancelled' ||
      session.spaces_left <= 0 ||
      this.bookingLoading?.[session.id]
    ) {
      return;
    }

    // Otherwise behave like pressing the Book/Login button
    this.onBook(cls);
  }
}
