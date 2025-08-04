import { Component } from '@angular/core';
import { BreadcrumbComponent } from "../../../components/breadcrumb/breadcrumb.component";
import { BlogsSidebarComponent } from "../components/blogs-sidebar/blogs-sidebar.component";
import type { BlogType } from '@/types';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-blog-sidebar',
    imports: [BreadcrumbComponent, BlogsSidebarComponent, CommonModule, RouterLink],
    templateUrl: './blog-sidebar.component.html',
    styles: ``
})
export class BlogSidebarComponent {
    blogs: BlogType[] = [
        {
            image: 'assets/img/all-images/blog-img1.png',
            author: 'Ben Stokes',
            date: 'April 2, 2024',
            title: 'Electrifying Reads Explore Our Electricity',
            description: 'Our team of experts is dedicated to delivering valuable content that empowers you to make informed decisions about your energy usage, while also showcasing the latest developments in the field. Whether you\'re a homeowner, business owner Whether you\'re interested in learning how to reduce your carbon',
        },
        {
            image: 'assets/img/all-images/blog-img2.png',
            author: 'Ben White',
            date: 'April 2, 2024',
            title: 'Empowering Energy Dive into Our Electricity',
            description: 'Welcome to our comprehensive electricity services blog, where we delve deep into the world of energy to bring you valuable insights, practical tips, and thought-provoking discussions. Our blog covers a diverse range of topics, from the latest advancements.Whether you\'re interested in learning how to reduce your carbon footprint.',
        },
        {
            image: 'assets/img/all-images/blog-img3.png',
            author: 'Ben Cutting',
            date: 'April 2, 2024',
            title: 'Electricity Explained: Bloggin Power of Tomorrow',
            description: 'With regular updates and new articles published, there\'s always something fresh and exciting to discover in our blog. So, whether you\'re a seasoned energy enthusiast or just starting your journey towards a greener future, join us as we explore. Whether you\'re interested in learning how to reduce.',
        }
    ];

}
