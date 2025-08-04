import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { teamMembers } from '../data';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-team-4',
    imports: [CommonModule,RouterLink],
    templateUrl: './team-4.component.html',
    styles: ``
})
export class Team4Component {
    teamMembers = teamMembers
}
