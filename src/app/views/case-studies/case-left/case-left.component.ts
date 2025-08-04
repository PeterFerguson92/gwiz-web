import { Component } from '@angular/core';
import { BreadcrumbComponent } from "../../../components/breadcrumb/breadcrumb.component";
import { CaseSidebarComponent } from "../components/case-sidebar/case-sidebar.component";
import { CaseContentComponent } from "../components/case-content/case-content.component";
import { MoreCasesComponent } from "../components/more-cases/more-cases.component";

@Component({
  selector: 'app-case-left',
  imports: [BreadcrumbComponent, CaseSidebarComponent, CaseContentComponent, MoreCasesComponent],
  templateUrl: './case-left.component.html',
  styles: ``
})
export class CaseLeftComponent {

}
