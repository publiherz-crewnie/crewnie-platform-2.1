import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrewnieProfilePageComponent } from 'app/pages/full-pages/crewnies/crewnie-profile-page.component';
import { AccountHealthGuard } from '../../core/auth/account-health-guard.service';

const routes: Routes = [
  {
    path: 'crewnies',
    canLoad: [AccountHealthGuard],
    component: CrewnieProfilePageComponent,
    data: {
      title: 'Crewnie Profile Page'
    },    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FullPagesRoutingModule { }
