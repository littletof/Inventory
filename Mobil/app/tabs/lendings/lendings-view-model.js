var ObservableArray = require("data/observable-array").ObservableArray;
var config = require("../../shared/config");
var firebase = require("nativescript-plugin-firebase");


function indexOf(item) {
    var match = -1;
    this.forEach(function(loopItem, index) {
      if (loopItem.id === item.key) {
        match = index;
      }
    });
    return match;
  }

function Lendings(items) {
    var viewModel = new ObservableArray(items);
    
    viewModel.indexOf = indexOf;
    
    viewModel.load = function(searchStr) {
		
		searchStr = searchStr.toLowerCase();
		
        var onChildEvent = function(result) {
            var matches = [];
            var borrowing =result.value;
            let borrowID = result.key;
            if (result.type === "ChildAdded") {
                if(borrowing.UID == config.uid) {
                    var findDeviceName = function(device) {
                        for(let uid in device.value) {  
                            if(uid == borrowing.device_id) {
                                var a = new Date(borrowing.start_date);
                                var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
                                var month0 = months[a.getMonth()];
                                var date0 = a.getDate();
                                    
                                var b = new Date(borrowing.end_date);
                                var month1 = months[b.getMonth()];
                                var date1 = b.getDate();
                    
                                firebase.getDownloadUrl({
                                    bucket: 'gs://inventory-01.appspot.com/images',
                                    remoteFullPath: device.value[uid].image+'.png'
                                  }).then(
                                      function (url) {
											if(searchStr == ""){
												viewModel.push({
													id: borrowID,
													deviceName:device.value[uid].name,
													interval:month0+"."+date0+" - "+month1+"."+date1,
													quantity:borrowing.device_quantity,
													image:url
												});
											}else if (device.value[uid].name.toLowerCase().indexOf(searchStr) > -1){
												viewModel.push({
													id: borrowID,
													deviceName:device.value[uid].name,
													interval:month0+"."+date0+" - "+month1+"."+date1,
													quantity:borrowing.device_quantity,
													image:url
												});
											}else{
												const path = "/users/"+borrowing.user_id;
												const onValueEvent = result => {
												  console.log("Query result: " + JSON.stringify(result));
												  if (result.error) {
													alert({
													  title: "Listener error",
													  message: result.error,
													  okButtonText: "Darn!!"
													});
												  } else {
													  if(result.value.name.toLowerCase().indexOf(searchStr) > -1){
														viewModel.push({
															id: borrowID,
															deviceName:device.value[uid].name,
															interval:month0+"."+date0+" - "+month1+"."+date1,
															quantity:borrowing.device_quantity,
															image:url
														});														  
													  }
												  }
												};
												firebase.query(
													onValueEvent,
													path,
													{
													  singleEvent: true,
													  orderBy: {
														type: firebase.QueryOrderByType.KEY
													  }
													}
												).then(
													result => {
													  console.log("This 'result' should be available since singleEvent is true: " + JSON.stringify(result));
													  console.log("firebase.doQueryUsers done; added a listener");
													},
													errorMessage => {
													  alert({
														title: "Query error",
														message: errorMessage,
														okButtonText: "OK, pity!"
													  });
													}
												);
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
                        }
                    );            
                }
            } else if (result.type === "ChildRemoved") {
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
        return;
    };
    
    viewModel.empty = function() {
        while (viewModel.length) {
            viewModel.pop();
        }
    };

    return viewModel;
}

module.exports = Lendings;
