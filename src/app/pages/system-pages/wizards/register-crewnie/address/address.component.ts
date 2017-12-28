import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';

import { Address } from '../data/formData.model';
import { FormDataService } from '../data/formData.service';
import { WorkflowService } from '../workflow/workflow.service';
import { STEPS } from '../workflow/workflow.model';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { FormControl } from '@angular/forms';


import { AgmCoreModule, MapsAPILoader } from '@agm/core';
import { } from '@types/googlemaps';

@Component({
    selector: 'app-mt-wizard-address',
    templateUrl: './address.component.html',
    styleUrls: ['./address.component.scss']
})

export class AddressComponent implements OnInit {
    title = 'Where do you unwrap?';
    address = new Address;
    form: any;

    public latitude: number;
    public longitude: number;
    public searchControl: FormControl;
    public zoom: number;

    @ViewChild("search")
    public searchElementRef: ElementRef;

    constructor(private router: Router,
        private route: ActivatedRoute, private formDataService: FormDataService,
        private workflowService: WorkflowService,
        private mapsAPILoader: MapsAPILoader,
        private ngZone: NgZone
    ) {
    }

    ngOnInit() {
        // I subscribe to the changes in real time of the Personal global class
        this.formDataService.getAddress().subscribe(address => {
            this.address = address;
        });

        //set google maps defaults
        this.zoom = 6;
        this.latitude = 34.0937458;
        this.longitude = -118.3614976;

        //create search FormControl
        this.searchControl = new FormControl();

        //set current position
        this.setCurrentPosition();

        //load Places Autocomplete
        this.mapsAPILoader.load().then(() => {

            let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
                types: ["address"]
            });
            autocomplete.addListener("place_changed", () => {
                this.ngZone.run(() => {
                    //get the place result
                    let place: google.maps.places.PlaceResult = autocomplete.getPlace();

                    //verify result
                    if (place.geometry === undefined || place.geometry === null) {
                        return;
                    }


                    this.getAdreess(place);

                    //set latitude, longitude and zoom
                    this.latitude = place.geometry.location.lat();
                    this.longitude = place.geometry.location.lng();
                    this.zoom = 18;
                });
            });

        });
    }

    // Save button event Starts
    save(form: any) {
        if (!form.valid) {
            return;
        }

        this.formDataService.setAddress(this.address);

        const firstState = this.workflowService.getFirstInvalidStep(STEPS.profile);
        this.router.navigate(['/wizards/register-crewnie/profile'], { relativeTo: this.route.parent, skipLocationChange: true });
    }
    // Save button event Ends

    // Cancel button event Starts
    cancel() {
        this.router.navigate(['/wizards/register-crewnie/personal'], { skipLocationChange: true });
    }
    // Cancel button event Ends

    private getPlacebyID(id: string) {
        var geocoder = new google.maps.Geocoder;
        geocoder.geocode({ 'placeId': id }, (results, status) => {

            if (status === 'OK' as any) {
                if (results[0]) {
                    console.log(results[0].geometry.location.lat(), results[0].geometry.location.lng());
                } else {
                    console.log('No results found');
                }
            } else {
                console.log('Geocoder failed due to: ' + status);
            }

        });
    }

    private setCurrentPosition() {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.latitude = position.coords.latitude;
                this.longitude = position.coords.longitude;
                this.zoom = 12;
            });
        }
    }

    private getAdreess(place: google.maps.places.PlaceResult) {

        if (place.address_components) {
            let GoogleAddress = [];

            let gPlace = {
                place_id: place.place_id,
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng()
            };

            for (var i = 0; i < place.address_components.length; i++) {
                var addressType = place.address_components[i].types[0];
                var addressValue = place.address_components[i].long_name;
                GoogleAddress[addressType] = addressValue;
            }
            let crewnieAdress = {
                gPlace: gPlace,
                gAdreess: GoogleAddress
            };
            
            if (!!GoogleAddress['locality']) {
                console.log('Si tenemos localidad: '+ GoogleAddress['locality']);
            } else {
                console.log('No tenemos Localidad');
            }
        }
    }

}
