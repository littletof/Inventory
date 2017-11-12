const observableModule = require("data/observable");
var firebase = require("nativescript-plugin-firebase");
var alert = require("ui/dialogs").alert;

var borrow = new observableModule.fromObject({
	'deviceID': "",
	'deviceName': "",
	'quantity_available': "",
	'quantity_borrowed': "0",
	'comment': "",
	'startDate': "",
	'startDate_yyyy': "",
	'startDate_mm': "",
	'startDate_dd': "",
	'endDate': "",
	'endDate_yyyy': "",
	'endDate_mm': "",
	'endDate_dd': "",
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
        borrow.set("deviceName", result.value.name);
        borrow.set("deviceID", result.key);
        borrow.set("quantity_available", result.value.quantity_available);
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
	
	borrow.startDate = new Date();
	borrow.endDate = new Date();
	borrow.startDate_dd = borrow.startDate.getDate();
	borrow.startDate_mm = borrow.startDate.getMonth()+1;
	borrow.startDate_yyyy = borrow.startDate.getFullYear();
	borrow.endDate_dd = borrow.endDate.getDate();
	borrow.endDate_mm = borrow.endDate.getMonth()+1;
	borrow.endDate_yyyy = borrow.endDate.getFullYear();
	return borrow;
}

exports.addNewBorrow = function(pageData){
	if(pageData.startDate_dd<10) {
		pageData.startDate_dd = '0'+pageData.startDate_dd;
	} 
	if(pageData.startDate_mm<10) {
		pageData.startDate_mm = '0'+pageData.startDate_mm;
	}
	if(pageData.endDate_dd<10) {
		pageData.endDate_dd = '0'+pageData.endDate_dd;
	} 

	if(pageData.endDate_mm<10) {
		pageData.endDate_mm = '0'+pageData.endDate_mm;
	}
	
	let startDate = pageData.startDate_mm + '/' + pageData.startDate_dd + '/' + pageData.startDate_yyyy;
	let endDate = pageData.endDate_mm + '/' + pageData.endDate_dd + '/' + pageData.endDate_yyyy;
	
	
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
		
		
		firebase.push( '/lendings/present_lendings', {
				'comment': pageData.comment,
				'device_id': pageData.deviceID,
				'device_quantity': pageData.quantity_borrowed,
				'end_date': endDate.valueOf(),
				'start_date': startDate.valueOf(),
				'user_id': user.uid
			});
			
		firebase.setValue('/devices/'+pageData.deviceID+'/quantity_available', (pageData.quantity_available-pageData.quantity_borrowed));

        });
	  
}


