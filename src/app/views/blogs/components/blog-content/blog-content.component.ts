import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
    selector: 'app-blog-content',
    imports: [CommonModule],
    templateUrl: './blog-content.component.html',
    styles: ``
})
export class BlogContentComponent {
    comments = [
        {
            image: 'assets/img/all-images/blog-img26.png',
            name: 'Matthew Larson',
            date: '15 March, 2023',
            text: `Welcome to our comprehensive electricity services blog, where we delve deep into the
            world of energy to bring you valuable insights, practical tips, and thought-provoking
            discussions. Introductory sentence, sets the tone for the blog's`
        },
        {
            image: 'assets/img/all-images/blog-img27.png',
            name: 'Shakib Mahmud',
            date: '15 March, 2023',
            isReply: true,
            text: `Our blog covers a diverse range of topics, from the latest advancements in renewable
            energy technology to energy efficiency hacks for your home or business. Whether you're
            interested in learning how to reduce`
        },
        {
            image: 'assets/img/all-images/blog-img28.png',
            name: 'Matthew Anderson',
            date: '15 March, 2023',
            text: `Our team of experts is committed to providing you with accurate, relevant, and engaging
            content that empowers you to take control of your energy consumption and make informed
            decisions there's always something fresh`
        }
    ];

    get commentCount(): number {
        return this.comments.filter(c => !c.isReply).length;
      }

}
