import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms';

import { SystemPagesRoutingModule } from "./system-pages-routing.module";

import { RegisterPageComponent } from './register/register-page.component';
import { LoginPageComponent } from './login/login-page.component';
import { ForgotPasswordPageComponent } from './forgot-password/forgot-password-page.component';
import { ErrorPageComponent } from './error/error-page.component';
// import { MaintenancePageComponent } from './maintenance/maintenance-page.component';


@NgModule({
    imports: [
        CommonModule,
        SystemPagesRoutingModule,
        FormsModule        
    ],
    declarations: [
        RegisterPageComponent,
        LoginPageComponent,
        ForgotPasswordPageComponent,
        ErrorPageComponent
    ]
})
export class SystemPagesModule { }
