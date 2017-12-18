import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

import { FullPagesRoutingModule } from "./full-pages-routing.module";

import { FullLayoutPageComponent } from './full-layout-page.component';

import { CrewniesPage } from './crewnies/crewnies-page.component';

@NgModule({
    imports: [
        CommonModule,
        FullPagesRoutingModule   
    ],
    declarations: [       
        FullLayoutPageComponent,
        CrewniesPage
    ]
})
export class FullPagesModule { }
