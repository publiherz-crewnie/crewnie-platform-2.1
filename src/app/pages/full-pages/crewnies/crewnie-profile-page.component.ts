import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-user-profile-page',
    templateUrl: './crewnie-profile-page.component.html',
    styleUrls: ['./crewnie-profile-page.component.scss']
})

export class CrewnieProfilePageComponent implements OnInit {

    //Variable Declaration
    currentPage: string = "About"

    ngOnInit() {
        // Horizontal Timeline js for user timeline
        $.getScript('./assets/js/vertical-timeline.js');
    }

    showPage(page: string) {
        this.currentPage = page;
    }
}