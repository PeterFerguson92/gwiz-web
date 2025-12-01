import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import { MemberCardComponent } from '@app/components/cards/member-card/member-card.component';

import { teamMembers } from '../data';

@Component({
  selector: 'app-team',
  imports: [CommonModule, MemberCardComponent],
  templateUrl: './team.component.html',
  styles: ``,
})
export class TeamComponent {
  teamMembers = teamMembers;
  @Input() team: any;
}
