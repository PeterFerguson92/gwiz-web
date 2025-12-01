import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { blogs } from '../data';

@Component({
  selector: 'app-blogs-4',
  imports: [CommonModule, RouterLink],
  templateUrl: './blogs-4.component.html',
  styles: ``,
})
export class Blogs4Component {
  blogPosts = blogs;
}
