import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

// Crewnie Auth Feature
import { AuthService } from './auth/auth.service';
// import { AuthGuard } from './auth/auth-guard.service';

// Firebase dependencies
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../../environments/environment';

@NgModule({
    imports: [
        CommonModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule
    ],
    declarations: [

    ],
    providers: [
        AuthService
    ],
})
export class CoreModule { }
