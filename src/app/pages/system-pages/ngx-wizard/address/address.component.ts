import { Component, OnInit } from '@angular/core';

import { Address } from '../data/formData.model';
import { FormDataService } from '../data/formData.service';
import { WorkflowService } from '../workflow/workflow.service';
import { STEPS } from '../workflow/workflow.model';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'app-mt-wizard-address',
    templateUrl: './address.component.html',
    styleUrls: ['./address.component.scss']
})

export class AddressComponent implements OnInit {
    title = 'Where do you unwrap?';
    address = new Address;
    form: any;

    constructor(private router: Router,
        private route: ActivatedRoute, private formDataService: FormDataService,
        private workflowService: WorkflowService
    ) {
    }

    ngOnInit() {
         // I subscribe to the changes in real time of the Personal global class
        this.formDataService.getAddress().subscribe( address => {
            this.address = address;
        });
    }
    
    // Save button event Starts
    save(form: any) {
        if (!form.valid) {
            return;
        }

        this.formDataService.setAddress(this.address);
        
        const firstState = this.workflowService.getFirstInvalidStep(STEPS.work);
        this.router.navigate(['/register-wizard/work'], { relativeTo: this.route.parent, skipLocationChange: true });
    }
    // Save button event Ends

    // Cancel button event Starts
    cancel() {
        this.router.navigate(['/register-wizard/personal'], { skipLocationChange: true });
    }
    // Cancel button event Ends
}
