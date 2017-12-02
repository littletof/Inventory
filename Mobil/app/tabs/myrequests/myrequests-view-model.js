var firebase = require("nativescript-plugin-firebase");
var ObservableArray = require("data/observable-array").ObservableArray;



function MyRequestsViewModel(items) {
    var viewModel= new ObservableArray();
    
    viewModel.load = function(searchStr) {


        var currentUserId;
		searchStr = searchStr.toLowerCase();

        firebase.getCurrentUser().then(
            function (result) {
              currentUserId=result.uid;
              console.log("aktív felhasználó azonosítója: "+currentUserId);
            },
            function (errorMessage) {
              console.log(errorMessage);
            }
          );
        var onChildEvent = function(result) {
            var matches = [];
            console.log("user adatai:"+JSON.stringify(result.value));
            var item=result.value;
			var itemID=result.key;
			

			
            if (result.type === "ChildAdded") {
                if(result.value.user_id==currentUserId){

                    var findDeviceName = function(device) {
                        for(let uid in device.value){
                            if(uid == result.value.device_id){
                      
                        var a = new Date(item.request_date);
                        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
                        var month0 = months[a.getMonth()];
                        var date0 = a.getDate();
                        var hour0 = a.getHours();
                        var min0 = a.getMinutes();
						
                        firebase.getDownloadUrl({
                            bucket: 'gs://inventory-01.appspot.com/images',
                            remoteFullPath: JSON.stringify(device.value[uid].image)+'.png'
                          }).then(
                              function (url) {
								if(device.value[uid].name.toLowerCase().indexOf(searchStr) > -1){
									viewModel.push({
										id: itemID,
										deviceName:device.value[uid].name,
										request_date:month0+"."+date0+" "+hour0+":"+min0,
										quantity:item.device_quantity,
										image:url
									});
								}
                            },
                            function (error) {
                                console.log("Error: " + error);
                            }
                        );
                    }
                    }
                    }

                    firebase.query(
                        findDeviceName,
                        "/devices",
                        {
                            singleEvent: true,
                            orderBy: {
                                type: firebase.QueryOrderByType.CHILD,
                                value: 'name'
                            }
                    });

                    
                }
            }
            else if (result.type === "ChildRemoved") {
                matches.push(result);
                matches.forEach(function(match) {
                    var index = viewModel.indexOf(match);
                    viewModel.splice(index, 1);
                });
            }
            
        }
        return firebase.addChildEventListener(onChildEvent, "/requests").then(
            function() {
                console.log("firebase.addChildEventListener added");
            },
            function(error) {
                console.log("firebase.addChildEventListener error: " + error);
            }
        )
    }
    
        viewModel.empty = function () {
            while (viewModel.length) {
                viewModel.pop();
            }
        };
    
        return viewModel;

}

module.exports = MyRequestsViewModel;
