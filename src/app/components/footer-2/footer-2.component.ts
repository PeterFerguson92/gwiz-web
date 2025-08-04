import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer-2',
  imports: [RouterLink],
  templateUrl: './footer-2.component.html',
  styles: ``
})
export class Footer2Component {
    currentYear = new Date().getFullYear()
    @Input() logo!: string;
    @Input() containerClass!: string;
    @Input() btnClass!: string;
}
