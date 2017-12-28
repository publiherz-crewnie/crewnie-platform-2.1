import { NgModule } from '@angular/core';

import { NGXWizardRoutingModule } from './ngx-wizard-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/* App Root */
import { NGXFormWizardComponent } from './ngx-wizard.component';
import { NavbarComponent } from './navbar/navbar.component';

/* Feature Components */
import { PersonalComponent } from './personal/personal.component';
import { AddressComponent } from './address/address.component';
import { ProfileComponent } from './profile/profile.component';
import { ResultComponent } from './result/result.component';

/* Shared Service */
import { FormDataService } from './data/formData.service';
import { WorkflowService } from './workflow/workflow.service';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AgmCoreModule } from '@agm/core';


@NgModule({
    imports: [CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule.forRoot(),
        NGXWizardRoutingModule,
        AgmCoreModule
    ],
    providers: [
        { provide: FormDataService, useClass: FormDataService },
        { provide: WorkflowService, useClass: WorkflowService }
    ],
    declarations: [
        NGXFormWizardComponent, NavbarComponent, PersonalComponent, AddressComponent, ProfileComponent, ResultComponent
    ],
    bootstrap: [NGXFormWizardComponent]

})

export class NGXFormWizardModule { }
