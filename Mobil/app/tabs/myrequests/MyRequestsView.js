const MyRequestsViewModel = require("./myrequests-view-model");
var observableModule = require("data/observable")
var ObservableArray = require("data/observable-array").ObservableArray;
const topmost = require("ui/frame").topmost;

var requestList = new MyRequestsViewModel([]);


var pageData = new observableModule.fromObject({
    requestList:requestList
});

function onLoaded(args) {
    

    const component = args.object;
    component.bindingContext = pageData;
    

    requestList.empty();
    requestList.load();
}

exports.onDetails=function(args){
    console.log(args.object.device);
    const tappedBorrow = args.view.bindingContext;
	/*topmost().navigate({
		moduleName: "detail_pages/borrow_details/user/borrow_details",
		context: tappedBorrow,
		animated: true,
		transition: {
			name: "slide",
			duration: 200,
			curve: "ease"
		}
	});*/
}

exports.onLoaded = onLoaded;

