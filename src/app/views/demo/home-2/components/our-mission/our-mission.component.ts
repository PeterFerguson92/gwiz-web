import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-our-mission',
    imports: [NgbNavModule,CommonModule,RouterLink],
    templateUrl: './our-mission.component.html',
    styles: ``
})
export class OurMissionComponent {
    activeTab = 1;
    tabItems = [
        {
            title: 'Our Mission',
            img: 'assets/img/all-images/mission-img1.png',
            heading: 'Empowering a Sustainable Future Electricity Services',
            paragraphs: [
                'Through cutting-edge technology, renewable energy solutions, and unwavering dedication, we aim to empower communities, businesses, and individuals alike to embrace cleaner,',
                'With every connection we make and every service we provide, we are driven by our passion for sustainability and our determination .'
            ]
        },
        {
            title: 'Our Vision',
            img: 'assets/img/all-images/mission-img1.png',
            heading: 'Empowering a Sustainable Future Electricity Services',
            paragraphs: [
                'Through cutting-edge technology, renewable energy solutions, and unwavering dedication, we aim to empower communities, businesses, and individuals alike to embrace cleaner,',
                'With every connection we make and every service we provide, we are driven by our passion for sustainability and our determination .'
            ]
        },
        {
            title: 'Our Golds',
            img: 'assets/img/all-images/mission-img1.png',
            heading: 'Empowering a Sustainable Future Electricity Services',
            paragraphs: [
                'Through cutting-edge technology, renewable energy solutions, and unwavering dedication, we aim to empower communities, businesses, and individuals alike to embrace cleaner,',
                'With every connection we make and every service we provide, we are driven by our passion for sustainability and our determination .'
            ]
        }
    ];
}
