var dialogsModule = require("ui/dialogs");
var observableModule = require("data/observable")
var ObservableArray = require("data/observable-array").ObservableArray;
var frameModule = require("ui/frame");

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
    frameModule.topmost().navigate("detail_pages/user_details/admin/user_details");
};