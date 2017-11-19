const observableModule = require("data/observable");
var firebase = require("nativescript-plugin-firebase");
var frameModule = require("ui/frame");
const topmost = frameModule.topmost;
var alert = require("ui/dialogs").alert;

var device = new observableModule.fromObject({
	'deviceName': "<deviceName>",
	'description': "<deviceDescription>",
	'quantity_available': "1",
	'quantity_total': "1"
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
        device.set("deviceName", result.value.name);
        device.set("description", result.value.description);
        device.set("quantity_available", result.value.quantity_available);
        device.set("quantity_total", result.value.quantity_total);
        firebase.getDownloadUrl({
          bucket: 'gs://inventory-01.appspot.com/images',
          remoteFullPath: result.value.image+'.png'
        }).then(
            function (url) {
              console.log("imageid="+url);
              device.set("image", url);
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
            message: "No Such Device!",
            okButtonText: "OK, pity!"
          });
		topmost().goBack();
		  
        }
    );
	return device;
}
