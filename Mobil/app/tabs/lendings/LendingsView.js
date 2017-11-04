var dialogsModule = require("ui/dialogs");
var observableModule = require("data/observable")
var ObservableArray = require("data/observable-array").ObservableArray;
var frameModule = require("ui/frame");

var page;

var LendingsViewModel = require("./lendings-view-model");
var lendings = new LendingsViewModel([]);

var pageData = new observableModule.fromObject({
    lendings: lendings
});

exports.onLoaded = function onLoaded(args) {
    page = args.object;
    page.bindingContext = pageData;

    lendings.empty();
    lendings.load();
}

exports.onTap = function (args) {
    var index = args.index;
    frameModule.topmost().navigate("detail_pages/borrow_details/admin/borrow_details");
};
