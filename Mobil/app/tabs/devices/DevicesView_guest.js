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




exports.onLoaded = onLoaded;
