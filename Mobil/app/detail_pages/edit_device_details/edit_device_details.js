var frameModule = require("ui/frame");
const topmost = require("ui/frame").topmost;
const deviceDetailEditViewModel = require("./edit_device_details-view-model");
const alert = require("ui/dialogs").alert;


exports.onDoneBtnTap = function(){
}

exports.onCancelBtnTap = function(){
	topmost().goBack();
}

exports.onNavigatingTo = function(args) {
    const page = args.object;
	
	page.bindingContext = new deviceDetailEditViewModel(page.navigationContext);
};