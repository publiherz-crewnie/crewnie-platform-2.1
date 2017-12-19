import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-user-profile-page',
    templateUrl: './crewnie-profile-page.component.html',
    styleUrls: ['./crewnie-profile-page.component.scss']
})

export class CrewnieProfilePageComponent implements OnInit {
    items = [0,0,0,0,0,0,0,0,0];
    certifications = [0,0,0,0,0];

    //Variable Declaration
    currentPage: string = "About";

    constructor(){
    }

    ngOnInit() {
        // Horizontal Timeline js for user timeline
        //$.getScript('./assets/js/vertical-timeline.js');
        $.getScript('https://platform.twitter.com/widgets.js');
    }

    showPage(page: string) {
        this.currentPage = page;
    }
}