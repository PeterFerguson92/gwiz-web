import { Component } from '@angular/core';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-pagination',
    imports: [NgbPaginationModule],
    templateUrl: './pagination.component.html',
    styles: ``
})
export class PaginationComponent {
    page = 2
}
