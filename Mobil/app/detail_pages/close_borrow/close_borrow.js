const topmost = require("ui/frame").topmost;
const closeBorrowViewModel = require("./close_borrow-view-model");

var page;
var devices;

exports.onCancelBtnTap = function(args){
	topmost().goBack();
}

exports.onDoneBtnTap = function(args){
	closeBorrowViewModel.pushClose(devices.devices);
}

exports.onNavigatingTo = function(args) {
    page = args.object;
	devices = closeBorrowViewModel.getData(page.navigationContext.id);
	page.bindingContext = devices;
};