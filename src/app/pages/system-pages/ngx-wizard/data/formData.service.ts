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
    private itemDoc: AngularFirestoreDocument<FormData>;
    private docRef: AngularFirestoreDocument<any>;
    public crewnie: Observable<FormData>;
    public userFirebase: Observable<firebase.User>;

    private personal = {
      firstName: this.formData.firstName,
      lastName: this.formData.lastName,
      genre: this.formData.genre,
      birthdate: this.formData.birthdate
    };

    private address = {
        street: this.formData.street,
        city: this.formData.city,
        state: this.formData.state,
        zip: this.formData.zip
    };


    // Reactive Proof

    private ReaXItemDoc: AngularFirestoreDocument<FormData>;
    private ReaXDocRef: AngularFirestoreDocument<any>;
    public ReaXCrewnie: Observable<FormData>;
    public ReaXUserFirebase: Observable<firebase.User>;

    constructor(
      private workflowService: WorkflowService,
      private afAuth: AngularFireAuth,
      public afs: AngularFirestore,
    ) {
        
        // this.userFirebase = this.afAuth.authState;
        // this.userFirebase.subscribe( firebaseUser => {
        
        //     this.docRef = this.colRef.doc(this.afAuth.auth.currentUser.uid);
        //     this.itemDoc = this.afs.doc<FormData>('crewnies/' + firebaseUser.uid);
        //     this.crewnie = this.itemDoc.valueChanges();

        //     this.crewnie.subscribe( val => {
        //         if ( !!val ) this.formData = val 
        //     });
    
        // });

        this.getReactivePersonal().subscribe( val => {
            if ( !!val ) this.formData = val 
        });


    }

    // Get Personal Tab Data
    getPersonal(): any {
      return this.personal;
    }

    // Get Personal Tab Data
    getReactivePersonal(): Observable<FormData> {

        this.ReaXUserFirebase = this.afAuth.authState;

        return this.ReaXUserFirebase.flatMap( firebaseUser => {
            
                this.ReaXDocRef = this.colRef.doc(this.afAuth.auth.currentUser.uid);
                this.ReaXItemDoc = this.afs.doc<FormData>('crewnies/' + firebaseUser.uid);
                this.ReaXCrewnie = this.ReaXItemDoc.valueChanges();
    
                return this.ReaXCrewnie;
        });

    }

    getMultilevelPersonal(): Observable<Personal>{
        return this.getReactivePersonal().flatMap(
            formdata => {
                const personal: Personal = {
                    firstName: formdata.firstName,
                    lastName: formdata.lastName,
                    genre: formdata.genre,
                    birthdate: formdata.birthdate
                }  
                return Observable.of(personal);
            });
    }

    // Set Personal Tab Data
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

    // Get Address Tab Data
    getAddress(): Address {
        // Return the Address data
        return this.address;
    }

    // Set Address Tab Data
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
        const docRef = this.colRef.doc(this.afAuth.auth.currentUser.uid);
        docRef.set( data, {merge: true} ).then( () => {
          console.log('Datos Actualizados en base de datos');
        })
        .catch(e => {
          console.log(e.message);
        });
    }
}
