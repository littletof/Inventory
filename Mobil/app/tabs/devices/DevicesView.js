var DevicesViewModel = require("./devices-view-model");
var observableModule = require("data/observable")
var ObservableArray = require("data/observable-array").ObservableArray;
var frameModule = require("ui/frame");
var firebase = require("nativescript-plugin-firebase");

var deviceList = new DevicesViewModel([]);


var pageData = new observableModule.fromObject({
    deviceList:deviceList
});

function onLoaded(args) {
    

    var component = args.object;
    component.bindingContext = pageData;
    

    deviceList.empty();
    deviceList.load();

        firebase.getCurrentUser().then(
            function (result) {
                console.log("anonymous:"+result.anonymous);

            },
            function (errorMessage) {
              console.log(errorMessage);
            }
          );

}

exports.onDetails=function(args){
    console.log("details: "+args.object.device);
    frameModule.topmost().navigate("detail_pages/device_details/admin/device_details");
}

exports.onBorrow=function(args){
    console.log("borrow: "+args.object.device);    
}



exports.onLoaded = onLoaded;
