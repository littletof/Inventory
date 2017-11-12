const topmost = require("ui/frame").topmost;
const borrowDetailsViewModel = require("./borrow_details-view-model");

var page;
var borrow;

exports.onNavBtnTap = function(args){
    topmost().goBack();
}


exports.onNavigatingTo = function(args) {
    page = args.object;
	
	borrow = borrowDetailsViewModel.getData(page.navigationContext.id);
	page.bindingContext = borrow;
};