// Wizard form data class Starts
export class FormData {
    firstName = '';
    lastName = '';
    genre = '';
    birthdate = '';
    street = '';
    city = '';
    state = '';
    zip = '';
    work = '';
}
// Wizard form data class Ends

// Personal tab data class starts
export class Personal {
    firstName: string;
    lastName: string;
    genre: string;
    birthdate: string;

    constructor(){
        this.firstName = '';
        this.lastName = '';
        this.genre = '';
        this.birthdate = '';
    }
}
// Personal tab data class ends

// Address tab data class starts
export class Address {
    street: string;
    city: string;
    state: string;
    zip: string;

    constructor(){
        this.street = '';
        this.city = '';
        this.state = '';
        this.zip = '';
    }
}
// Address tab data class Ends
