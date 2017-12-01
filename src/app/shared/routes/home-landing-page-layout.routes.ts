import { Routes, RouterModule } from '@angular/router';

// Route for content layout without sidebar, navbar and footer for pages like Login, Registration etc...

export const HOME_LANDING_PAGE_ROUTES: Routes = [
     {
        path: 'make-movies',
        loadChildren: './pages/home-landing-pages/home-landing-pages.module#HomeLandingPagesModule'
    }
];
