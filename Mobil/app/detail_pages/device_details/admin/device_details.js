const topmost = require("ui/frame").topmost;
const deviceDetailViewModel = require("./device_details-view-model");

var page;

exports.onBackButtonTap = function(args){
    topmost().goBack();
}

exports.onEditBtnTap = function(args){
    const bindingContext = args.object.bindingContext;

    topmost().navigate({
        moduleName: "detail_pages/edit_device_details/edit_device_details",
        context: bindingContext.device,
        animated: true,
        transition: {
            name: "slideTop",
            duration: 200,
            curve: "ease"
        }
    });
}




exports.onDelBtnTap = function(){
	
}

exports.onBorrowButtonTapped = function(args){
    const bindingContext = page.navigationContext;
    topmost().navigate({
        moduleName: "detail_pages/new_borrow/new_borrow",
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

    page.bindingContext = new deviceDetailViewModel(page.navigationContext);
};