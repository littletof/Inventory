var firebase = require("nativescript-plugin-firebase");
var frameModule = require('ui/frame');
var dialogsModule = require('ui/dialogs');

var page;
exports.loaded = function (args) {
    page = args.object;
    
    firebase.init({
        url: 'https://inventory-01.firebaseio.com/',
        persist: true
    }) 
};

exports.login = function () {
    firebase.login({
        type: firebase.LoginType.PASSWORD,
        passwordOptions: {
          email: page.getViewById("email").text,
          password: page.getViewById("password").text
        }
      }).then(
          function (result) {
            JSON.stringify(result);
            frameModule.topmost().navigate("tabs/tabs-page");
          },
          function (errorMessage) {
            console.log(errorMessage);
          }
      );
}

exports.continueAsAGuest = function () {
    firebase.login({
        type: firebase.LoginType.ANONYMOUS
      }).then(
          function (result) {
            console.log(JSON.stringify(result));
            frameModule.topmost().navigate("tabs/tabs-page");
          },
          function (errorMessage) {
            console.log(errorMessage);
          }
      );
}

exports.signUp = function () {
    frameModule.topmost().navigate("authentication/signup/SignUpView");
}
