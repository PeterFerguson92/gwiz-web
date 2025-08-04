import type { BlogType } from '@/types';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BreadcrumbComponent } from '@app/components/breadcrumb/breadcrumb.component';
import { BlogCardComponent } from "../../../components/cards/blog-card/blog-card.component";

@Component({
    selector: 'app-blog-1',
    imports: [BreadcrumbComponent, CommonModule, BlogCardComponent],
    templateUrl: './blog-1.component.html',
    styles: ``
})
export class Blog1Component {
    blogs: BlogType[] = [
        {
            image: 'assets/img/all-images/blog-img1.png',
            title: 'Electrifying Reads Explore Our Electricity',
            description: 'Are you considering studying abroad and embarking on an visa to',
            date: 'April 2, 2024',
            authorRole: 'Electricity Corner'
        },
        {
            image: 'assets/img/all-images/blog-img2.png',
            title: 'Empowering Energy Dive into Our Electricity',
            description: 'From understanding our pricing plans to learning about our renewable',
            date: 'April 2, 2024',
            authorRole: 'Electricity Corner'
        },
        {
            image: 'assets/img/all-images/blog-img3.png',
            title: 'Electricity Explained: Bloggin Power of Tomorrow',
            description: 'We\'re committed to ensuring that you have all the information you need.',
            date: 'April 2, 2024',
            authorRole: 'Electricity Corner'
        },
        {
            image: 'assets/img/all-images/blog-img13.png',
            title: 'Eco-Electric Edits Your Source Energy News',
            description: 'So, grab a cup of coffee, explore our articles, and join us on a journey',
            date: 'April 2, 2024',
            authorRole: 'Electricity Corner'
        },
        {
            image: 'assets/img/all-images/blog-img14.png',
            title: 'Empowerment Energy Unleash Your Potential',
            description: 'Our team of experts is dedicated to delivering valuable content that',
            date: 'April 2, 2024',
            authorRole: 'Electricity Corner'
        },
        {
            image: 'assets/img/all-images/blog-img15.png',
            title: 'Voltage Views Illuminating Energy Perspectives',
            description: 'Dive into our blog to discover a wide range of topics, including energy',
            date: 'April 2, 2024',
            authorRole: 'Electricity Corner'
        },
        {
            image: 'assets/img/all-images/blog-img16.png',
            title: 'Wired Wisdom: Insights from the Energy Experts',
            description: 'Our team of experts is committed to providing you with accurate,',
            date: 'April 2, 2024',
            authorRole: 'Electricity Corner'
        },
        {
            image: 'assets/img/all-images/blog-img17.png',
            title: 'Bright Ideas: Unveiling Energy Innovations',
            description: 'With regular updates and new articles published, there\'s always something',
            date: 'April 2, 2024',
            authorRole: 'Electricity Corner'
        },
        {
            image: 'assets/img/all-images/blog-img18.png',
            title: 'Spark Solutions: Exploring Energy Innovations',
            description: 'So, whether you\'re a seasoned energy enthusiast or just starting',
            date: 'April 2, 2024',
            authorRole: 'Electricity Corner'
        }
    ];

}
