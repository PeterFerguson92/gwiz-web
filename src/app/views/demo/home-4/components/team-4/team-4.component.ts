import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { teamMembers } from '../data';

@Component({
  selector: 'app-team-4',
  imports: [CommonModule, RouterLink],
  templateUrl: './team-4.component.html',
  styles: ``,
})
export class Team4Component {
  teamMembers = teamMembers;
}
