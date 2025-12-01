import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-service-card',
  imports: [],
  templateUrl: './service-card.component.html',
  styles: ``,
})
export class ServiceCardComponent {
  @Input() index: any;
  @Input() service: any;
}
