var dialogsModule = require("ui/dialogs");
var observableModule = require("data/observable");
var frameModule = require("ui/frame");
var topmost = frameModule.topmost();
var ObservableArray = require("data/observable-array").ObservableArray;
var page;


exports.onNavBtnTap = function(args){
	topmost.goBack();
}

exports.cancelReservation = function(){
}

exports.loaded = function(args) {
    page = args.object;
};