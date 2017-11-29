import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms';

import { SystemPagesRoutingModule } from "./system-pages-routing.module";
import { SystemLayoutPageComponent } from './system-layout-page.component';



@NgModule({
    imports: [
        CommonModule,
        SystemPagesRoutingModule,
        FormsModule        
    ],
    declarations: [
        SystemLayoutPageComponent
    ]
})
export class SystemPagesModule { }
