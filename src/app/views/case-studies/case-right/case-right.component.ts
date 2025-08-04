import { Component } from '@angular/core';
import { BreadcrumbComponent } from '@app/components/breadcrumb/breadcrumb.component';
import { CaseContentComponent } from "../components/case-content/case-content.component";
import { CaseSidebarComponent } from "../components/case-sidebar/case-sidebar.component";
import { MoreCasesComponent } from "../components/more-cases/more-cases.component";

@Component({
  selector: 'app-case-right',
  imports: [BreadcrumbComponent, CaseContentComponent, CaseSidebarComponent, MoreCasesComponent],
  templateUrl: './case-right.component.html',
  styles: ``
})
export class CaseRightComponent {

}
