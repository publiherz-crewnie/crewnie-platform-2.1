import { Component, OnInit, Input } from '@angular/core';

import { Personal, CurrentForm } from '../data/formData.model';
import { FormDataService } from '../data/formData.service';
import { STEPS } from '../workflow/workflow.model';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-mt-wizard-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss']
})

export class PersonalComponent implements OnInit {

  title = 'Personal information';

  personal = new Personal;

  public currentPersonalForm: CurrentForm = {
    isValid: false,
    nextLink: '/wizards/register-crewnie/address',
    backLink: '',
  };

  public crewnie: Observable<Personal>;

  constructor(
    private router: Router, private route: ActivatedRoute,
    private formDataService: FormDataService
  ) { }

  ngOnInit() {

    // I subscribe to the changes in real time of the Personal global class
    this.formDataService.getPersonal().subscribe(personal => {
      this.personal = personal;
      if (personal.birthdate) {
        this.formDataService.setPersonal(this.personal)
        this.currentPersonalForm.isValid = true;
        this.formDataService.formObservable.next(this.currentPersonalForm);
      }
    });

    this.formDataService.formObservable.next(this.currentPersonalForm);

  }

  onChange(form) {

    if (this.currentPersonalForm.isValid !== form.valid) {
      this.currentPersonalForm.isValid = form.valid;
      this.formDataService.formObservable.next(this.currentPersonalForm);
    }
    if (form.valid) {
      this.formDataService.setPersonal(this.personal);
    }

  }

  // Save button event Starts
  save(form: any) {
    if (!form.valid) {
      return;
    }

    this.formDataService.setPersonal(this.personal);

  }
  // Save button event Ends

}
