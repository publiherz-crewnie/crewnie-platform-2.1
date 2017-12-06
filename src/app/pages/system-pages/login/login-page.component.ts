import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";

import { AuthService } from '../../../core/auth/auth.service'

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss']
})

export class LoginPageComponent {

    @ViewChild('f') loginForm: NgForm;

    constructor(private router: Router,
        private route: ActivatedRoute,
        private acAuth: AuthService
    ) { }

    // On submit button click    
    onSubmit() {
        const email: string = this.loginForm.value.inputEmail;
        const password: string = this.loginForm.value.inputPass;
        const remember: boolean = this.loginForm.value.ckeckRemember;
  
        this.acAuth.loginUserWithEmailAndPassword(email, password, remember, 'me');
    }


}