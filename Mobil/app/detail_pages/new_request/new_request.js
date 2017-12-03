var alert = require("ui/dialogs").alert;
const topmost = require("ui/frame").topmost;
const newRequestViewModel = require("./new_request-view-model");

var page;
var pageData;

exports.onBackButtonTap = function(args){
    topmost().goBack();
}

exports.requestButtonTapped = function(args){
	if(pageData.quantity_available == 0){
        alert({
			title: "Not available",
			message: "Unfortunately there are no available devices to request!",
			okButtonText: "Ok"
        });
		topmost.goBack();
	}else if(pageData.quantity_requested == 0){
        alert({
			title: "Zero devices",
			message: "You can't borrow 0 devices, silly!",
			okButtonText: "I understand!"
        });
	}else{
		newRequestViewModel.addNewRequest(pageData);
		//topmost().navigate({moduleName: "tabs/tabs-page-user", clearHistory:true});    
		topmost().goBack();
	}
}

exports.onNavigatingTo = function(args) {
	page = args.object;


	pageData = newRequestViewModel.getData(page.navigationContext.id);
	page.bindingContext = pageData;
};