var frameModule = require("ui/frame");
const topmost = require("ui/frame").topmost;
var alert = require("ui/dialogs").alert;
const deviceDetailEditViewModel = require("./edit_device_details-view-model");
var firebase = require("nativescript-plugin-firebase");

var page;
var device;

exports.onDoneBtnTap = function(){
	
	if(device.deviceName != "" && device.description != "" && device.quantity_total != "" && device.quantity_available != ""){
		if( isNaN(device.quantity_total) || isNaN(device.quantity_available) ){
			alert({
				title: "Data error",
				message: "Quantities must be a numbers!",
				okButtonText: "Understood!"
			});			
		}else if(device.quantity_total<device.quantity_available){
			alert({
				title: "Data error",
				message: "Total quantity cannot be less than available quantity!",
				okButtonText: "Understood!"
			});
		}else{
			deviceDetailEditViewModel.updateData(device);
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

	device = deviceDetailEditViewModel.getData(page.navigationContext.deviceID);
	page.bindingContext = device;
};