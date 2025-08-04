import { Component } from '@angular/core';
import { FooterComponent } from "@app/components/footer/footer.component";
import { AboutComponent } from "./components/about/about.component";
import { BlogsComponent } from "./components/blogs/blogs.component";
import { BrandsComponent } from "./components/brands/brands.component";
import { ContactComponent } from "./components/contact/contact.component";
import { FaqsComponent } from "./components/faqs/faqs.component";
import { HeroComponent } from "./components/hero/hero.component";
import { PricingPlansComponent } from "./components/pricing-plans/pricing-plans.component";
import { ServicesComponent } from "./components/services/services.component";
import { TeamComponent } from "./components/team/team.component";
import { TestimonialComponent } from "./components/testimonial/testimonial.component";
import { WorkComponent } from "./components/work/work.component";
import { CtaComponent } from "./components/cta/cta.component";
import { SingleHeader1Component } from "./components/single-header-1/single-header-1.component";

@Component({
  selector: 'app-home-single-1',
  imports: [SingleHeader1Component, CtaComponent, FooterComponent, HeroComponent, AboutComponent, ServicesComponent, WorkComponent, TestimonialComponent, TeamComponent, FaqsComponent, ContactComponent, PricingPlansComponent, BrandsComponent, BlogsComponent],
  templateUrl: './home-single-1.component.html',
  styles: ``
})
export class HomeSingle1Component {

}
