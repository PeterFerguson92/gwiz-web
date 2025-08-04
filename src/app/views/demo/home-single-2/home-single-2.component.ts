import { Component } from '@angular/core';
import { SingleHeader2Component } from "./components/single-header-2/single-header-2.component";
import { Hero2Component } from './components/hero-2/hero-2.component';
import { About2Component } from "./components/about-2/about-2.component";
import { OurMissionComponent } from "./components/our-mission/our-mission.component";
import { CaseStudyComponent } from "./components/case-study/case-study.component";
import { Team2Component } from "./components/team-2/team-2.component";
import { Testimonial2Component } from "./components/testimonial-2/testimonial-2.component";
import { Faq2Component } from "./components/faq-2/faq-2.component";
import { Contact2Component } from "./components/contact-2/contact-2.component";
import { Blogs2Component } from "./components/blogs-2/blogs-2.component";
import { Cta2Component } from "./components/cta-2/cta-2.component";
import { FooterComponent } from "@app/components/footer/footer.component";

@Component({
  selector: 'app-home-single-2',
  imports: [SingleHeader2Component, Hero2Component, About2Component, OurMissionComponent, CaseStudyComponent, Team2Component, Testimonial2Component, Faq2Component, Contact2Component, Blogs2Component, Cta2Component, FooterComponent],
  templateUrl: './home-single-2.component.html',
  styles: ``
})
export class HomeSingle2Component {

}
