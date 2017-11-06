var dialogsModule = require("ui/dialogs");
var observableModule = require("data/observable");
var frameModule = require("ui/frame");
var topmost = frameModule.topmost();
var ObservableArray = require("data/observable-array").ObservableArray;
var page;

var sliderValue1;

exports.onNavBtnTap = function(args){
	topmost.goBack();
}

exports.borrowButtonTapped = function(){
	var dialogs = require("ui/dialogs");
	dialogs.alert("alert").then(function() {
	});
}

exports.sliderValueChange = function(newValue){
	sliderValue1 = newValue;
}

exports.loaded = function(args) {
    page = args.object;
};