import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { ApiService } from '@core/services/api.service';
import { AssetService } from '@core/services/asset.service';

import { BreadcrumbComponent } from '../../../components/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-contact-us',
  imports: [BreadcrumbComponent, CommonModule],
  templateUrl: './contact-us.component.html',
  styles: ``,
})
export class ContactUsComponent {
  contact: any;
  message: string | null = '';
  showLoader = false;
  showNotification = false;
  heroImage = 'assets/img/all-images/default-contact2.jpg';

  constructor(
    private service: ApiService,
    private assetService: AssetService
  ) {}
  ngOnInit(): void {
    this.assetService
      .getCover('contact_us_cover')
      .subscribe((img) => (this.heroImage = img || this.heroImage));

    this.service.getResource('homepage/contact').subscribe(
      (data) => {
        if (data && data.status === 'success') {
          console.log(data);
          this.contact = data.result[0];
        }
      },
      (error) => {
        console.log(error);
        // this.displayError(error);
      }
    );
  }
}
