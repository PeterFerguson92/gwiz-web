import { Component } from '@angular/core';
import { BreadcrumbComponent } from '@app/components/breadcrumb/breadcrumb.component';
import { ServiceContentComponent } from "../components/service-content/service-content.component";
import { ViewServicesComponent } from "../components/view-services/view-services.component";

@Component({
  selector: 'app-service-single',
  imports: [BreadcrumbComponent, ServiceContentComponent, ViewServicesComponent],
  templateUrl: './service-single.component.html',
  styles: ``
})
export class ServiceSingleComponent {

}
