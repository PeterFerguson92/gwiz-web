import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-blogs-sidebar',
    imports: [CommonModule,RouterLink],
    templateUrl: './blogs-sidebar.component.html',
    styles: ``
})
export class BlogsSidebarComponent {
    recentPosts = [
        {
            image: 'assets/img/all-images/blog-img18.png',
            date: '20 Apr, 2024',
            title: 'Empowering Energy Dive into Our Electricity'
        },
        {
            image: 'assets/img/all-images/blog-img19.png',
            date: '20 Apr, 2024',
            title: 'Bright Ideas: Unveiling Energy Innovations'
        },
        {
            image: 'assets/img/all-images/blog-img20.png',
            date: '20 Apr, 2024',
            title: 'Voltage Views lluminating Energy Perspectives'
        },
        {
            image: 'assets/img/all-images/blog-img21.png',
            date: '20 Apr, 2024',
            title: 'Spark Solutions Exploring Energy Innovations'
        }
    ];

}
