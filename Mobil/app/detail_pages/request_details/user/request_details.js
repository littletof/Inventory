const topmost = require("ui/frame").topmost;
const requestDetailsViewModel = require("./request_details-view-model");

var page;
var request;

exports.onNavBtnTap = function(args){
    topmost().goBack();
}

exports.onDelBtnTap = function(args){
	var dialogs = require("ui/dialogs");
	dialogs.confirm("Biztos törölni akarja ezt az igénylést?").then(function (result) {
		if(result){
			requestDetailsViewModel.deleteData(request.requestID);
			topmost.goBack();
		}
	});
}


exports.onNavigatingTo = function(args) {
    page = args.object;
	
	request = requestDetailsViewModel.getData(page.navigationContext.id);
	page.bindingContext = request;
};