// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyAgJv5soj29rIkPVKoQYjML0bsiivcC880",
    authDomain: "crewnie-platform.firebaseapp.com",
    databaseURL: "https://crewnie-platform.firebaseio.com",
    projectId: "crewnie-platform",
    storageBucket: "crewnie-platform.appspot.com",
    messagingSenderId: "685926084685"
  }
};
