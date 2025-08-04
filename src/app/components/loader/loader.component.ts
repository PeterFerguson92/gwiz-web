import { NgIf } from '@angular/common';
import { Component, Input, type OnInit } from '@angular/core';

@Component({
    selector: 'app-loader',
    imports: [NgIf],
    templateUrl: './loader.component.html',
    styles: ``
})
export class LoaderComponent implements OnInit {
    @Input() icon?: string;
    @Input() className?: string;
    showPreloader: boolean = true;

    ngOnInit() {
        setTimeout(() => {
            this.showPreloader = false;
        }, 400);
    }
}
