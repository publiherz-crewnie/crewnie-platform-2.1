import { Injectable } from '@angular/core';

import { FormData, Personal, Address, CrewnieAddress, CurrentForm } from './formData.model';
import { WorkflowService } from '../workflow/workflow.service';
import { STEPS } from '../workflow/workflow.model';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/Rx';

// Data base Service
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AuthService } from '../../../../../core/auth/auth.service';
import * as firebase from 'firebase/app';

@Injectable()
export class FormDataService {

    private formData = new FormData();
    private isPersonalFormValid = false;
    private isAddressFormValid = false;
    private isWorkFormValid = false;

    private personal = new Personal;

    public formObservable: Subject<CurrentForm>;

    private colRef = this.afs.collection('crewnies');
    private docRef: AngularFirestoreDocument<FormData>;

    constructor(
        private workflowService: WorkflowService,
        private acAuth: AuthService,
        public afs: AngularFirestore,
    ) {
        // Subscription to obtain the changes in real time
        this.getCrewnieObservable().subscribe(val => {
            if (!!val) { this.formData = val }
        });
    }

    // Get a database Crewnie Observable
    getCrewnieObservable(): Observable<FormData> {
        const userFirebase = this.acAuth.getUserObservable();

        return userFirebase.flatMap(crewnieUser => {
            this.docRef = this.colRef.doc(crewnieUser.uid);
            const crewnie = this.docRef.valueChanges();
            return crewnie;
        });
    }

    // Get Personal Observable
    getPersonal(): Observable<Personal> {
        return this.getCrewnieObservable().flatMap(
            formdata => {
                if (!!formdata) {
                    this.personal = {
                        firstName: formdata.firstName,
                        lastName: formdata.lastName,
                        genre: formdata.genre,
                        birthdate: formdata.birthdate
                    }
                }
                return Observable.of(this.personal);
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
    setAddress(data: CrewnieAddress) {
        // Update the Address data only when the Address Form had been validated successfully
        this.isAddressFormValid = true;

        this.formData.gPlace = data.gPlace;
        this.formData.gAdreess = data.gAdreess;

        // Validate Address Step in Workflow
        this.workflowService.validateStep(STEPS.address);

        const crewnieDatabaseAdreess = {
            adreess: {
                gPlace: data.gPlace,
                gAdreess: Object.setPrototypeOf(data.gAdreess, Object.prototype)
            }
        };

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
        this.workflowService.validateStep(STEPS.profile);
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

    saveInDatabase() {
        const preparedData = Object.assign({}, this.formData);

        this.docRef.set(preparedData, { merge: true }).then(() => {
            console.log('Data updated in database');
        })
            .catch(e => {
                this.acAuth.toastr.error(e.message, 'Something went wrong:');
            });
    }
}
