import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { teamMembers } from '../data';

@Component({
  selector: 'app-team-2',
  imports: [CommonModule, RouterLink],
  templateUrl: './team-2.component.html',
  styles: ``,
})
export class Team2Component {
  teamMembers = teamMembers;
}
