var dialogsModule = require("ui/dialogs");
var observableModule = require("data/observable")
var ObservableArray = require("data/observable-array").ObservableArray;

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
    alert("Navigating to details is under construction :(");
};
