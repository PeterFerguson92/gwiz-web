import { Component } from '@angular/core';
import { blogs } from '../data';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-blogs',
    imports: [CommonModule,RouterLink],
    templateUrl: './blogs.component.html',
    styles: ``
})
export class BlogsComponent {
    blogs=blogs
}
