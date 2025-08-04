import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-breadcrumb',
    imports: [RouterLink],
    templateUrl: './breadcrumb.component.html',
    styles: ``
})
export class BreadcrumbComponent {
    @Input() title!: string
    @Input() subTitle?: string
}
