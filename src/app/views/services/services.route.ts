import { Routes } from '@angular/router';
import { Service1Component } from './service-1/service-1.component';
import { ServiceLeftComponent } from './service-left/service-left.component';
import { ServiceRightComponent } from './service-right/service-right.component';
import { ServiceSingleComponent } from './service-single/service-single.component';

export const SERVICES_ROUTES: Routes = [
    {
        path: 'services/one',
        component: Service1Component,
        data: { title: "Service One" }
    },
    {
        path: 'services/left',
        component: ServiceLeftComponent,
        data: { title: "Service Left" }
    },
    {
        path: 'services/right',
        component: ServiceRightComponent,
        data: { title: "Service Right" }
    },
    {
        path: 'services/single',
        component: ServiceSingleComponent,
        data: { title: "Service Single" }
    },
];
