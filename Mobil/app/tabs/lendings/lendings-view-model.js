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
    
    viewModel.load = function() {
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
                    
                                viewModel.push({
									id: borrowID,
                                    deviceName:device.value[uid].name,
                                    interval:month0+"."+date0+" - "+month1+"."+date1,
                                    quantity:borrowing.device_quantity
                                });
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
    };
    
    viewModel.empty = function() {
        while (viewModel.length) {
            viewModel.pop();
        }
    };

    return viewModel;
}

module.exports = Lendings;
