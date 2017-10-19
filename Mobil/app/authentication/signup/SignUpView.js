var firebase = require("nativescript-plugin-firebase");
var frameModule = require('ui/frame');
var dialogsModule = require('ui/dialogs');

var page;
var defaultRole = '01';
exports.loaded = function (args) {
    page = args.object;
};

exports.register = function () {
    var email = page.getViewById("email").text;
    var password = page.getViewById("password").text;
    var retypedpassword = page.getViewById("retypedPassword").text;

    if (password == retypedpassword) {
        firebase.createUser({
            email: email,
            password: password
          }).then(
              function (result) {
                dialogsModule.alert({
                  title: "Success!",
                  message: "Now you are ready to go!",
                  okButtonText: "Nice!"
                })
                
                firebase.push(
                    '/users',
                    {
                      'id': result.key,
                      'email_address': email,
                      'role': defaultRole,
                      'name': ""
                    }
                ).then(
                    function (result) {
                      console.log("created key: " + result.key);
                    }
                );

                frameModule.topmost().navigate("tabs/tabs-page");
              },
              function (errorMessage) {
                dialogsModule.alert({
                  title: "No user created",
                  message: errorMessage,
                  okButtonText: "OK, got it"
                })
              }
          );
    }
    else {
        dialogsModule.alert({
            title: "Passwords are not the same",
            message: "The password do not match!",
            okButtonText: "Ok, got it"
        });
    }
}