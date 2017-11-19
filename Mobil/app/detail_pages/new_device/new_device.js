var frameModule = require("ui/frame");
const topmost = require("ui/frame").topmost;
var alert = require("ui/dialogs").alert;
const newDeviceViewModel = require("./new_device-view-model");
var firebase = require("nativescript-plugin-firebase");
var imagepicker = require("nativescript-imagepicker");
var context = imagepicker.create({ mode: "single" });
var fs = require("file-system");

var page;
var device;

var imgPath="";
var imgName="";

exports.onDoneBtnTap = function(){
	
	if(device.deviceName != "" && device.description != "" && device.quantity_total != ""){
		if( isNaN(device.quantity_total) ){
			alert({
				title: "Data error",
				message: "Total quantity must be a number!",
				okButtonText: "Understood!"
			});			
		}else{
			if(imgPath===""){
				imgName="placeholder";
			} else {
				imgName=new Date().getTime();
				firebase.uploadFile({
					bucket: 'gs://inventory-01.appspot.com/',
					remoteFullPath: 'images/'+imgName+'.png',
					localFile: fs.File.fromPath(imgPath)
			  	}).then(
				  	function (uploadedFile) {
						console.log("File uploaded: " + JSON.stringify(uploadedFile));
				  	},
				  	function (error) {
						console.log("File upload error: " + error);
				  	}
			  	);
			}
			device.set("image",imgName);
			
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

exports.onPickImage = function(){
	context
    .authorize()
    .then(function() {
        return context.present();
    })
    .then(function(selection) {
        selection.forEach(function(selected) {
			selected.getImage().then(function(src){
				console.log("selected image uri:"+selected.fileUri);
				imgPath= selected.fileUri;
				device.set("image",src);
				
			})
			
        });
        //list.items = selection;
    }).catch(function (e) {
        // process error
    });
}