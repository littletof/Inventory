var dialogsModule = require("ui/dialogs");
var observableModule = require("data/observable");
var frameModule = require("ui/frame");
var topmost = frameModule.topmost();
var firebase = require("nativescript-plugin-firebase");
var page;

var selectedDevice;

var pageData = new observableModule.fromObject({
	'deviceName': "<deviceName>",
	'comment': "",
	'start_date': "3",
	'end_date_yy': "1995",
	'end_date_mm': "11",
	'end_date_dd': "27",
	'end_date': "4",
	'device_quantity': "1",
	'today': ""
});

exports.onNavBtnTap = function(args){
	topmost.goBack();
}

exports.onDateChanged = function(args){
}

exports.borrowButtonTapped = function(args){
	var startDate = new Date();
	var dd = startDate.getDate();
	var mm = startDate.getMonth()+1;
	var yyyy = startDate.getFullYear();

	if(dd<10) {
		dd = '0'+dd
	} 

	if(mm<10) {
		mm = '0'+mm
	} 
	
	if(pageData.end_date_dd<10) {
		pageData.end_date_dd = '0'+pageData.end_date_dd
	} 

	if(pageData.end_date_mm<10) {
		pageData.end_date_mm = '0'+pageData.end_date_mm
	}

	startDate = mm + '/' + dd + '/' + yyyy;
	var endDate = pageData.end_date_mm + '/' + pageData.end_date_dd + '/' + pageData.end_date_yy;
	
	
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
				'device_id': selectedDevice.id,
				'device_quantity': pageData.device_quantity,
				'end_date': endDate.valueOf(),
				'start_date': startDate.valueOf(),
				'user_id': user.uid
			});

        });

	topmost.goBack();
}


exports.loaded = function(args) {
    page = args.object;
	selectedDevice = page.navigationContext;
	
	pageData.deviceName = selectedDevice.name;
	pageData.today = new Date();
	pageData.end_date_dd = pageData.today.getDate();
	pageData.end_date_mm = pageData.today.getMonth()+1;
	pageData.end_date_yy = pageData.today.getFullYear();
	
	
    page = args.object;
    page.bindingContext = pageData;
};