var frameModule = require("ui/frame");
const topmost = require("ui/frame").topmost;
var alert = require("ui/dialogs").alert;
const newDeviceViewModel = require("./new_device-view-model");
var firebase = require("nativescript-plugin-firebase");

var page;
var device;

exports.onDoneBtnTap = function(){
	
	if(device.deviceName != "" && device.description != "" && device.quantity_total != ""){
		if( isNaN(device.quantity_total) ){
			alert({
				title: "Data error",
				message: "Total quantity must be a number!",
				okButtonText: "Understood!"
			});			
		}else{
			newDeviceViewModel.pushData(device);
			topmost().goBack();
		}
	}else{
		alert({
			title: "Data error",
			message: "All data must be provided!",
			okButtonText: "Understood!"
		});
	}
}

exports.onCancelBtnTap = function(){
	topmost().goBack();
}

exports.onNavigatingTo = function(args) {
	page = args.object;

	device = newDeviceViewModel.createEmptyDevice();
	page.bindingContext = device;
};