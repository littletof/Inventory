var alert = require("ui/dialogs").alert;
const topmost = require("ui/frame").topmost;
const newBorrowViewModel = require("./new_borrow-view-model");

var page;
var pageData;

exports.onBackButtonTap = function(args){
    topmost().goBack();
}

exports.borrowButtonTapped = function(args){
	if(pageData.quantity_available == 0){
        alert({
			title: "Not available",
			message: "Unfortunately there are no available devices to borrow!",
			okButtonText: "Ok"
        });
		topmost.goBack();
	}else if(pageData.quantity_borrowed == 0){
        alert({
			title: "Zero devices",
			message: "You can't borrow 0 devices, silly!",
			okButtonText: "I understand!"
        });
	}else{
		newBorrowViewModel.addNewBorrow(pageData);
		topmost().goBack();
	}
}

exports.onNavigatingTo = function(args) {
	page = args.object;


	pageData = newBorrowViewModel.getData(page.navigationContext.id);
	page.bindingContext = pageData;
};