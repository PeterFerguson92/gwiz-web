import type { ServiceType } from '@/types';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BreadcrumbComponent } from "@app/components/breadcrumb/breadcrumb.component";
import { ServiceContentComponent } from "../components/service-content/service-content.component";
import { ServiceSidebarComponent } from "../components/service-sidebar/service-sidebar.component";
import { ViewServicesComponent } from "../components/view-services/view-services.component";

@Component({
    selector: 'app-service-left',
    imports: [BreadcrumbComponent, ServiceSidebarComponent, CommonModule, ServiceContentComponent, ViewServicesComponent],
    templateUrl: './service-left.component.html',
    styles: ``
})
export class ServiceLeftComponent {

}
