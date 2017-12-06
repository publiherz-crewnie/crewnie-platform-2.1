import { Component, OnInit } from '@angular/core';

import { Personal } from '../data/formData.model';
import { FormDataService } from '../data/formData.service';
import { WorkflowService } from '../workflow/workflow.service';
import { STEPS } from '../workflow/workflow.model';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'app-mt-wizard-personal',
    templateUrl: './personal.component.html',
    styleUrls: ['./personal.component.scss']
})

export class PersonalComponent implements OnInit {

  title = 'Please tell us about yourself.';
  personal = new Personal;
  form: any;

  public crewnie: Observable<Personal>;

  constructor(
    private router: Router, private route: ActivatedRoute,
    private formDataService: FormDataService,
    private workflowService: WorkflowService
  ) {    }

  ngOnInit() {

    // I subscribe to the changes in real time of the Personal global class
    this.formDataService.getPersonal().subscribe( personal => {
       this.personal = personal;
    });

  }

  // Save button event Starts
  save(form: any) {
      if (!form.valid) {
          return;
      }

      this.formDataService.setPersonal(this.personal);

      const firstState = this.workflowService.getFirstInvalidStep(STEPS.work);
      if (firstState.length > 0) {
      };
      this.router.navigateByUrl('/register-wizard/address', { relativeTo: this.route.parent, skipLocationChange: true });
  }
  // Save button event Ends
}
