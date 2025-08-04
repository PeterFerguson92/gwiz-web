import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CountUpModule } from 'ngx-countup';

@Component({
    selector: 'app-about-2',
    imports: [CountUpModule, CommonModule,RouterLink],
    templateUrl: './about-2.component.html',
    styles: ``,
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class About2Component {
    counterData = [
        { count: 450, duration: 1000, label: 'Active Clients' },
        { count: 990, duration: 1200, label: 'Electricity Services' },
        { count: 45, duration: 1000, label: 'Team Advisors' },
        { count: 12, duration: 1200, label: 'Years of Experienced' }
    ];
}
