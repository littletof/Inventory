const observableModule = require("data/observable");
var firebase = require("nativescript-plugin-firebase");
var alert = require("ui/dialogs").alert;

var request = new observableModule.fromObject({
	'deviceID': "",
	'deviceName': "",
	'quantity_available': "",
	'quantity_requested': "",
	'image': "",
	'comment': ""
});

exports.getData = function(deviceID){
	
    const path = "/devices/"+deviceID;
    const onValueEvent = result => {
      console.log("Query result: " + JSON.stringify(result));
      if (result.error) {
        alert({
          title: "Listener error",
          message: result.error,
          okButtonText: "Darn!!"
        });
      } else {
        request.set("deviceName", result.value.name);
        request.set("deviceID", result.key);
        request.set("quantity_available", result.value.quantity_available);
		request.set("comment","");
		request.set("quantity_requested","0");
        firebase.getDownloadUrl({
          bucket: 'gs://inventory-01.appspot.com/images',
          remoteFullPath: result.value.image+'.png'
        }).then(
            function (url) {
              console.log("imageid="+url);
              request.set("image", url);
            },
            function (error) {
              console.log("Error: " + error);
            }
        );
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
	
	return request;
}

exports.addNewRequest = function(pageData){
	
	
    firebase.getCurrentUser().then(
        user => {
          if (!user || !user.uid) {
            alert({
              title: "Can't fetch providers",
              message: "No user with emailaddress logged in.",
              okButtonText: "OK, makes sense.."
            });
            return;
          }
		
		
		firebase.push( '/requests', {
				'comment': pageData.comment,
				'device_id': pageData.deviceID,
				'device_quantity': pageData.quantity_requested,
				'request_date': new Date().getTime(),
				'user_id': user.uid
			});
			
		firebase.setValue('/devices/'+pageData.deviceID+'/quantity_available', (pageData.quantity_available-pageData.quantity_requested));

        });
	  
}


