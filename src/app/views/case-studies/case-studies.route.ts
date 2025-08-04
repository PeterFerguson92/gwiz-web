import { Routes } from '@angular/router';
import { Case1Component } from './case-1/case-1.component';
import { CaseLeftComponent } from './case-left/case-left.component';
import { CaseRightComponent } from './case-right/case-right.component';
import { CaseSingleComponent } from './case-single/case-single.component';

export const CASE_STUDIES_ROUTES: Routes = [
    {
        path: 'case-study-1',
        component: Case1Component,
        data: { title: "Case Study One" }
    },
    {
        path: 'case-study-left',
        component: CaseLeftComponent,
        data: { title: "Case Study Left" }
    },
    {
        path: 'case-study-right',
        component: CaseRightComponent,
        data: { title: "Case Study Right" }
    },
    {
        path: 'case-study-single',
        component: CaseSingleComponent,
        data: { title: "Case Study Single" }
    },
];
