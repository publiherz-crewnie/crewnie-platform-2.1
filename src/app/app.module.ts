
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Bootstrap Module
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// The App Core
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { SharedModule } from "./shared/shared.module";

// import { HomeLandingPageLayoutComponent } from './layouts/home-landing-page/home-landing-page-layout.component';
import { SystemLayoutComponent } from "./layouts/system/system-layout.component";
import { FullLayoutComponent } from "./layouts/full/full-layout.component";

// Toast notifications dependencies (only for root)
import { ToastModule, ToastOptions } from 'ng2-toastr/ng2-toastr';
import { CustomOption } from './shared/toastr/custom-option';

import * as $ from 'jquery';

@NgModule({
    declarations: [
        AppComponent,
        FullLayoutComponent,
        SystemLayoutComponent
    ],
    imports: [
        BrowserAnimationsModule,
        AppRoutingModule,
        CoreModule,
        SharedModule,
        NgbModule.forRoot(),
        ToastModule.forRoot()
    ],
    providers: [
        { provide: ToastOptions, useClass: CustomOption }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }