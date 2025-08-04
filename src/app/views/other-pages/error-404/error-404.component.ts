import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BreadcrumbComponent } from "@app/components/breadcrumb/breadcrumb.component";

@Component({
  selector: 'app-error-404',
  imports: [BreadcrumbComponent,RouterLink],
  templateUrl: './error-404.component.html',
  styles: ``
})
export class Error404Component {

}
