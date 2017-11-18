var firebase = require("nativescript-plugin-firebase");
var ObservableArray = require("data/observable-array").ObservableArray;


function DevicesViewModel(items) {
    var viewModel= new ObservableArray(items);
	
	
    viewModel.load = function(tagStr) {

		tagStr = tagStr.toLowerCase();
		let tags = tagStr.split(" ");
		
        var onChildEvent = function(result) {
            var matches = [];
            var device=result.value;
            var imgUrl;
            if (result.type === "ChildAdded") {

                firebase.getDownloadUrl({
                    bucket: 'gs://inventory-01.appspot.com/images',
                    remoteFullPath: device.image+'.png'
                  }).then(
                      function (url) {
                        console.log("Remote URL: " + url);
                        
						if(tagStr == ""){
							viewModel.push({
								description:device.description,
								id:result.key,
								name:device.name,
								image:url,
								available:device.quantity_available
							});
						}else{
							let found = true;
							var objTags = Object.keys(device.tags);
							for(var i = 0; i<tags.length; i++){
								if(objTags.indexOf(tags[i]) > -1 || device.name.toLowerCase().indexOf(tags[i]) > -1){}else{found = false;}
							}
							if(found == true){
								viewModel.push({
									description:device.description,
									id:result.key,
									name:device.name,
									image:url,
									available:device.quantity_available
								});
							}
							
						}
                    },
                      function (error) {
                        console.log("Error: " + error);
                      }
                  );
                

                    
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
