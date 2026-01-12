import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-contact',
  imports: [CommonModule],
  templateUrl: './contact.component.html',
  styles: ``,
})
export class ContactComponent {
  @Input() contact: any;

  get phoneNumbers(): string[] {
    const raw = this.contact?.phone;
    if (!raw) return [];
    return raw
      .split('/')
      .map((phone: string) => phone.trim())
      .filter(Boolean);
  }

  formatPhoneHref(phone: string): string {
    return `tel:${phone.replace(/[^\d+]/g, '')}`;
  }

  getBackgroundImage(img: string) {
    return img ? img : 'assets/img/all-images/default-contact.png';
  }

  getBackgroundStyles() {
    return {
      'background-image': `url(${this.getBackgroundImage(this.contact.background_image)})`,
      'background-position': 'center',
      'background-repeat': 'no-repeat',
      'background-size': 'cover',
    };
  }
}
