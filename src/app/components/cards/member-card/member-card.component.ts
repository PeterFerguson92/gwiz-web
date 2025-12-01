import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-member-card',
  imports: [],
  templateUrl: './member-card.component.html',
  styles: ``,
})
export class MemberCardComponent {
  @Input() member: any;
  getProfileImage(img: string) {
    return img ? img : 'assets/img/all-images/default-profile.png';
  }
}
