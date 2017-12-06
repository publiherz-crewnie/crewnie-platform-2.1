import { Routes, RouterModule } from '@angular/router';

import { AccountHealthGuard } from '../../core/auth/account-health-guard.service';

//Route for content layout with sidebar, navbar and footer
export const FULL_ROUTES: Routes = [
  {
    path: 'me',
    canLoad: [AccountHealthGuard],
    loadChildren: './pages/full-pages/full-pages.module#FullPagesModule'
  }
];