const topmost = require("ui/frame").topmost;
const deviceDetailViewModel = require("./device_details-view-model");

var page;
var device;

exports.onBackButtonTap = function(args){
    topmost().goBack();
}

exports.onNavigatingTo = function(args) {
	page = args.object;


	device = deviceDetailViewModel.getData(page.navigationContext.id);
	page.bindingContext = device;
};