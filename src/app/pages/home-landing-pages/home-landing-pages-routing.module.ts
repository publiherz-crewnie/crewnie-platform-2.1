import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComingSoonPageComponent } from "./coming-soon/coming-soon-page.component";


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ComingSoonPageComponent,
        data: {
          title: 'Crewnie is coming Soon page'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeLandingPagesRoutingModule { }
