import { Component } from '@angular/core';
import { BreadcrumbComponent } from '@app/components/breadcrumb/breadcrumb.component';
import { CaseContentComponent } from "../components/case-content/case-content.component";
import { MoreCasesComponent } from "../components/more-cases/more-cases.component";

@Component({
  selector: 'app-case-single',
  imports: [BreadcrumbComponent, CaseContentComponent, MoreCasesComponent],
  templateUrl: './case-single.component.html',
  styles: ``
})
export class CaseSingleComponent {

}
