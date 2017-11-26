const topmost = require("ui/frame").topmost;
const deviceDetailViewModel = require("./device_details-view-model");

var page;
var device;

exports.onBackButtonTap = function(args){
    topmost().goBack();
}

exports.onBorrowButtonTapped = function(args){
    const bindingContext = page.navigationContext;
    topmost().navigate({
        moduleName: "detail_pages/new_request/new_request",
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


	device = deviceDetailViewModel.getData(page.navigationContext.id);
	page.bindingContext = device;
};