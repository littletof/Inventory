var dialogsModule = require("ui/dialogs");
var observableModule = require("data/observable")
var ObservableArray = require("data/observable-array").ObservableArray;
var frameModule = require("ui/frame");
const topmost = frameModule.topmost;

var page;

var RequestsViewModel = require("./request-view-model");
var requests = new RequestsViewModel([]);

var pageData = new observableModule.fromObject({
    requests:requests
});

exports.onLoaded = function(args) {
    page = args.object;
    page.bindingContext = pageData;

    requests.empty();
    requests.load();
};

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