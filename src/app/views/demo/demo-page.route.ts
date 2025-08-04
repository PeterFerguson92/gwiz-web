
import { Routes } from '@angular/router';
import { Home2Component } from './home-2/home-2.component';
import { Home3Component } from './home-3/home-3.component';
import { Home4Component } from './home-4/home-4.component';
import { HomeSingle1Component } from './home-single-1/home-single-1.component';
import { HomeSingle2Component } from './home-single-2/home-single-2.component';
import { HomeSingle3Component } from './home-single-3/home-single-3.component';
import { HomeSingle4Component } from './home-single-4/home-single-4.component';

export const DEMO_PAGE_ROUTES: Routes = [
    {
        path: 'home-2',
        component: Home2Component,
        data: { title: "home-2" },
    },
    {
        path: 'home-3',
        component: Home3Component,
        data: { title: "home-3" },
    },
    {
        path: 'home-4',
        component: Home4Component,
        data: { title: "home-4" },
    },
    {
        path: 'home-single-1',
        component: HomeSingle1Component,
        data: { title: "home-single-1" },
    },
    {
        path: 'home-single-2',
        component: HomeSingle2Component,
        data: { title: "home-single-2" },
    },
    {
        path: 'home-single-3',
        component: HomeSingle3Component,
        data: { title: "home-single-3" },

    },
    {
        path: 'home-single-4',
        component: HomeSingle4Component,
        data: { title: "home-single-4" },
    },
];
