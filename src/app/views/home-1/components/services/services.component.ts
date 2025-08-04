import { Component } from '@angular/core';
import { serviceData } from '../data';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-services',
    imports: [CommonModule, RouterLink],
    templateUrl: './services.component.html',
    styles: ``
})
export class ServicesComponent {
    services = serviceData
}
