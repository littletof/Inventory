var firebase = require("nativescript-plugin-firebase");
var ObservableArray = require("data/observable-array").ObservableArray;
const imageSource = require("image-source");
var fs = require("file-system");


firebase.init({
    url: 'https://inventory-01.firebaseio.com/',
    persist: true
})

function DevicesViewModel(items) {
    var viewModel= new ObservableArray(items);

    viewModel.load = function () {

         
      
            var onQueryEvent = function(result) {
                if (!result.error) {
                    
                    //console.log("Value: " + JSON.stringify(result.value));
                    var res=result.value;

                    res.forEach(function (device) {

                        
                          var imgUrl;
                         
                          
                          firebase.getDownloadUrl({
                            bucket: 'gs://inventory-01.appspot.com/images/',
                            remoteFullPath: device.id+'.png'
                          }).then(
                              function (url) {
                                console.log("Remote URL: " + JSON.stringify(url));
                                
                                imgUrl="https://pbs.twimg.com/profile_images/856508346190381057/DaVvCgBo.jpg";
                                //console.log("imgUrl: " + imgUrl);
                              },
                              function (error) {
                                firebase.getDownloadUrl({
                                    bucket: 'gs://inventory-01.appspot.com/images/',
                                    remoteFullPath: 'placeholder.png'
                                  }).then(
                                      function (url) {
                                        console.log("Remote URL: " + JSON.stringify(url));
                                        imgUrl="https://pbs.twimg.com/profile_images/856508346190381057/DaVvCgBo.jpg";
                                        //console.log("imgUrl: " + imgUrl);
                                      },
                                      function (error) {
                                        console.log("Error: " + error);
                                        
                                      }
                                  );
                              }
                          );

                        viewModel.push({
                            description:device.description,
                            id:device.id,
                            name:device.name,
                            img:imgUrl
                        });
                        
                    });
                    
                }
            };
        
            firebase.query(
                onQueryEvent,
                "/devices",
                {
                    
                    singleEvent: true,
                   
                    orderBy: {
                        type: firebase.QueryOrderByType.CHILD,
                        value: 'name' // mandatory when type is 'child'
                    },
                   
                    ranges: 
                      {
                          
                      },
                    limit: {
                       
                    }
                }
            );
            return viewModel;
    }

    viewModel.empty = function () {
        while (viewModel.length) {
            viewModel.pop();
        }
    };

    return viewModel;
}

module.exports = DevicesViewModel;
