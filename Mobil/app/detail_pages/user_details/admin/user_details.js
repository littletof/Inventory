var frameModule = require("ui/frame");
var topmost = frameModule.topmost();
const userDetailViewModel = require("./user_details-view-model");
var page;


exports.onNavBtnTap = function(args){
	topmost.goBack();
}

exports.onDelBtnTap = function(args){
}

exports.showBorrows = function(){
}

exports.onNavigatingTo = function(args) {
	const page = args.object;

    page.bindingContext = new userDetailViewModel(page.navigationContext);
};