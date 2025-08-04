import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { workData } from '../data';
import { RouterLink } from '@angular/router';
@Component({
    selector: 'app-work',
    imports: [ CommonModule,NgbNavModule,RouterLink],
    templateUrl: './work.component.html',
    styles: ``
})
export class WorkComponent {
    active = 'tab0';
    tabs = workData
}
