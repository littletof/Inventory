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

function RequestsViewModel(items) {
    var viewModel = new ObservableArray(items);
    
    viewModel.indexOf = indexOf;
    
    viewModel.load = function() {
        var onChildEvent = function(result) {
            var matches = [];
            
            if (result.type === "ChildAdded") {
                var findDeviceName = function(device) {
                    for(let uid in device.value){
                        if(uid == result.value.device_id){

                        var findUserName = function(user) {
                            for(let userid in user.value){
                            if(userid == result.value.user_id){
                  
                    
                            viewModel.push({
                                device_name: device.value[uid].name,
                                quantity:result.value.device_quantity,
                                user:user.value[userid].name,
                                comment:result.value.comment
                            });
                            
                        
                    
                }
                }
                }

                firebase.query(
                    findUserName,
                    "/users",
                    {
                        singleEvent: true,
                        orderBy: {
                            type: firebase.QueryOrderByType.CHILD,
                            value: 'name'
                        }
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
                });
            } else if (result.type === "ChildRemoved") {
                matches.push(result);
                matches.forEach(function(match) {
                    var index = viewModel.indexOf(match);
                    viewModel.splice(index, 1);
                });
            }
        };

        return firebase.addChildEventListener(onChildEvent, "/requests").then(
            function() {
                console.log("firebase.addChildEventListener added");
            },
            function(error) {
                console.log("firebase.addChildEventListener error: " + error);
            }
        )
    };

    viewModel.add = function(user) {
        return firebase.push( '/users', {
            'email_address': user.get("email"),
            'name': user.get("name"),
            'role': user.get("role")
        });
      };
    
    viewModel.delete = function(index) {
        var id = viewModel.getItem(index).id;
        return firebase.remove("/users/"+id+"");
    };
    
    viewModel.empty = function() {
        while (viewModel.length) {
            viewModel.pop();
        }
    };

    

    return viewModel;
}

module.exports = RequestsViewModel;


