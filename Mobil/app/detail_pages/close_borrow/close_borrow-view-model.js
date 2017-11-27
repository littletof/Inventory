const observableModule = require("data/observable");
var firebase = require("nativescript-plugin-firebase");
var dialog = require("ui/dialogs");
var ObservableArray = require("data/observable-array").ObservableArray;
const topmost = require("ui/frame").topmost;

var borrow = new observableModule.fromObject({
	'borrowID': "",
	'comment': "",
	'device_id': "",
	'device_quantity': "",
	'end_date': "",
	'end_date_raw': "",
	'start_date': "",
	'start_date_raw': "",
	'user_id': "",
	'user_name': "",
	'device_name': "",
	'overdue': "",
	'device_quantity_total': "",
	'device_quantity_available': "",
	'devices':""
});

function convertDate(date){
	let tmp_date = new Date(date);
	let tmp_date_dd = tmp_date.getDate();	let months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
	let tmp_date_mm = months[tmp_date.getMonth()];
	let tmp_date_yyyy = tmp_date.getFullYear();
	if(tmp_date_dd<10)
		tmp_date_dd = '0'+tmp_date_dd;
	let final_date = tmp_date_mm + ' / ' + tmp_date_dd + ' / ' + tmp_date_yyyy;
	return final_date;
}

function dateChecker(date){
	let today = new Date();
	let checked_date = new Date(date);
	
	if(checked_date<today)
		return "Overdue!";
	else
		return "";
}

exports.getData = function(borrowID){
	var devices = new ObservableArray([]);
    const path = "/lendings/present_lendings/"+borrowID;
    const onBorrowValueEvent = result => {
      console.log("Query result: " + JSON.stringify(result));
      if (result.error) {
        dialog.alert({
          title: "Listener error",
          message: result.error,
          okButtonText: "Darn!!"
        });
      } else {
			borrow.set("borrowID", borrowID);
			borrow.set("comment", result.value.comment);
			borrow.set("device_id", result.value.device_id);
			borrow.set("device_quantity", result.value.device_quantity);
			borrow.set("end_date", convertDate(result.value.end_date));
			borrow.set("end_date_raw", result.value.end_date);
			borrow.set("start_date_raw", result.value.start_date);
			borrow.set("start_date", convertDate(result.value.start_date));
			borrow.set("user_id", result.value.user_id);
			borrow.set("overdue", dateChecker(result.value.end_date));			
			borrow.set("devices", result.value.imei);
			getUserDetails(borrow.user_id);
			getDeviceDetails(borrow.device_id);
			for(var k in borrow.devices){
				devices.push({'imei':k,'comment':""});
			}
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
          dialog.alert({
            title: "Query error",
            message: errorMessage,
            okButtonText: "OK, pity!"
          });
        }
    );
	return new observableModule.fromObject({
		'devices': devices
	});
}

function getUserDetails(userID){
    const path = "/users/"+userID;
    const onUserValueEvent = result => {
      console.log("Query result: " + JSON.stringify(result));
      if (result.error) {
        dialog.alert({
          title: "Listener error",
          message: result.error,
          okButtonText: "Darn!!"
        });
      } else {
		  borrow.set("user_name", result.value.name);
      }
    };
    firebase.query(
        onUserValueEvent,
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
          dialog.alert({
            title: "Query error",
            message: errorMessage,
            okButtonText: "OK, pity!"
          });
        }
	);
}

function getDeviceDetails(device_id){
    const path = "/devices/"+device_id;
    const onDeviceValueEvent = result => {
      console.log("Query result: " + JSON.stringify(result));
      if (result.error) {
        dialog.alert({
          title: "Listener error",
          message: result.error,
          okButtonText: "Darn!!"
        });
      } else {
		  borrow.set("device_name", result.value.name);
		  borrow.set("device_quantity_available", result.value.quantity_available);
      borrow.set("device_quantity_total", result.value.quantity_total);
      
      firebase.getDownloadUrl({
        bucket: 'gs://inventory-01.appspot.com/images',
        remoteFullPath: result.value.image+'.png'
      }).then(
          function (url) {
            borrow.set("image",url);            
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
          dialog.alert({
            title: "Query error",
            message: errorMessage,
            okButtonText: "OK, pity!"
          });
        }
    );
}


exports.pushClose=function(devices){
	dialog.confirm("Lezája ezt a kölcsönzést?").then(function (result) {
		if(result){
			let tmp = [];
			for(var i=0; i<devices.length; i++){
				tmp.push({
					'imei':devices.getItem(i).imei,
					'comment':devices.getItem(i).comment
				});
				if(devices.getItem(i).comment != ""){
					firebase.push('devices/'+borrow.device_id+'/imei/'+devices.getItem(i).imei+'/comments',{'stuff': devices.getItem(i).comment});
				}
				firebase.setValue('devices/'+borrow.device_id+'/imei/'+devices.getItem(i).imei+'/available',true);
			}
			firebase.push('lendings/past_lendings/',{
				'comment': borrow.comment,
				'device_id': borrow.device_id,
				'device_quantity': borrow.device_quantity,
				'end_date': borrow.end_date_raw,
				'start_date': borrow.start_date_raw,
				'user_id': borrow.user_id,
				'imei': tmp
			});

			let sum = +borrow.device_quantity_available + +borrow.device_quantity;
			firebase.setValue('devices/'+borrow.device_id+'/quantity_available',sum);

			firebase.remove('/lendings/present_lendings/'+borrow.borrowID);
			topmost().goBack();
		}
	});

}