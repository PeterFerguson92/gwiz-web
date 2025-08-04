import { Component } from '@angular/core';
import { BreadcrumbComponent } from '@app/components/breadcrumb/breadcrumb.component';
import { BlogsSidebarComponent } from "../components/blogs-sidebar/blogs-sidebar.component";
import { BlogContentComponent } from "../components/blog-content/blog-content.component";
import { OurBlogsComponent } from "../components/our-blogs/our-blogs.component";

@Component({
  selector: 'app-blog-right',
  imports: [BreadcrumbComponent, BlogsSidebarComponent, BlogContentComponent, OurBlogsComponent],
  templateUrl: './blog-right.component.html',
  styles: ``
})
export class BlogRightComponent {

}
