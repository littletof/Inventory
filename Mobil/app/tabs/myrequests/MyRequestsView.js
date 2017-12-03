const MyRequestsViewModel = require("./myrequests-view-model");
var observableModule = require("data/observable")
var ObservableArray = require("data/observable-array").ObservableArray;
const topmost = require("ui/frame").topmost;

var requestList;
var page;

var pageData = new observableModule.fromObject({
    requestList:requestList
});

exports.onSearch = function(args){
	requestList.empty();
    requestList.load(page.getViewById("searchTV").text);
}

exports.onLoaded = function onLoaded(args) {
    page = args.object;
    page.bindingContext = pageData;
	requestList= new MyRequestsViewModel([]);
	pageData.requestList=requestList;
    requestList.empty();
    requestList.load(page.getViewById("searchTV").text);
}

exports.onDetails=function(args){
    console.log(args.object.device);
    const tappedBorrow = args.view.bindingContext;
	topmost().navigate({
		moduleName: "detail_pages/request_details/user/request_details",
		context: tappedBorrow,
		animated: true,
		transition: {
			name: "slide",
			duration: 200,
			curve: "ease"
		}
	});
}


