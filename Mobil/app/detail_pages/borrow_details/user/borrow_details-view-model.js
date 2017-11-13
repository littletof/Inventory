const observableModule = require("data/observable");
var firebase = require("nativescript-plugin-firebase");
var alert = require("ui/dialogs").alert;

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
	'device_quantity_available': ""
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
    const path = "/lendings/present_lendings/"+borrowID;
    const onBorrowValueEvent = result => {
      console.log("Query result: " + JSON.stringify(result));
      if (result.error) {
        alert({
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
			getUserDetails(borrow.user_id);
			getDeviceDetails(borrow.device_id);
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
	return borrow;
}

function getUserDetails(userID){
    const path = "/users/"+userID;
    const onUserValueEvent = result => {
      console.log("Query result: " + JSON.stringify(result));
      if (result.error) {
        alert({
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
          alert({
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
        alert({
          title: "Listener error",
          message: result.error,
          okButtonText: "Darn!!"
        });
      } else {
		  borrow.set("device_name", result.value.name);
		  borrow.set("device_quantity_available", result.value.quantity_available);
		  borrow.set("device_quantity_total", result.value.quantity_total);
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



