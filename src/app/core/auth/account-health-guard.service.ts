import { Injectable } from '@angular/core';
import {
    CanActivate, CanLoad,
    CanActivateChild,
    Router, Route,
    NavigationExtras
  } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class AccountHealthGuard implements CanLoad {

    constructor(
        private router: Router,
        private afAuth: AngularFireAuth
    ) { }

    canLoad( route: Route ): Observable<boolean> {

        return this.afAuth.authState.map(user => {
            if (!user) {
                const navigationExtras = {
                    queryParams: {
                        'url': route.path,
                        queryParamsHandling: 'preserve'
                    }
                };
                this.router.navigate(['/login'], navigationExtras);
                return false;
            } else {
            };
            if ( this.isEmailValidated( user.emailVerified ) ) {
                return true;
            } else {
                return false;
            };
        }).first();

      }

    isEmailValidated( emailVerified ) {
        let navigationExtras: NavigationExtras;

        if (!emailVerified) {
            navigationExtras = {
                queryParams: {
                    'problem_title': 'Please validate your email',
                    'solution': 'Please check your email, and click on the validation link to activate your account.',
                    'action': 'Resend verification code',
                    queryParamsHandling: 'preserve'
                }
            };
            this.router.navigate(['/waiting-for'], navigationExtras,);
            return false;
        } else {
            return true;
        }
    }
    isRegistrationFinished() {
        return true;
    }
}
