import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";

import { AuthService } from '../../../core/auth/auth.service'

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss']
})

export class LoginPageComponent {

    @ViewChild('f') loginForm: NgForm;
    redirectPath = 'me';

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private acAuth: AuthService
    ) { 
        this.route
        .queryParamMap
        .map(params => {
            this.redirectPath = params.get('url') || 'me';
        }).subscribe();
     }

    // On submit button click    
    onSubmit() {
        const email: string = this.loginForm.value.inputEmail;
        const password: string = this.loginForm.value.inputPass;
        const remember: boolean = this.loginForm.value.ckeckRemember;
        
        console.log(this.redirectPath);

        this.acAuth.loginUserWithEmailAndPassword(email, password, remember, this.redirectPath);
    }


}