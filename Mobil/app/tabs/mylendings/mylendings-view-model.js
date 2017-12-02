var firebase = require("nativescript-plugin-firebase");
var ObservableArray = require("data/observable-array").ObservableArray;



function MyLendingsViewModel(items) {
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
                      
                        var a = new Date(item.start_date);
                        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
                        //var year0 = a.getFullYear();
                        var month0 = months[a.getMonth()];
                        var date0 = a.getDate();
                        var hour0 = a.getHours();
                        var min0 = a.getMinutes();
    
                        var b = new Date(item.end_date);
                        //var year1 = a.getFullYear();
                        var month1 = months[b.getMonth()];
                        var date1 = b.getDate();
                        var hour1 = b.getHours();
                        var min1 = b.getMinutes();
    
                        firebase.getDownloadUrl({
                            bucket: 'gs://inventory-01.appspot.com/images',
                            remoteFullPath: device.value[uid].image+'.png'
                          }).then(
                              function (url) {
								
								if(device.value[uid].name.toLowerCase().indexOf(searchStr) > -1){    
									viewModel.push({
										id: itemID,
										deviceName:device.value[uid].name,
										interval:month0+"."+date0+" "+hour0+":"+min0+" - "+month1+"."+date1+" "+hour1+":"+min1,
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
        return firebase.addChildEventListener(onChildEvent, "/lendings/present_lendings").then(
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

module.exports = MyLendingsViewModel;
