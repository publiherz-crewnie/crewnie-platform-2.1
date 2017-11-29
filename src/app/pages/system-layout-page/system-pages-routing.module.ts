import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SystemLayoutPageComponent } from './system-layout-page.component';


const routes: Routes = [
  {
    path: '',
     component: SystemLayoutPageComponent,
    data: {
      title: 'System Layout page'
    },    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SystemPagesRoutingModule { }
