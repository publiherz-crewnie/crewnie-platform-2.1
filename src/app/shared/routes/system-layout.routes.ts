import { Routes, RouterModule } from '@angular/router';

//Route for system layout without sidebar, navbar and footer for pages like Login, Registration etc...

export const SYSTEM_ROUTES: Routes = [
    {
        path: 'system-layout',
        loadChildren: './pages/system-layout-page/system-pages.module#SystemPagesModule'
      }
];