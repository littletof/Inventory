const MyLendingsViewModel = require("./mylendings-view-model");
var observableModule = require("data/observable")
var ObservableArray = require("data/observable-array").ObservableArray;
const topmost = require("ui/frame").topmost;

var lendingList;

var page;

var pageData = new observableModule.fromObject({
    lendingList:lendingList
});

exports.onSearch = function(args){
	lendingList.empty();
    lendingList.load(page.getViewById("searchTV").text);
}

function onLoaded(args) {
    page = args.object;
    page.bindingContext = pageData;
	lendingList = new MyLendingsViewModel([]);
	pageData.lendingList=lendingList;

	lendingList.empty();
    lendingList.load(page.getViewById("searchTV").text);
}

exports.onDetails=function(args){
    console.log(args.object.device);
    const tappedBorrow = args.view.bindingContext;
	topmost().navigate({
		moduleName: "detail_pages/borrow_details/user/borrow_details",
		context: tappedBorrow,
		animated: true,
		transition: {
			name: "slide",
			duration: 200,
			curve: "ease"
		}
	});
}

exports.onImageLoaded=function(args){
    //console.log(args.object.device+". kép betöltve");    

}

exports.onLoaded = onLoaded;

