import type { BlogType } from '@/types';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-blog-card',
    imports: [RouterLink],
    templateUrl: './blog-card.component.html',
    styles: ``
})
export class BlogCardComponent {
    @Input() blog!: BlogType
}
