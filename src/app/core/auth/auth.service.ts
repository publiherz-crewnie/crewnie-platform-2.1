import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

// Toast notifications
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Injectable()
export class AuthService {
  token: string;

  constructor(
    public afAuth: AngularFireAuth,
    public toastr: ToastsManager,
    private router: Router
  ) { }

  getUserObservable(): Observable<firebase.User> {
    return this.afAuth.authState.map(user => {
      return user;
    }).first();
  }

  loginUserWithEmailAndPassword(email: string, password: string, persistence: any, url: string) {
    if (persistence) {
        this.afAuth.auth.setPersistence('local').catch(e => {
            console.log('Error code: ' + e.code + ', error message: ' + e.message);
        });
    }
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
    .then(() => {
        this.toastr.success("Now, let's go to the action.", 'Good job!');
        this.router.navigate(['/' + url]);
    })
    .catch(e => {
        // We inform the user that something went wrong with their registration
        this.toastr.error(e.message, 'Something went wrong:');
    });
  }

  logout() {
      this.toastr.warning('Getting out is security too.', "You're out!");
      return this.afAuth.auth.signOut()
      .then(() => {
        this.token = null;
        const navigationExtras = {
          queryParams: {
              'url': this.router.url,
              queryParamsHandling: 'preserve'
          }
        };
        this.router.navigate(['/login'], navigationExtras);
      });
  }

  getToken() {    
    return this.token;
  }

  isAuthenticated() {
    // here you can check if user is authenticated or not through his token 
    return true;
  }

  isAuthenticatedObservable(): Observable<boolean>{
    return this.getUserObservable().flatMap( user => {
      return Observable.of(!!user);
    });
  }
}
