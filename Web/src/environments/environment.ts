// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyAYziTc9GeD0Ttk1jp8f6mfMRhtGPIjAbA',
    authDomain: 'inventory-01.firebaseapp.com',
    databaseURL: 'https://inventory-01.firebaseio.com',
    projectId: 'inventory-01',
    storageBucket: 'inventory-01.appspot.com',
    messagingSenderId: '947180175215'
  }
};
