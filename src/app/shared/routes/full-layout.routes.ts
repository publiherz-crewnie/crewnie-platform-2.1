import { Routes, RouterModule } from '@angular/router';

// Route for content layout with sidebar, navbar and footer
export const FULL_ROUTES: Routes = [
  {
    path: '',
    loadChildren: './pages/full-pages/full-pages.module#FullPagesModule'
  }
];