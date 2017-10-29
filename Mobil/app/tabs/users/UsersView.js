var dialogsModule = require("ui/dialogs");
var observableModule = require("data/observable")
var ObservableArray = require("data/observable-array").ObservableArray;

var page;

var UsersViewModel = require("./users-view-model");
var users = new UsersViewModel([]);

var pageData = new observableModule.fromObject({
    users: users
});

exports.onLoaded = function(args) {
    page = args.object;
    page.bindingContext = pageData;

    users.empty();
    users.load();
};
exports.onTap = function (args) {
    var index = args.index;
    alert("Navigating to details is under construction :(");
};