import { Component } from '@angular/core';
import { teamMembers } from '../data';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-team-3',
    imports: [CommonModule,RouterLink],
    templateUrl: './team-3.component.html',
    styles: ``
})
export class Team3Component {
    teamMembers = teamMembers
}
