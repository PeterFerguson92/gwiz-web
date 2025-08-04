import { Component } from '@angular/core';
import { teamMembers } from '../data';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-team-2',
    imports: [CommonModule,RouterLink],
    templateUrl: './team-2.component.html',
    styles: ``
})
export class Team2Component {
    teamMembers = teamMembers
}
