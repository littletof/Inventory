const MyLendingsViewModel = require("./mylendings-view-model");
var observableModule = require("data/observable")
var ObservableArray = require("data/observable-array").ObservableArray;
const topmost = require("ui/frame").topmost;

var lendingList = new MyLendingsViewModel([]);


var pageData = new observableModule.fromObject({
    lendingList:lendingList
});

function onLoaded(args) {
    

    const component = args.object;
    component.bindingContext = pageData;
    

    lendingList.empty();
    lendingList.load();
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

