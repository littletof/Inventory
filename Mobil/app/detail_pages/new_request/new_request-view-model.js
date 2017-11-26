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
	
	request.startDate = new Date();
	request.endDate = new Date();
	request.startDate_dd = request.startDate.getDate();
	request.startDate_mm = request.startDate.getMonth()+1;
	request.startDate_yyyy = request.startDate.getFullYear();
	request.endDate_dd = request.endDate.getDate();
	request.endDate_mm = request.endDate.getMonth()+1;
	request.endDate_yyyy = request.endDate.getFullYear();
	return request;
}

exports.addNewRequest = function(pageData){
	var date = new Date();
	var dd = date.getDate();
	var mm = date.getMonth()+1;
	var yyyy = date.getFullYear();
	if(dd<10) {
		dd = '0'+dd;
	} 
	if(mm<10) {
		mm = '0'+mm;
	}
	
	let requestDate = mm + '/' + dd + '/' + yyyy;
	
	
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
				'request_date': requestDate.valueOf(),
				'user_id': user.uid
			});
			
		firebase.setValue('/devices/'+pageData.deviceID+'/quantity_available', (pageData.quantity_available-pageData.quantity_requested));

        });
	  
}


