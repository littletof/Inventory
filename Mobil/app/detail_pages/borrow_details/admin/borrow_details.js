const topmost = require("ui/frame").topmost;
const borrowDetailsViewModel = require("./borrow_details-view-model");

var page;
var borrow;

exports.onNavBtnTap = function(args){
    topmost().goBack();
}

exports.closeBorrow = function(){
    const bindingContext = page.navigationContext;
    topmost().navigate({
        moduleName: "detail_pages/close_borrow/close_borrow",
        context: bindingContext,
        animated: true,
        transition: {
            name: "slideTop",
            duration: 200,
            curve: "ease"
        }
    });
}

exports.onNavigatingTo = function(args) {
    page = args.object;
	
	borrow = borrowDetailsViewModel.getData(page.navigationContext.id);
	page.bindingContext = borrow;
};