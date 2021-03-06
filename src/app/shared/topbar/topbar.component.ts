import { Component, OnInit } from '@angular/core';
import { ROUTES } from './topbar-routes.config';
import { RouteInfo } from "./topbar.metadata";
import { Router, ActivatedRoute } from "@angular/router";

declare var $: any;
@Component({
    // moduleId: module.id,
    selector: 'app-topbar',
    templateUrl: './topbar.component.html',
    styleUrls: ['./topbar.component.scss']
})

export class TopbarComponent implements OnInit {
    public menuItems: any[];


    ngOnInit() {
        //$.getScript('./assets/js/app-sidebar.js');
        this.menuItems = ROUTES.filter(menuItem => menuItem);

        
    }

}
