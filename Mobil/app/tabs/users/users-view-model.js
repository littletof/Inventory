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

function Users(items) {
    var viewModel = new ObservableArray(items);
    
    viewModel.indexOf = indexOf;
    
    viewModel.load = function(searchStr) {
		
		searchStr = searchStr.toLowerCase();
		let search = searchStr.split(" ");
		
        var onChildEvent = function(result) {
            var matches = [];
            
            if (result.type === "ChildAdded") {
                if (result.value.UID === config.uid) {
					if(searchStr == ""){					
						viewModel.push({
							name: result.value.name,
							email: result.value.email_address,
							role: result.value.role,
							id: result.key
						});
					}else{
						let found = false;
						for(var i = 0; i<search.length; i++){
							if(result.value.name.toLowerCase().indexOf(search[i]) > -1){
								found = true;
							}
						}
						if(found){					
							viewModel.push({
								name: result.value.name,
								email: result.value.email_address,
								role: result.value.role,
								id: result.key
							});
						}
					}
                }
            } else if (result.type === "ChildRemoved") {
                matches.push(result);
                matches.forEach(function(match) {
                    var index = viewModel.indexOf(match);
                    viewModel.splice(index, 1);
                });
            }
        };

        return firebase.addChildEventListener(onChildEvent, "/users").then(
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

module.exports = Users;


