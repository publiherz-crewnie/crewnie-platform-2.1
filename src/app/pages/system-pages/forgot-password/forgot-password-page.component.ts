import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from "@angular/router";

import { AngularFireAuth } from 'angularfire2/auth';

// Sweet alerts notifications
import swal from 'sweetalert2';

@Component({
    selector: 'app-forgot-password-page',
    templateUrl: './forgot-password-page.component.html',
    styleUrls: ['./forgot-password-page.component.scss']
})

export class ForgotPasswordPageComponent {
    @ViewChild('f') forogtPasswordForm: NgForm;

    constructor(
        private router: Router,
        private afAuth: AngularFireAuth
    ) { }

    onSubmit() {
        const email: string = this.forogtPasswordForm.value.inputEmail;
        
        this.afAuth.auth.sendPasswordResetEmail(email)
        .then(() => {
            swal('Email sent successfully!', 'Now just check your email.', 'success').then( () => {
                this.router.navigate(['/login']);
            });

        })
        .catch(e => {
            // We inform the user that something went wrong
            swal('Something went wrong.', e.message, 'error');
        });
    }
}