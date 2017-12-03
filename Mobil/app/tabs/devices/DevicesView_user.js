var DevicesViewModel = require("./devices-view-model");
var observableModule = require("data/observable")
var ObservableArray = require("data/observable-array").ObservableArray;
var frameModule = require("ui/frame");
const topmost = frameModule.topmost;
var firebase = require("nativescript-plugin-firebase");
var BarcodeScanner = require("nativescript-barcodescanner").BarcodeScanner;

var deviceList = new DevicesViewModel([]);

var component;
var barcodeScanner = new BarcodeScanner();
var scannedDevice = new observableModule.fromObject({
	'id': ""
});


var pageData = new observableModule.fromObject({
    deviceList:deviceList
});

exports.onSearch = function(args){
	deviceList.empty();
    deviceList.load(component.getViewById("searchTV").text);
}



function onLoaded(args) {
    component = args.object;
    component.bindingContext = pageData;
	component.getViewById("searchTV").text = "";
    deviceList.empty();
    deviceList.load("");
}

exports.onDetails=function(args){
    console.log(args.object.device);
    const tappedDevice = args.object.bindingContext;
	topmost().navigate({
		moduleName: "detail_pages/device_details/user/device_details",
		context: tappedDevice,
		animated: true,
		transition: {
			name: "slide",
			duration: 200,
			curve: "ease"
		}
	});
}


function afterScan(){
    topmost().navigate({
        moduleName: "detail_pages/device_details/user/device_details",
        context: scannedDevice,
        animated: true,
        transition: {
            name: "slideTop",
            duration: 200,
            curve: "ease"
        }
    });
}

exports.onFLTTap=function(args){
    barcodeScanner.scan({
        formats: "QR_CODE, EAN_13",
        showFlipCameraButton: true,   
        preferFrontCamera: false,     
        showTorchButton: true,        
        beepOnScan: true,             
        torchOn: false,               
        resultDisplayDuration: 500,
        openSettingsIfPermissionWasPreviouslyDenied: true //ios only 
    }).then((result) => {
		scannedDevice.set("id", result.text);
		afterScan();
        }, (errorMessage) => {
            console.log("Error when scanning " + errorMessage);
        }
    );

}


exports.onRequest=function(args){
    console.log(args.object.device);
    const bindingContext = args.object.bindingContext;
    topmost().navigate({
        moduleName: "detail_pages/new_request/new_request",
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
