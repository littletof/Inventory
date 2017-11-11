var DevicesViewModel = require("./devices-view-model");
var observableModule = require("data/observable")
var ObservableArray = require("data/observable-array").ObservableArray;
var frameModule = require("ui/frame");
const topmost = frameModule.topmost;
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
    console.log(args.object.device);
    const tappedDevice = args.object.bindingContext;
	topmost().navigate({
		moduleName: "detail_pages/device_details/admin/device_details",
		context: tappedDevice,
		animated: true,
		transition: {
			name: "slide",
			duration: 200,
			curve: "ease"
		}
	});
}

exports.onFLTTap=function(args){
    console.log(args.object.device);
    topmost().navigate({
        moduleName: "detail_pages/new_device/new_device",
        animated: true,
        transition: {
            name: "slideTop",
            duration: 200,
            curve: "ease"
        }
    });
	

}

exports.onFLTTouch=function(args){
    console.log(args.object.device);
	

}

exports.onBorrow=function(args){
    console.log(args.object.device);
    const bindingContext = args.object.bindingContext;
    topmost().navigate({
        moduleName: "detail_pages/new_borrow/new_borrow",
        context: bindingContext,
        animated: true,
        transition: {
            name: "slideTop",
            duration: 200,
            curve: "ease"
        }
    });
    
}



exports.onLoaded = onLoaded;
