import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "@app/components/footer/footer.component";
import { LoaderComponent } from "@app/components/loader/loader.component";
import { ScrollToTopComponent } from "@app/components/scroll-to-top/scroll-to-top.component";
import { TopbarComponent } from '@app/components/topbar/topbar.component';
import { ToastComponent } from '@/app/shared/components/toast/toast.component';

@Component({
    selector: 'app-layout',
    imports: [LoaderComponent, ScrollToTopComponent, TopbarComponent, RouterOutlet, FooterComponent,ToastComponent],
    templateUrl: './layout.component.html',
    styles: ``
})
export class LayoutComponent {
}
