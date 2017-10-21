var config = require("../shared/config");
var observableModule = require("data/observable");
var firebase = require("nativescript-plugin-firebase");


function User(info) {
    info = info || {};

    var viewModel = new observableModule.fromObject({
        email: info.email || "",
        password: info.password || ""
    });

    viewModel.init = function(){
        firebase.init({
            url: config.apiUrl,
            persist: true
        }).then(
          function (instance) {
            console.log("firebase.init done");
          },
          function (error) {
            console.log("firebase.init error: " + error);
          }
        );
      };

    viewModel.login = function() {
        return firebase.login({
            type: firebase.LoginType.PASSWORD,
            passwordOptions: {
                email: viewModel.get("email"),
                password: viewModel.get("password")
            }
            }).then(
            function (response) {
                console.log(response);
                return response;
            }
        );
    };

    viewModel.continueAsAGuest = function () {
        return firebase.login({
            type: firebase.LoginType.ANONYMOUS
          }).then(
              function (response) {
                console.log(response);
                return response;
              }
          );
    }

    viewModel.register = function() {
        return firebase.createUser({
            email: viewModel.get("email"),
            password: viewModel.get("password")
          }).then(
              function (response) {
                  console.log(response);
                  return response;
              }
          );
    };
    
    return viewModel;
}

module.exports = User;