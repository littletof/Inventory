var dialogsModule = require("ui/dialogs");
var observableModule = require("data/observable");
var frameModule = require("ui/frame");
var topmost = frameModule.topmost();
var ObservableArray = require("data/observable-array").ObservableArray;
var page;


exports.onNavBtnTap = function(args){
	topmost.goBack();
}

exports.onEditBtnTap = function(){
    //frameModule.topmost().navigate("detail_pages\device_details\admin\edit_device_details\edit_device_details");
}

exports.onDelBtnTap = function(){
}

exports.loaded = function(args) {
    page = args.object;
};