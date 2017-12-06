import { Component, ViewChild, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { AngularFireAuth } from 'angularfire2/auth';

import { AuthService } from '../../../core/auth/auth.service';
import { Crewnie } from '../../../core/auth/crewnie.model';

import { AccountHealthGuard } from '../../../core/auth/account-health-guard.service';

// Sweet alerts notifications
import swal from 'sweetalert2';

@Component({
    selector: 'app-lock-screen-page',
    templateUrl: './lock-screen-page.component.html',
    styleUrls: ['./lock-screen-page.component.scss']
})

export class LockScreenPageComponent implements OnInit {

    user = new Crewnie ('', 'assets/img/portrait/avatars/avatar-03.png');

    problem_title: Observable<string>;
    solution: Observable<string>;
    action: Observable<string>;

    redirectUrl: Observable<string>;

    constructor(
        private afAuth: AngularFireAuth,
        private route: ActivatedRoute,
        private router: Router,
        private acAuth: AuthService,
        private accountHealthGuard: AccountHealthGuard
    ) { }

    ngOnInit() {

        this.afAuth.auth.onAuthStateChanged( firebaseUser => {
            if (firebaseUser) {
                this.user.displayName = firebaseUser.displayName;
                this.user.photoURL = firebaseUser.photoURL || this.user.photoURL;
                this.user.emailVerified = firebaseUser.emailVerified;
            } else {
                this.router.navigate(['/login']);
            }
        });

        // Capture the session problem_title if available
        this.problem_title = this.route
        .queryParamMap
        .map(params => params.get('problem_title') || 'None');

        // Capture the session solution if available
        this.solution = this.route
        .queryParamMap
        .map(params => params.get('solution') || 'None');

        // Capture the session action if available
        this.action = this.route
        .queryParamMap
        .map(params => params.get('action') || 'None');

         // Capture the session url if available
         this.redirectUrl = this.route
         .queryParamMap
         .map(params => params.get('url') || '/me');

    }

    onResendEmailVerification() {
        this.afAuth.auth.currentUser.sendEmailVerification()
        .then( () => {
            swal('Verification email re sended', 'Please check your email and open the verification link.', 'success')
            .then( () => { }, dismiss => { } ); // to avoid errors in console
        })
        .catch(e => {
            swal('Something went wrong.', e.message, 'error');
        });
    }

    onLogout() {
        this.acAuth.logout();
    }

    onReady(){
        if ( this.accountHealthGuard.canLoad ) {
           console.log('Ya lo detecta como bueno');
           window.location.href = '/me';
        }else{
            console.log('Lo detecta con error')
        }
    }

}

