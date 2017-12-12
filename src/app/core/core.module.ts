import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

// Crewnie Auth Feature
import { AuthService } from './auth/auth.service';
import { AccountHealthGuard } from './auth/account-health-guard.service';
import { IsNoLoginGuard } from './auth/is-no-login-guard.service';

// Firebase dependencies
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { environment } from '../../environments/environment';

@NgModule({
    imports: [
        CommonModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        AngularFirestoreModule
    ],
    declarations: [

    ],
    providers: [
        AuthService,
        AccountHealthGuard,
        IsNoLoginGuard
    ],
})
export class CoreModule { }
