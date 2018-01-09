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

  title = 'Personal information';
  isButtonDisabled = false;

  personal = new Personal;
  form: any;

  

  public crewnie: Observable<Personal>;

  constructor(
    private router: Router, private route: ActivatedRoute,
    private formDataService: FormDataService,
    private workflowService: WorkflowService
  ) {    }

  message:string;

  newMessage(){
    this.formDataService.changeMessage("disabled");
  }

  ngOnInit() {

    //Mensaje
    this.formDataService.currentMessage.subscribe(message => this.message = message);
    this.newMessage();
    

    // I subscribe to the changes in real time of the Personal global class
    this.formDataService.getPersonal().subscribe( personal => {
       this.personal = personal;
    });

    //feather.replace()
    
  }

  // Save button event Starts
  save(form: any) {
      if (!form.valid) {
          return;
      }
      
      this.formDataService.setPersonal(this.personal);
      this.router.navigateByUrl('/wizards/register-crewnie/address', { relativeTo: this.route.parent, skipLocationChange: true });
  }
  // Save button event Ends
}
