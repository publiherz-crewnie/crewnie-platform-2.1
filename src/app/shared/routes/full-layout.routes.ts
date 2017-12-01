import { Routes, RouterModule } from '@angular/router';

//Route for content layout with sidebar, navbar and footer
export const FULL_ROUTES: Routes = [
  {
    path: 'full-layout',
    loadChildren: './pages/full-pages/full-pages.module#FullPagesModule'
  }
];