var dialogsModule = require("ui/dialogs");
var observableModule = require("data/observable")
var ObservableArray = require("data/observable-array").ObservableArray;
var frameModule = require("ui/frame");
const topmost = frameModule.topmost;

var page;

var RequestsViewModel = require("./request-view-model");
var requests;

var pageData = new observableModule.fromObject({
    requests:requests
});

exports.onSearch = function(args){
	requests.empty();
    requests.load(page.getViewById("searchTV").text);
}

exports.onLoaded = function onLoaded(args) {
    page = args.object;
    page.bindingContext = pageData;
	requests = new RequestsViewModel([]);
	pageData.requests=requests;
    requests.empty();
    requests.load(page.getViewById("searchTV").text);
}

exports.onTap = function (args) {
    var index = args.index;
    const tappedRequest = args.view.bindingContext;
	topmost().navigate({
		moduleName: "detail_pages/request_handling/RequestHandleView",
		context: tappedRequest,
		animated: true,
		transition: {
			name: "slide",
			duration: 200,
			curve: "ease"
		}
	});
};