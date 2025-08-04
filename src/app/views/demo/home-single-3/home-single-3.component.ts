import { Component } from '@angular/core';
import { SingleHeader3Component } from "./components/single-header-3/single-header-3.component";
import { Hero3Component } from "./components/hero-3/hero-3.component";
import { About3Component } from "./components/about-3/about-3.component";
import { Service3Component } from "./components/service-3/service-3.component";
import { CaseStudy3Component } from "./components/case-study-3/case-study-3.component";
import { Testimonial3Component } from "./components/testimonial-3/testimonial-3.component";
import { Team3Component } from "./components/team-3/team-3.component";
import { Contact3Component } from "./components/contact-3/contact-3.component";
import { Faq3Component } from "./components/faq-3/faq-3.component";
import { Blogs3Component } from "./components/blogs-3/blogs-3.component";
import { Footer2Component } from "@app/components/footer-2/footer-2.component";

@Component({
  selector: 'app-home-single-3',
  imports: [SingleHeader3Component, Hero3Component, About3Component, Service3Component, CaseStudy3Component, Testimonial3Component, Team3Component, Contact3Component, Faq3Component, Blogs3Component, Footer2Component],
  templateUrl: './home-single-3.component.html',
  styles: ``
})
export class HomeSingle3Component {

}
