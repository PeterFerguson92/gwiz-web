import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { services } from '../data';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-service-3',
  imports: [CommonModule,RouterLink],
  templateUrl: './service-3.component.html',
  styles: ``
})
export class Service3Component {
services=services
}
