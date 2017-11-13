require("./bundle-config");

require('globals');
require('nativescript-i18n');

const application = require("application");



var firebase = require("nativescript-plugin-firebase");

application.start({ moduleName: "./authentication/login/LoginView" });

/*
Do not place any code after the application has been started as it will not
be executed on iOS.
*/
