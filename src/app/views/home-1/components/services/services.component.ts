import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { serviceData } from '../data';

@Component({
  selector: 'app-services',
  imports: [CommonModule, RouterLink],
  templateUrl: './services.component.html',
  styles: ``,
})
export class ServicesComponent {
  // services = serviceData
  @Input() services: any;
  @Input() serviceTitle = '';
  @Input() serviceDescription = '';
}
