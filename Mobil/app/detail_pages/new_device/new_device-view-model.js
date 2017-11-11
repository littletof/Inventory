const observableModule = require("data/observable");
var firebase = require("nativescript-plugin-firebase");
var alert = require("ui/dialogs").alert;

var device = new observableModule.fromObject({
	'deviceName': "",
	'description': "",
	'quantity_total': "",
	'tags': ""
});

exports.createEmptyDevice = function(){
	device.set("deviceName", "");
	device.set("description", "");
	device.set("quantity_total", "");
	return device;
}

exports.pushData = function(newDevice){
	firebase.push( '/devices', {
		'description': newDevice.description,
		'name': newDevice.deviceName,
		'quantity_available': newDevice.quantity_total,
		'quantity_total': newDevice.quantity_total,
		'tags': newDevice.tags
	});
}