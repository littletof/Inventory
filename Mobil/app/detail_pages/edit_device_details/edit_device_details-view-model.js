const observableModule = require("data/observable");
var firebase = require("nativescript-plugin-firebase");
var alert = require("ui/dialogs").alert;

var device = new observableModule.fromObject({
	'deviceID': "",
	'deviceName': "<deviceName>",
	'description': "<deviceDescription>",
	'quantity_available': "1",
	'quantity_total': "1",
	'tags': ""
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
		  device.set("deviceID", deviceID);
		  device.set("deviceName", result.value.name);
		  device.set("description", result.value.description);
		  device.set("quantity_available", result.value.quantity_available);
		  device.set("quantity_total", result.value.quantity_total);
		  device.set("tags", result.value.tags);
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
	return device;
}

exports.updateData = function(newDevice){
	firebase.setValue('/devices/'+newDevice.deviceID,{
		description: newDevice.description,
		name: newDevice.deviceName,
		quantity_available: newDevice.quantity_available,
		quantity_total: newDevice.quantity_total,
		tags: newDevice.tags
	});
}


