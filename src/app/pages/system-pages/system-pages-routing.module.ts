import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterPageComponent } from './register/register-page.component';
import { LoginPageComponent } from './login/login-page.component';
import { ForgotPasswordPageComponent } from './forgot-password/forgot-password-page.component';
import { LockScreenPageComponent } from './lock-screen/lock-screen-page.component';
import { MaintenancePageComponent } from "./maintenance/maintenance-page.component";
import { ErrorPageComponent } from './error/error-page.component';

// Guards
import { IsNoLoginGuard } from '../../core/auth/is-no-login-guard.service';
import { AccountHealthGuard } from '../../core/auth/account-health-guard.service';


const routes: Routes = [
  {
    path: '',
    children: [
      // Access pages to Crewnie
      {
      path: '',
      canActivateChild: [IsNoLoginGuard],
      children: [
        {
          path: 'register',
          component: RegisterPageComponent,
          data: {
            title: 'Register Page'
          }
        },
        {
          path: 'login',
          component: LoginPageComponent,
          data: {
            title: 'Login Page'
          }
        },
        {
          path: 'forgotpassword',
          component: ForgotPasswordPageComponent,
          data: {
            title: 'Forgot Password Page'
          }
        }
    ]},
    // Crewnie exceptions
    {
      path: 'waiting-for',
      component: LockScreenPageComponent,
      data: {
        title: 'Lock Screen page'
      }
    },
    {
      path: 'register-wizard',
      canLoad: [AccountHealthGuard],
      loadChildren: './ngx-wizard/ngx-wizard.module#NGXFormWizardModule',
    },
    {
      path: 'maintenance',
      component: MaintenancePageComponent,
      data: {
        title: 'Maintenance Page'
      }
    },

    {
      path: '**',
      component: ErrorPageComponent,
      data: {
        title: '404 Error'
      }
    },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SystemPagesRoutingModule { }
