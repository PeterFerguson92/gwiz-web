import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-services',
  imports: [CommonModule],
  templateUrl: './services.component.html',
  styles: ``,
})
export class ServicesComponent {
  // services = serviceData
  @Input() services: any;
  @Input() serviceTitle = '';
  @Input() serviceDescription = '';
}
