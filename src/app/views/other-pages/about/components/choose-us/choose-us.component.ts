import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-choose-us',
  imports: [CommonModule,RouterLink],
  templateUrl: './choose-us.component.html',
  styles: ``
})
export class ChooseUsComponent implements OnInit {
    progressItems = [
      { label: 'AC installation in one hour', target: 80, current: 0 },
      { label: 'Full-service electrical', target: 90, current: 0 },
      { label: 'Wiring and installation', target: 70, current: 0 }
    ];
  
    ngOnInit(): void {
      this.animateProgress();
    }
    animateProgress(): void {
      const speed = 30;
      this.progressItems.forEach((item, idx) => {
        let i = 0;
        const interval = setInterval(() => {
          if (i <= item.target) {
            this.progressItems[idx].current = i;
          } else {
            clearInterval(interval);
          }
          i++;
        }, speed);
      });
    }
  }
