var firebase = require("nativescript-plugin-firebase");
var ObservableArray = require("data/observable-array").ObservableArray;
const imageSource = require("image-source");
var fs = require("file-system");



function DevicesViewModel(items) {
    var viewModel= new ObservableArray(items);

    viewModel.load = function() {
        var onChildEvent = function(result) {
            var matches = [];
            var device=result.value;
            var imgUrl;
            if (result.type === "ChildAdded") {
<<<<<<< HEAD

                firebase.getDownloadUrl({
                    bucket: 'gs://inventory-01.appspot.com/images',
                    remoteFullPath: device.image+'.png'
                  }).then(
                      function (url) {
                        console.log("Remote URL: " + url);
                        imageSource.fromUrl(url).then(function(res){
                        
                            viewModel.push({
                                description:device.description,
                                id:result.key,
                                name:device.name,
                                image:res,
                                available:device.quantity_available
                            });
                        }, function (error) {
                            //console.log("Error loading image: " + error);
                        });
                    },
                      function (error) {
                        console.log("Error: " + error);
                      }
                  );
                

                    
=======
                    viewModel.push({
                        description:device.description,
                        id:result.key,
                        name:device.name,
                        img:imgUrl
                    });
    
>>>>>>> 92792072b36336762516b4cd1bcc1b8da5fc12f1
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
