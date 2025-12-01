import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { cases } from '../data';

@Component({
  selector: 'app-case-study-4',
  imports: [CommonModule, RouterLink],
  templateUrl: './case-study-4.component.html',
  styles: ``,
})
export class CaseStudy4Component {
  cases = cases;
}
