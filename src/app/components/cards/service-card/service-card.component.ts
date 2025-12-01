import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

import type { ServiceType } from '@/types';

@Component({
  selector: 'app-service-card',
  imports: [RouterLink],
  templateUrl: './service-card.component.html',
  styles: ``,
})
export class ServiceCardComponent {
  @Input() index: any;
  @Input() service: any;
}
