import type { MemberType } from '@/types';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BreadcrumbComponent } from "@app/components/breadcrumb/breadcrumb.component";
import { MemberCardComponent } from "../../../components/cards/member-card/member-card.component";
import { PaginationComponent } from "../../../components/pagination/pagination.component";

@Component({
    selector: 'app-our-team',
    imports: [BreadcrumbComponent, CommonModule, MemberCardComponent, PaginationComponent],
    templateUrl: './our-team.component.html',
    styles: ``
})
export class OurTeamComponent {
    teamMembers: MemberType[] = [
        {
            name: "Shoaib Bashir",
            role: "Sales Manager",
            image: "assets/img/all-images/team-img1.png",
        },
        {
            name: "William Thompson",
            role: "Product Manager",
            image: "assets/img/all-images/team-img2.png",
        },
        {
            name: "Reece Toply",
            role: "Team Leader",
            image: "assets/img/all-images/team-img3.png",
        },
        {
            name: "Robert Anderson",
            role: "Sales Manager",
            image: "assets/img/all-images/team-img4.png",
        },
        {
            name: "Pat Cummins",
            role: "Sales Manager",
            image: "assets/img/all-images/team-img8.png",
        },
        {
            name: "Mahika Gaur",
            role: "Product Manager",
            image: "assets/img/all-images/team-img9.png",
        },
        {
            name: "Tim David",
            role: "Sales Manager",
            image: "assets/img/all-images/team-img10.png",
        },
        {
            name: "Jonny Bairstow",
            role: "Team Leader",
            image: "assets/img/all-images/team-img11.png",
        },
        {
            name: "Ben Duckett",
            role: "Product Manager",
            image: "assets/img/all-images/team-img12.png",
        },
        {
            name: "Sophia Dunkley",
            role: "Sales Manager",
            image: "assets/img/all-images/team-img13.png",
        },
        {
            name: "Matthew Potts",
            role: "Sales Manager",
            image: "assets/img/all-images/team-img14.png",
        },
        {
            name: "George Scrimshaw",
            role: "Team Leader",
            image: "assets/img/all-images/team-img15.png",
        }
    ]

}
