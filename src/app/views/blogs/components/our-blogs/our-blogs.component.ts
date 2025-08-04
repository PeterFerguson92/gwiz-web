import type { BlogType } from '@/types';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BlogCardComponent } from "../../../../components/cards/blog-card/blog-card.component";

@Component({
    selector: 'app-our-blogs',
    imports: [CommonModule, BlogCardComponent],
    templateUrl: './our-blogs.component.html',
    styles: ``
})
export class OurBlogsComponent {
    blogPosts: BlogType[] = [
        {
            image: 'assets/img/all-images/blog-img1.png',
            title: 'Electrifying Reads Explore Our Electricity',
            date: 'April 2, 2024',
            authorRole: 'Electricity Corner',
            description: 'Are you considering studying abroad and embarking on an visa to',
        },
        {
            image: 'assets/img/all-images/blog-img2.png',
            title: 'Empowering Energy Dive into Our Electricity',
            date: 'April 2, 2024',
            authorRole: 'Electricity Corner',
            description: 'From understanding our pricing plans to learning about our renewable',
        },
        {
            image: 'assets/img/all-images/blog-img3.png',
            title: 'Electricity Explained: Bloggin Power of Tomorrow',
            date: 'April 2, 2024',
            authorRole: 'Electricity Corner',
            description: 'We\'re committed to ensuring that you have all the information you need.',
        }
    ];
}
