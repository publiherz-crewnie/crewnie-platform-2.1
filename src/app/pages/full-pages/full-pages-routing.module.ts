import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FullLayoutPageComponent } from 'app/pages/full-pages/full-layout-page.component';
import { CrewniesPage } from 'app/pages/full-pages/crewnies/crewnies-page.component';

import { AccountHealthGuard } from '../../core/auth/account-health-guard.service';

const routes: Routes = [
  {
    path: '',
    canLoad: [AccountHealthGuard],
     component: FullLayoutPageComponent,
    data: {
      title: 'Full Layout Page'
    },    
  },
  {
    path: 'crewnies',
    canLoad: [AccountHealthGuard],
     component: CrewniesPage,
    data: {
      title: 'Crewnies'
    },    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FullPagesRoutingModule { }
