import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "@app/components/footer/footer.component";
import { LoaderComponent } from "@app/components/loader/loader.component";
import { ScrollToTopComponent } from "@app/components/scroll-to-top/scroll-to-top.component";
import { CtaComponent } from "../components/cta/cta.component";
import { TopbarComponent } from '@app/components/topbar/topbar.component';

@Component({
    selector: 'app-layout',
    imports: [LoaderComponent, ScrollToTopComponent, TopbarComponent, RouterOutlet, FooterComponent, CtaComponent],
    templateUrl: './layout.component.html',
    styles: ``
})
export class LayoutComponent {
}
