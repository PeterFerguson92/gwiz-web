import { Component } from '@angular/core';
import { LoaderComponent } from "@app/components/loader/loader.component";
import { About2Component } from "./components/about-2/about-2.component";
import { CaseStudyComponent } from "./components/case-study/case-study.component";
import { Hero2Component } from "./components/hero-2/hero-2.component";
import { OurMissionComponent } from "./components/our-mission/our-mission.component";
import { Team2Component } from "./components/team-2/team-2.component";
import { Testimonial2Component } from "./components/testimonial-2/testimonial-2.component";
import { Faq2Component } from "./components/faq-2/faq-2.component";
import { Contact2Component } from "./components/contact-2/contact-2.component";
import { Blogs2Component } from "./components/blogs-2/blogs-2.component";
import { Cta2Component } from "./components/cta-2/cta-2.component";
import { FooterComponent } from "@app/components/footer/footer.component";
import { TopbarComponent } from '@app/components/topbar/topbar.component';

@Component({
  selector: 'app-home-2',
  imports: [LoaderComponent, Hero2Component, About2Component, OurMissionComponent, CaseStudyComponent, Team2Component, TopbarComponent, Testimonial2Component, Faq2Component, Contact2Component, Blogs2Component, Cta2Component, FooterComponent],
  templateUrl: './home-2.component.html',
  styles: ``
})
export class Home2Component {
    title='Home 2'

}
