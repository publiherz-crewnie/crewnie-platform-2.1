import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

// import { HomeLandingPageLayoutComponent } from './layouts/home-landing-page/home-landing-page-layout.component';
// When we have the main landing page we will use this layout component (HomeLandingPageLayoutComponent), so the coming soon page works well with the system layout.
import { FullLayoutComponent } from "./layouts/full/full-layout.component";
import { SystemLayoutComponent } from "./layouts/system/system-layout.component";

import { HOME_LANDING_PAGE_ROUTES } from './shared/routes/home-landing-page-layout.routes';
import { FULL_ROUTES } from "./shared/routes/full-layout.routes";
import { SYSTEM_ROUTES } from "./shared/routes/system-layout.routes";

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'make-movies',
    pathMatch: 'full',
  },
  { path: '', component: SystemLayoutComponent, data: { title: 'HomeLandingPage Views' }, children: HOME_LANDING_PAGE_ROUTES },
  { path: '', component: FullLayoutComponent, data: { title: 'full Views' }, children: FULL_ROUTES},
  { path: '', component: SystemLayoutComponent, data: { title: 'system Views' }, children: SYSTEM_ROUTES },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
