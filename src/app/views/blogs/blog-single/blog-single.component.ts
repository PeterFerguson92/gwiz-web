import { Component } from '@angular/core';
import { BreadcrumbComponent } from '@app/components/breadcrumb/breadcrumb.component';
import { BlogContentComponent } from "../components/blog-content/blog-content.component";
import { OurBlogsComponent } from "../components/our-blogs/our-blogs.component";

@Component({
  selector: 'app-blog-single',
  imports: [BreadcrumbComponent, BlogContentComponent, OurBlogsComponent],
  templateUrl: './blog-single.component.html',
  styles: ``
})
export class BlogSingleComponent {

}
