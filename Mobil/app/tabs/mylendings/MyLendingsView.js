const MyLendingsViewModel = require("./mylendings-view-model");
var observableModule = require("data/observable")
var ObservableArray = require("data/observable-array").ObservableArray;
var frameModule = require("ui/frame");

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
    frameModule.topmost().navigate("detail_pages/borrow_details/admin/borrow_details");
}

exports.onImageLoaded=function(args){
    //console.log(args.object.device+". kép betöltve");    

}

exports.onLoaded = onLoaded;

