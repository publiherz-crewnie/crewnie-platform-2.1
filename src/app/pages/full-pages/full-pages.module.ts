import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

import { FullPagesRoutingModule } from "./full-pages-routing.module";

import { CrewnieProfilePageComponent } from './crewnies/crewnie-profile-page.component';

@NgModule({
    imports: [
        CommonModule,
        FullPagesRoutingModule   
    ],
    declarations: [       
        CrewnieProfilePageComponent
    ]
})
export class FullPagesModule { }
