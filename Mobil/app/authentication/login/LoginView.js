var frameModule = require('ui/frame');
var dialogsModule = require('ui/dialogs');
var UserViewModel = require("../../shared/user-view-model");

var user = new UserViewModel();


var page;
exports.loaded = function (args) {
    page = args.object;
    page.bindingContext = user;
    user.init();
};

exports.login = function () {
    user.login()
        .then(function() {
            frameModule.topmost().navigate("tabs/tabs-page");
        }).catch(function(error) {
            dialogsModule.alert({
                message: error+"baj van",
                okButtonText: "OK"
            });
        });
}

exports.signUp = function () {
    frameModule.topmost().navigate("authentication/signup/SignUpView");
}

exports.continueAsAGuest = function () {
    user.continueAsAGuest()
        .then(function() {
            frameModule.topmost().navigate("tabs/tabs-page");
        }).catch(function(error) {
            dialogsModule.alert({
                message: error,
                okButtonText: "OK"
            });
        });
}
