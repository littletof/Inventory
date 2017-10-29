var firebase = require("nativescript-plugin-firebase");
var ObservableArray = require("data/observable-array").ObservableArray;



function MyLendingsViewModel(items) {
    var viewModel= new ObservableArray();
    
    viewModel.load = function() {


        var currentUserId;

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
            //console.log("user adatai:"+JSON.stringify(result.value));
            var item=result.value;
            if (result.type === "ChildAdded") {
                if(result.value.user_id==currentUserId){

                    var findDeviceName = function(device) {
                        for(let uid in device.value){
                            if(device.value[uid].id==result.value.device_id){
                      
                        var a = new Date(item.start_date * 1000);
                        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
                        //var year0 = a.getFullYear();
                        var month0 = months[a.getMonth()];
                        var date0 = a.getDate();
                        var hour0 = a.getHours();
                        var min0 = a.getMinutes();
    
                        var b = new Date(item.end_date * 1000);
                        //var year1 = a.getFullYear();
                        var month1 = months[a.getMonth()];
                        var date1 = a.getDate();
                        var hour1 = a.getHours();
                        var min1 = a.getMinutes();
    
    
    
                        viewModel.push({
                            deviceName:device.value[uid].name,
                            interval:month0+"."+date0+" "+hour0+":"+min0+" - "+month1+"."+date1+" "+hour1+":"+min1,
                            quantity:"quantity borrowed:"+item.device_number
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
