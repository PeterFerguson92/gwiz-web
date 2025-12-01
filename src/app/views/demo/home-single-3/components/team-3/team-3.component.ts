import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { teamMembers } from '../data';

@Component({
  selector: 'app-team-3',
  imports: [CommonModule, RouterLink],
  templateUrl: './team-3.component.html',
  styles: ``,
})
export class Team3Component {
  teamMembers = teamMembers;
}
