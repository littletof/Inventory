var firebase = require("nativescript-plugin-firebase");
var frameModule = require('ui/frame');
var dialogsModule = require('ui/dialogs');

var page;
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
                  title: "User created",
                  message: "userid: " + result.key,
                  okButtonText: "Nice!"
                })
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
}