import { Routes } from '@angular/router';
import { OurTeamComponent } from './our-team/our-team.component';
import { PricingPlansComponent } from './pricing-plans/pricing-plans.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { FaqComponent } from './faq/faq.component';
import { Error404Component } from './error-404/error-404.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AboutComponent } from './about/about.component';

export const OTHER_PAGES_ROUTES: Routes = [
    {
        path: 'our-team',
        component: OurTeamComponent,
        data: { title: "Our Team" }
    },
    {
        path: 'pricing-plan',
        component: PricingPlansComponent,
        data: { title: "Pricing Plan" }
    },
    {
        path: 'testimonials',
        component: TestimonialsComponent,
        data: { title: "Testimonials" }
    },
    {
        path: 'faq',
        component: FaqComponent,
        data: { title: "Faq" }
    },
    {
        path: 'contact-us',
        component: ContactUsComponent,
        data: { title: "Contact Us" }
    },
    {
        path: 'about',
        component: AboutComponent,
        data: { title: "About" }
    },
    {
        path: '404',
        component: Error404Component,
    },

];
