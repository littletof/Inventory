const observableModule = require("data/observable");
var firebase = require("nativescript-plugin-firebase");
var alert = require("ui/dialogs").alert;

var request = new observableModule.fromObject({
	'requestID': "",
	'comment': "",
	'device_id': "",
	'device_quantity': "",
	'device_name': "",
	//'image': "",
	'device_quantity_available': ""
});


exports.getData = function(requestID){
    const path = "/requests/"+requestID;
    const onBorrowValueEvent = result => {
      console.log("Query result: " + JSON.stringify(result));
      if (result.error) {
        alert({
          title: "Listener error",
          message: result.error,
          okButtonText: "Darn!!"
        });
      } else {
			request.set("requestID", requestID);
			request.set("comment", result.value.comment);
			request.set("device_id", result.value.device_id);
			request.set("device_quantity", result.value.device_quantity);
			getDeviceDetails(request.device_id);
      }
    };
    firebase.query(
        onBorrowValueEvent,
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

function getDeviceDetails(device_id){
    const path = "/devices/"+device_id;
    const onDeviceValueEvent = result => {
      console.log("Query result: " + JSON.stringify(result));
      if (result.error) {
        alert({
          title: "Listener error",
          message: result.error,
          okButtonText: "Darn!!"
        });
      } else {
		  request.set("device_name", result.value.name);
		  request.set("device_quantity_available", result.value.quantity_available);
      firebase.getDownloadUrl({
        bucket: 'gs://inventory-01.appspot.com/images',
        remoteFullPath: result.value.image+'.png'
      }).then(
          function (url) {
            request.set("image",url);            
        },
          function (error) {
            console.log("Error: " + error);
          }
      );   
      }
    };
    firebase.query(
        onDeviceValueEvent,
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

exports.deleteData = function(userID){
	firebase.remove('/requests/'+userID);

	let sum = +request.device_quantity_available + +request.device_quantity;
	firebase.setValue('devices/'+request.device_id+'/quantity_available',sum);
}

