import { Component, OnInit } from '@angular/core';

import { FormDataService } from '../data/formData.service';
import { WorkflowService } from "../workflow/workflow.service";
import { STEPS } from "../workflow/workflow.model";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
    selector: 'mt-wizard-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {
    title = 'Connect with the right people!';
    workType: string;
    form: any;

    isUsernameValid = false;
    isProfilePhotoValid = false;  // AQUÍ VOY
    isCoverImageValid = false;

    constructor(private router: Router,
        private route: ActivatedRoute, private formDataService: FormDataService,
        private workflowService: WorkflowService) {
    }

    ngOnInit() {
        // this.workType = this.formDataService.getWork();
    }

    //Save button event Starts
    save(form: any) {
        if (!form.valid)
            return;

        this.formDataService.setWork(this.workType);
        let firstState = this.workflowService.getFirstInvalidStep(STEPS.profile);       
        this.router.navigate(['address'], { relativeTo: this.route.parent, skipLocationChange: true });
    }
    //Save button event Ends

    //Cancel button event Starts
    cancel() {
        this.router.navigate(['/register-wizard/address'], { relativeTo: this.route.parent, skipLocationChange: true });
    }
    //Cancel button event Ends

}