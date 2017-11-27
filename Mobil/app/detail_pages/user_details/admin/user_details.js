var frameModule = require("ui/frame");
var topmost = frameModule.topmost();
const userDetailViewModel = require("./user_details-view-model");


var page;
var user;

exports.onNavBtnTap = function(args){
	topmost.goBack();
}

exports.onDelBtnTap = function(args){
	var dialogs = require("ui/dialogs");
	dialogs.confirm("Biztos törölni akarja ezt a user-t?").then(function (result) {
		if(result){
			userDetailViewModel.deleteData(user.userID);
			topmost.goBack();
		}
	});
}

exports.showBorrows = function(){
}

exports.onNavigatingTo = function(args) {
	page = args.object;

	
	user = userDetailViewModel.getData(page.navigationContext.id);
	
    page.bindingContext = user;
};