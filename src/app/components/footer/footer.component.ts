import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-footer',
    imports: [RouterLink],
    templateUrl: './footer.component.html',
    styles: ``
})
export class FooterComponent {
    currentYear = new Date().getFullYear()
    @Input() logo!: string;
    @Input() containerClass!: string;
}
