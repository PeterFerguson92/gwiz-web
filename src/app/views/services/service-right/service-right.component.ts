import { Component } from '@angular/core';
import { BreadcrumbComponent } from "@app/components/breadcrumb/breadcrumb.component";
import { ServiceContentComponent } from "../components/service-content/service-content.component";
import { ViewServicesComponent } from "../components/view-services/view-services.component";
import { ServiceSidebarComponent } from "../components/service-sidebar/service-sidebar.component";

@Component({
  selector: 'app-service-right',
  imports: [BreadcrumbComponent, ServiceContentComponent, ViewServicesComponent, ServiceSidebarComponent],
  templateUrl: './service-right.component.html',
  styles: ``
})
export class ServiceRightComponent {

}
