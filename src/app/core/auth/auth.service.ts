import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth';

// Toast notifications
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Injectable()
export class AuthService {
  token: string;

  constructor(
    private afAuth: AngularFireAuth,
    public toastr: ToastsManager,
    private router: Router,
  ) {}


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
        this.router.navigate(['/login']);
      });
  }

  getToken() {    
    return this.token;
  }

  isAuthenticated() {
    // here you can check if user is authenticated or not through his token 
    return true;
  }
}
