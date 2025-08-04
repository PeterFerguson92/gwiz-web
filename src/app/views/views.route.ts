import { Routes } from '@angular/router';
import { Home1Component } from './home-1/home-1.component';

export const VIEWS_ROUTES: Routes = [
    {
        path: 'home-1',
        component: Home1Component,
        data: { title: "home-1" }
       
    },
    {
        path: '',
        loadChildren: () =>
            import('./services/services.route').then((mod) => mod.SERVICES_ROUTES),
    },
    {
        path: '',
        loadChildren: () =>
            import('./blogs/blogs.route').then((mod) => mod.BLOGS_ROUTES),
    },
    {
        path: '',
        loadChildren: () =>
            import('./case-studies/case-studies.route').then((mod) => mod.CASE_STUDIES_ROUTES),
    },
    {
        path: '',
        loadChildren: () =>
            import('./other-pages/other-pages.route').then((mod) => mod.OTHER_PAGES_ROUTES),
    },
];
