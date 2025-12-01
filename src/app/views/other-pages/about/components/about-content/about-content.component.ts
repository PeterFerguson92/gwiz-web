import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about-content',
  imports: [RouterLink],
  templateUrl: './about-content.component.html',
  styles: ``,
})
export class AboutContentComponent {
  @Input() section_display_header = '';
  @Input() section_display_text = '';

  @Input() section_highlight_text1 = '';
  @Input() section_highlight_text2 = '';
  @Input() section_highlight_text3 = '';

  @Input() about_us_section_image1 = '';
  @Input() about_us_section_image2 = '';
}
