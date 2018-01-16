import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormDataService } from './data/formData.service';

import { CurrentForm } from './data/formData.model';
import { Subject } from 'rxjs/Subject';

@Component({
    selector: 'app-multi-step-wizard',
    templateUrl: './ngx-wizard.component.html',
    styleUrls: ['./ngx-wizard.component.scss']
})

export class NGXFormWizardComponent implements OnInit {

    public currentForm = new CurrentForm();

    constructor(
        private formDataService: FormDataService,
        private router: Router,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {

        this.router.navigate(['/wizards/register-crewnie/personal'], { skipLocationChange: true });

        this.formDataService.formObservable = new Subject();

        this.formDataService.formObservable.subscribe((currentForm) => {
            this.currentForm = currentForm;
        });
    }

    goToNext() {

        this.formDataService.saveInDatabase();

        this.router.navigateByUrl(this.currentForm.nextLink, { relativeTo: this.route.parent, skipLocationChange: true });
    }

}
