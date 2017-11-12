var firebase = require("nativescript-plugin-firebase");
var ObservableArray = require("data/observable-array").ObservableArray;
const imageSource = require("image-source");



function DevicesViewModel(items) {
    var viewModel= new ObservableArray(items);

    viewModel.load = function() {
        var onChildEvent = function(result) {
            var matches = [];
            var device=result.value;
            var imgUrl;
            if (result.type === "ChildAdded") {
                    viewModel.push({
                        description:device.description,
                        id:result.key,
                        name:device.name,
                        img:imgUrl
                    });
    
            } else if (result.type === "ChildRemoved") {
                matches.push(result);
                matches.forEach(function(match) {
                    var index = viewModel.indexOf(match);
                    viewModel.splice(index, 1);
                });
            }
        };

        return firebase.addChildEventListener(onChildEvent, "/devices").then(
            function() {
                //console.log("firebase.addChildEventListener added");
            },
            function(error) {
                //console.log("firebase.addChildEventListener error: " + error);
            }
        )
    };
    viewModel.empty = function () {
        while (viewModel.length) {
            viewModel.pop();
        }
    };

    return viewModel;
}

module.exports = DevicesViewModel;
