import { Component } from '@angular/core';

import { AuthService } from '../../core/auth/auth.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent{

    constructor(
        private acAuth: AuthService,
    ) { }

    onLogout() {
        this.acAuth.logout();
    }
}
