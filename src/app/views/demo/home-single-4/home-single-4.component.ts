import { Component } from '@angular/core';
import { SingleHeader4Component } from "./components/single-header-4/single-header-4.component";
import { Hero4Component } from "./components/hero-4/hero-4.component";
import { About4Component } from "./components/about-4/about-4.component";
import { Service4Component } from "./components/service-4/service-4.component";
import { CaseStudy4Component } from "./components/case-study-4/case-study-4.component";
import { Testimonial4Component } from "./components/testimonial-4/testimonial-4.component";
import { Team4Component } from "./components/team-4/team-4.component";
import { Contact4Component } from "./components/contact-4/contact-4.component";
import { Blogs4Component } from "./components/blogs-4/blogs-4.component";
import { Footer2Component } from "@app/components/footer-2/footer-2.component";

@Component({
  selector: 'app-home-single-4',
  imports: [SingleHeader4Component, Hero4Component, About4Component, Service4Component, CaseStudy4Component, Testimonial4Component, Team4Component, Contact4Component, Blogs4Component, Footer2Component],
  templateUrl: './home-single-4.component.html',
  styles: ``
})
export class HomeSingle4Component {

}
