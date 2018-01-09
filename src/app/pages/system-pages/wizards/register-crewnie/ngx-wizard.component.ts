import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormDataService } from './data/formData.service';

@Component({
    selector: 'app-multi-step-wizard',
    templateUrl: './ngx-wizard.component.html',
    styleUrls: ['./ngx-wizard.component.scss']
})

export class NGXFormWizardComponent implements OnInit {
    constructor(private formDataService: FormDataService,
        private router: Router,
        private route: ActivatedRoute) {
    }

    message:string;

    ngOnInit() {

        this.formDataService.currentMessage.subscribe(message => this.message = message);
        
        this.router.navigate(['/wizards/register-crewnie/personal'], { skipLocationChange: true });

        $("#btnNext").click(function(){
            $('#btnWizardNext').trigger('click');
        });
    }

}
