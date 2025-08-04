import type { ServiceType } from '@/types';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-service-card',
    imports: [RouterLink],
    templateUrl: './service-card.component.html',
    styles: ``
})
export class ServiceCardComponent {
    @Input() service!: ServiceType
}
