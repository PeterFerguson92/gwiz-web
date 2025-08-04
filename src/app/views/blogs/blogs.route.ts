import { Routes } from '@angular/router';
import { Blog1Component } from './blog-1/blog-1.component';
import { BlogSidebarComponent } from './blog-sidebar/blog-sidebar.component';
import { BlogLeftComponent } from './blog-left/blog-left.component';
import { BlogRightComponent } from './blog-right/blog-right.component';
import { BlogSingleComponent } from './blog-single/blog-single.component';

export const BLOGS_ROUTES: Routes = [
    {
        path: 'blogs/one',
        component: Blog1Component,
        data: { title: "Blog One" }
    },
    {
        path: 'blogs/sidebar',
        component: BlogSidebarComponent,
        data: { title: "Blog Sidebar"}
    },
    {
        path: 'blogs/left',
        component: BlogLeftComponent,
        data: { title: "Blog Left" }
    },
    {
        path: 'blogs/right',
        component: BlogRightComponent,
        data: { title: "Blog Right" }
    },
    {
        path: 'blogs/single',
        component: BlogSingleComponent,
        data: { title: "Blog Single" }
    },
];
