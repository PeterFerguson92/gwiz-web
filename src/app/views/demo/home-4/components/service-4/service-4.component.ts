import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { services } from '../data';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-service-4',
    imports: [CommonModule,RouterLink],
    templateUrl: './service-4.component.html',
    styles: ``
})
export class Service4Component {
    services = services
}
