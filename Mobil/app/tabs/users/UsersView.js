var dialogsModule = require("ui/dialogs");
var observableModule = require("data/observable")
var ObservableArray = require("data/observable-array").ObservableArray;
var frameModule = require("ui/frame");
const topmost = frameModule.topmost;

var page;

var UsersViewModel = require("./users-view-model");
var users;

var pageData = new observableModule.fromObject({
    users: users
});

exports.onSearch = function(args){
	users.empty();
    users.load(page.getViewById("searchTV").text);
}

exports.onLoaded = function(args) {
    page = args.object;
    page.bindingContext = pageData;
	users = new UsersViewModel([]);
	pageData.users=users;
    users.empty();
    users.load(page.getViewById("searchTV").text);
};

exports.onTap = function (args) {
    var index = args.index;
    const tappedUser = args.view.bindingContext;
	topmost().navigate({
		moduleName: "detail_pages/user_details/admin/user_details",
		context: tappedUser,
		animated: true,
		transition: {
			name: "slide",
			duration: 200,
			curve: "ease"
		}
	});
};