var firebase = require("nativescript-plugin-firebase");
var frameModule = require('ui/frame');
var dialogsModule = require('ui/dialogs');
var UserViewModel = require("../../shared/user-view-model");

var user = new UserViewModel();
var page;

exports.loaded = function (args) {
    page = args.object;
    page.bindingContext = user;
};

exports.register = function () {
    var retypedpassword = page.getViewById("retypedPassword").text;
    
    if (user.get("password") == retypedpassword) {
        user.register()
            .then(function() {
                dialogsModule
                    .alert("Your account was successfully created.")
                    .then(function() {
                        frameModule.topmost().navigate("tabs/tabs-page-user");
                    });
            }).catch(function(error) {
                dialogsModule.alert({
                    message: error,
                    okButtonText: "OK"
                });
            });
    }
    else {
        dialogsModule
            .alert("The passwords do not match!");
    }
}