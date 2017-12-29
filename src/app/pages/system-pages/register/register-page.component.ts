import { Component, ViewChild, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth';

// Sweet alerts notifications
import swal from 'sweetalert2';

@Component({
    selector: 'app-register-page',
    templateUrl: './register-page.component.html',
    styleUrls: ['./register-page.component.scss']
})

export class RegisterPageComponent {
    @ViewChild('f') registerForm: NgForm;

    constructor(
        private router: Router,
        private afAuth: AngularFireAuth
    ) {  }

    ngOnInit() {
        $('body').css('background', 'black url(/assets/img/backgrounds/conceptual_photo.jpg) center center no-repeat');
        $('body').css('background-size', 'cover');
        $('body').css('background-attachment', 'fixed');

        $('.login-eye').hover(function () {
            $('.login-password').attr('type', 'text');
            $('.login-eye').removeClass('fa-eye-slash').addClass('fa-eye');
         }, function () {
            $('.login-password').attr('type', 'password');
            $('.login-eye').removeClass('fa-eye').addClass('fa-eye-slash');
        });
    }

    //  On submit click, the user registration process starts
    onSubmit() {

        const stageName: string = this.registerForm.value.sname;
        const email: string     = this.registerForm.value.inputEmail;
        const password: string  = this.registerForm.value.inputPass;


        // We set the register persistent.
        this.afAuth.auth.setPersistence('local').catch(e => {
            console.log('Error code: ' + e.code + ', error message: ' + e.message);
        });

        this.afAuth.auth.createUserWithEmailAndPassword(email, password)
            .then(crewnieUser => {
                // We inform the user that their registration was correct.
                swal('Good job!', 'Now just check your email.', 'success').then( () => {
                    this.router.navigate(['/me']);
                }, dismiss => { });

                crewnieUser.updateProfile({
                    displayName: stageName,
                }).then( () => {
                    console.log('displayName Update successful.');
                }).catch( () => {
                    console.log("An error happened when we put the user's stage name.");
                });
                console.log(crewnieUser);
                crewnieUser.sendEmailVerification().then( () => {
                    console.log('Email sent successful.');
                  }).catch(function(error) {
                    console.log('An error happened when we send the verification email');
                  });
            })
            .catch(e => {
                 // We inform the user that something went wrong with their registration
                 swal('Something went wrong.', e.message, 'error');
            }
        );
    }
}