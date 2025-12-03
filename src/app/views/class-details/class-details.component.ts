import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { PageHeroComponent } from '@/app/shared/components/page-hero/page-hero.component';
import { SessionListComponent } from '@/app/shared/components/session-list/session-list.component';
import { SidebarComponent } from '@/app/shared/components/sidebar/sidebar.component';
import { SHARED_IMPORTS } from '@/app/shared/shared-imports';
import { AuthService } from '@core/services/auth.service';

// IMPORT YOUR API SERVICES HERE
// import { ClassesService } from 'src/app/services/classes.service';
// import { SessionsService } from 'src/app/services/sessions.service';
// import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-class-details',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SessionListComponent,
    SidebarComponent,
    PageHeroComponent,
    SHARED_IMPORTS,
    // import shared components if needed
    // Loading component example:
    // LoadingApiComponent
  ],
  templateUrl: './class-details.component.html',
  styleUrls: ['./class-details.component.scss'],
})
export class ClassDetailsComponent implements OnInit {
  classId!: number;

  classData: any = null;
  sessions: any[] = [];

  loadingClass = false;
  loadingSessions = false;

  bookingLoading: Record<number, boolean> = {};
  placeholderImage = 'assets/img/placeholder.jpg';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService

    // private classesService: ClassesService,
    // private sessionsService: SessionsService,
    // private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.classId = Number(this.route.snapshot.paramMap.get('id'));

    this.loadClass();
    this.loadSessions();
  }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  /* -----------------------------------------------
     LOAD CLASS
  ------------------------------------------------- */

  loadClass() {
    this.loadingClass = true;

    // Replace this with your real API call:
    // this.classesService.getClassById(this.classId).subscribe( ... )

    setTimeout(() => {
      this.loadingClass = false;
      this.classData = {
        id: this.classId,
        name: 'Strength Training',
        description: 'This is placeholder class data.',
        genre: 'Strength',
        capacity: 20,
        price: 12.99,
        instructors: ['Maria'],
        image_url: null, // triggers placeholder image
      };
    }, 600);
  }

  /* -----------------------------------------------
     LOAD SESSIONS
  ------------------------------------------------- */

  loadSessions() {
    this.loadingSessions = true;

    // Replace with real API:
    // this.sessionsService.getSessions(this.classId).subscribe( ... )

    setTimeout(() => {
      this.loadingSessions = false;
      this.sessions = [
        {
          id: 1,
          start: new Date(Date.now() + 86400000).toISOString(),
          spaces_left: 5,
          status: 'active',
        },
        {
          id: 2,
          start: new Date(Date.now() + 172800000).toISOString(),
          spaces_left: 0,
          status: 'active',
        },
      ];
    }, 700);
  }

  /* -----------------------------------------------
     NAVIGATION
  ------------------------------------------------- */

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  /* -----------------------------------------------
     IMAGE FALLBACK
  ------------------------------------------------- */

  onImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = this.placeholderImage;
  }

  /* -----------------------------------------------
     LABEL HELPERS
  ------------------------------------------------- */

  sessionDateLabel(session: any) {
    return new Date(session.start).toLocaleDateString('en-GB', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
    });
  }

  sessionTimeLabel(session: any) {
    return new Date(session.start).toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  /* -----------------------------------------------
     BOOK SESSION
  ------------------------------------------------- */

  bookSession(session: any) {
    if (!this.isLoggedIn) {
      this.navigateTo('/login');
      return;
    }

    this.bookingLoading[session.id] = true;

    // Replace with real booking API
    setTimeout(() => {
      this.bookingLoading[session.id] = false;
      alert('Session booked (placeholder)');
    }, 900);
  }

  /* -----------------------------------------------
     MOBILE SCROLL
  ------------------------------------------------- */

  scrollToSessions() {
    const block = document.querySelector('.session-section');
    block?.scrollIntoView({ behavior: 'smooth' });
  }
}
