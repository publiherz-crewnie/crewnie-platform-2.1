import { Injectable } from '@angular/core';

import { FormData, Personal, Address } from './formData.model';
import { WorkflowService } from '../workflow/workflow.service';
import { STEPS } from '../workflow/workflow.model';

import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

// data base Service
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class FormDataService {

    private formData = new FormData();
    private isPersonalFormValid = false;
    private isWorkFormValid = false;
    private isAddressFormValid = false;

    private colRef = this.afs.collection('crewnies');
    private docRef: AngularFirestoreDocument<FormData>;

    constructor(
      private workflowService: WorkflowService,
      private afAuth: AngularFireAuth,
      public afs: AngularFirestore,
    ) {
        // Subscription to obtain the changes in real time
        this.getCrewnieObservable().subscribe( val => {
            if ( !!val ) this.formData = val 
        });

    }

    // Get a database Crewnie Observable
    getCrewnieObservable(): Observable<FormData> {

        let userFirebase = this.afAuth.authState;

        return userFirebase.flatMap( crewnieUser => {
            this.docRef = this.colRef.doc( crewnieUser.uid );
            let crewnie = this.docRef.valueChanges();
            return crewnie;
        });

    }

    // Get Personal Observable
    getPersonal(): Observable<Personal> {
        return this.getCrewnieObservable().flatMap(
            formdata => {
                const personal = {
                    firstName: formdata.firstName,
                    lastName: formdata.lastName,
                    genre: formdata.genre,
                    birthdate: formdata.birthdate
                }  
                return Observable.of(personal);
            }
        );
    }

    // Set Personal in the formData Class and database
    setPersonal(data: Personal) {
        // Update the Personal data only when the Personal Form had been validated successfully
        this.isPersonalFormValid = true;
        this.formData.firstName = data.firstName;
        this.formData.lastName = data.lastName;
        this.formData.genre = data.genre;
        this.formData.birthdate = data.birthdate;

        // Validate Personal Step in Workflow
        this.workflowService.validateStep(STEPS.personal);

        // Update data in Database
        this.saveInDatabase(data);
    }

    // Get Address Tab Data
    getAddress(): Observable<Address> {
        return this.getCrewnieObservable().flatMap(
            formdata => {
                const address = {
                    street: this.formData.street,
                    city: this.formData.city,
                    state: this.formData.state,
                    zip: this.formData.zip
                }; 
                return Observable.of(address);
            }
        );
    }

    // Set Address in the formData Class and database
    setAddress(data: Address) {
        // Update the Address data only when the Address Form had been validated successfully
        this.isAddressFormValid = true;
        this.formData.street = data.street;
        this.formData.city = data.city;
        this.formData.state = data.state;
        this.formData.zip = data.zip;
        // Validate Address Step in Workflow
        this.workflowService.validateStep(STEPS.address);

        // Update data in Database
        this.saveInDatabase(data);

    }

    // Get Work Tab Data
    getWork(): string {
        // Return the work type
        return this.formData.work;
    }

    // Set Work Tab Data
    setWork(data: string) {
        // Update the work type only when the Work Form had been validated successfully
        this.isWorkFormValid = true;
        this.formData.work = data;
        // Validate Work Step in Workflow
        this.workflowService.validateStep(STEPS.work);
    }

    getFormData(): FormData {
        // Return the entire Form Data
        return this.formData;
    }

    isFormValid() {
        // Return true if all forms had been validated successfully; otherwise, return false
        return this.isPersonalFormValid &&
            this.isWorkFormValid &&
            this.isAddressFormValid;
    }

    saveInDatabase(data: any){
        this.docRef.set( data, {merge: true} ).then( () => {
          console.log('Datos Actualizados en base de datos');
        })
        .catch(e => {
          console.log(e.message);
        });
    }
}
