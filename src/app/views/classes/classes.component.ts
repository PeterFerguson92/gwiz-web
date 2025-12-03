import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { ClassCardComponent } from '@/app/shared/components/class-card/class-card.component';
import { PageHeroComponent } from '@/app/shared/components/page-hero/page-hero.component';
import { SHARED_IMPORTS } from '@/app/shared/shared-imports';
import {
  ClassSession,
  FitnessClass,
  FitnessClassWithNextSession,
} from '@core/models/fitness.models';
import { AuthService } from '@core/services/auth.service';
import { FitnessClassService } from '@core/services/fitness-class.service';
import { ToastService } from '@core/services/toast.service';

@Component({
  selector: 'app-classes-page',
  standalone: true,
  imports: [CommonModule, ClassCardComponent, PageHeroComponent, ...SHARED_IMPORTS],
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss'],
})
export class ClassesComponent implements OnInit {
  classes: FitnessClassWithNextSession[] = [];
  loadingClasses = false;
  loadingMoreClasses = false;

  placeholderImage = 'assets/img/placeholder.jpg';

  constructor(
    private authService: AuthService,
    private fitnessClassService: FitnessClassService,
    private toast: ToastService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadClassesWithNextSessions();
  }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  /** Load all classes and their next session (within 30 days) */
  private loadClassesWithNextSessions(): void {
    this.loadingClasses = true;

    this.fitnessClassService
      .getAllFitnessClasses(true) // pass true to only show active classes (or omit arg for all)
      .pipe(
        switchMap((classes: FitnessClass[]) => {
          if (!classes.length) {
            return of([] as FitnessClassWithNextSession[]);
          }

          const requests = classes.map((fitnessClass) =>
            this.fitnessClassService.getClassSessions(fitnessClass.id, 30).pipe(
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
        error: (error: any) => {
          console.error('Error loading classes', error);
          this.loadingClasses = false;
          this.toast.error(
            'Unable to load fitness classes at the moment. Please try again in a few minutes.'
          );
        },
      });
  }

  trackByClassId(_index: number, item: FitnessClassWithNextSession): string {
    return item.id;
  }

  onImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    if (img.src.includes(this.placeholderImage)) {
      return;
    }
    img.src = this.placeholderImage;
  }

  openClassDetails(cls: FitnessClassWithNextSession): void {
    this.router.navigate(['/classes', cls.id]);
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}
