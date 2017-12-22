import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

import { HomeLandingPagesRoutingModule } from "./home-landing-pages-routing.module";

import { ComingSoonPageComponent } from "./coming-soon/coming-soon-page.component";


@NgModule({
    imports: [
        CommonModule,
        HomeLandingPagesRoutingModule
    ],
    declarations: [
        ComingSoonPageComponent,
    ]
})
export class HomeLandingPagesModule { }
