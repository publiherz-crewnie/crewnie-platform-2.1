import { Injectable } from '@angular/core';
import {
    CanActivateChild,
    Router, Route,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    NavigationExtras
  } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

// Auth Service
import { AuthService } from './auth.service';

@Injectable()
export class IsNoLoginGuard implements CanActivateChild {

    constructor(
        private router: Router,
        private acAuth: AuthService  // Angular Crewnie Authentication
    ) { }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>  {
        return this.acAuth.afAuth.authState.map( firebaseUser => {
            if (!!firebaseUser) {
                this.acAuth.toastr.info('You will be redirected to the action.', 'You are already inside!');
                this.router.navigate(['/me']);
                return false
            } else {
                return true;
            }
        }).first();
    }
}