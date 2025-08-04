import type { CaseStudyType } from '@/types';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-case-study-card',
    imports: [RouterLink],
    templateUrl: './case-study-card.component.html',
    styles: ``
})
export class CaseStudyCardComponent {
    @Input() case!: CaseStudyType
}
