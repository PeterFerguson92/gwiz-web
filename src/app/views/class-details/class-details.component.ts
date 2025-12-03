import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

import { AuthService } from '@/app/core/services/auth.service';
import { ToastService } from '@/app/core/services/toast.service';
import { PageHeroComponent } from '@/app/shared/components/page-hero/page-hero.component';
import { SessionListComponent } from '@/app/shared/components/session-list/session-list.component';
import { SidebarComponent } from '@/app/shared/components/sidebar/sidebar.component';
import { FormattersService } from '@/app/shared/service/formatters.service';
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
export class ClassDetailsComponent implements OnInit {
  classId!: string;
  classData: FitnessClass | null = null;
  sessions: ClassSession[] = [];

  loading = false;
  loadingSessions = false;
  bookingLoading: Record<string, boolean> = {};

  placeholderImage = 'assets/img/placeholder/fitness-placeholder.jpg';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fitnessClass: FitnessClassService,
    private toast: ToastService,
    private authService: AuthService,
    private formattersService: FormattersService
  ) {}

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  get instructorNames(): string {
    return this.formattersService.formatInstructorNames(this.classData?.instructors);
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.classId = id || '';

    if (!this.classId) {
      this.toast.error('Invalid class.');
      this.router.navigate(['/classes']);
      return;
    }

    this.loadClassWithSessions();
  }

  /* ------------------ LOAD CLASS + SESSIONS ------------------ */

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
        error: (err) => {
          console.error('Failed to load class with sessions', err);
          this.toast.error('Failed to load this class. Please try again.');
          this.router.navigate(['/classes']);
        },
      });
  }

  /* ------------------ MOBILE SCROLL HELPER ------------------ */

  scrollToSessions(): void {
    const el = document.querySelector('.session-section');
    el?.scrollIntoView({ behavior: 'smooth' });
  }

  /* ------------------ BOOK SESSION ------------------ */

  bookSession(session: ClassSession): void {
    if (!this.isLoggedIn) {
      this.toast.info('Please login to book this class.');
      this.router.navigate(['/login'], {
        queryParams: { returnUrl: this.router.url },
      });
      return;
    }

    if (session.status === 'cancelled') {
      this.toast.error('This session has been cancelled.');
      return;
    }

    if (session.spaces_left <= 0) {
      this.toast.error('This session is fully booked.');
      return;
    }

    this.bookingLoading[session.id] = true;

    this.fitnessClass
      .bookSession(session.id)
      .pipe(finalize(() => (this.bookingLoading[session.id] = false)))
      .subscribe({
        next: (res: BookSessionResponse) => {
          this.toast.success(res.message || 'Your class has been booked!');
          this.loadClassWithSessions(); // refresh spaces_left
        },
        error: (err) => {
          console.error('Booking failed', err);

          const backendMsg =
            err?.error?.detail || err?.error?.message || err?.error?.non_field_errors?.[0];

          this.toast.error(backendMsg || 'Failed to book this session. Please try again.');
        },
      });
  }

  /* ------------------ DATE / TIME LABELS ------------------ */

  sessionDateLabel(session: ClassSession): string {
    return this.formattersService.formatSessionDate(session);
  }

  sessionTimeLabel(session: ClassSession): string {
    return this.formattersService.formatSessionTime(session);
  }
}
