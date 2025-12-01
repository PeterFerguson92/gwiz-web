import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-about-us',
  imports: [],
  templateUrl: './about-us.component.html',
  styles: ``,
})
export class AboutUsComponent {
  @Input() homepage_display_header = '';
  @Input() homepage_display_text = '';

  @Input() highlight_text1 = '';
  @Input() highlight_text2 = '';
  @Input() highlight_text3 = '';

  @Input() about_us_homepage_image1 = '';
  @Input() about_us_homepage_image2 = '';
}
