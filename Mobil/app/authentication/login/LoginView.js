var frameModule = require('ui/frame');
var dialogsModule = require('ui/dialogs');
var UserViewModel = require("../../shared/user-view-model");
var firebase = require("nativescript-plugin-firebase");


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
            //-----------------------------------------------------------------------
            var currentUserId;
            
                    firebase.getCurrentUser().then(
                        function (result) {
                          currentUserId=result.uid;
                        },
                        function (errorMessage) {
                          console.log(errorMessage);
                        }
                      );
            
                    var getRole = function(user) {
                        for(let uid in user.value){
                            if(uid == currentUserId){
                                
                                if(user.value[currentUserId].role=="user"){
                                    frameModule.topmost().navigate("tabs/tabs-page-user");                                    
                                } else if(user.value[currentUserId].role=="admin"){
                                    frameModule.topmost().navigate("tabs/tabs-page");                                    
                                }
                       
                            }
                        }
                    }
            
                    firebase.query(
                        getRole,
                        "/users",
                        {
                            singleEvent: true,
                            orderBy: {
                                type: firebase.QueryOrderByType.CHILD,
                                value: 'name'
                            }
                    });
            //------------------------------------------------------------------------
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
            frameModule.topmost().navigate("tabs/tabs-page-guest");
        }).catch(function(error) {
            dialogsModule.alert({
                message: error,
                okButtonText: "OK"
            });
        });
}
