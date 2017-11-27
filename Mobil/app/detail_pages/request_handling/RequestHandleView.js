var observableModule = require("data/observable")
var ObservableArray = require("data/observable-array").ObservableArray;
var frameModule = require("ui/frame");
const topmost = frameModule.topmost;
var firebase = require("nativescript-plugin-firebase");

var page;
var navigationRequest;
var startDate;
var startDate_dd;
var startDate_mm;
var startDate_yyyy;
var endDate_dd;
var endDate_mm;
var endDate_yyyy;
var endDate;
var selectedNum;
var IMEIViewModel = require("./imei-view-model");
var imeiList = new IMEIViewModel([]);
var selectedImeiList = new ObservableArray();
var startDate;
var pageData = new observableModule.fromObject({
    imeiList:imeiList,
    selectedImeiList:selectedImeiList,
    deviceName:'',
    startDate:startDate,
    endDate:endDate,
    endDate_dd:endDate_dd,
    endDate_mm:endDate_mm,
    endDate_yyyy:endDate_yyyy,
    navigationRequest:''
});

exports.onNavigatingTo = function(args) {
    page = args.object;
    
    
    imeiList.empty();
    imeiList.load(page.navigationContext);
    selectedNum=0;

    for(i = 0; i < selectedImeiList.length; i++) selectedImeiList.pop();

    endDate = new Date();
    endDate_dd = endDate.getDate()+1;
    endDate_mm = endDate.getMonth();
    endDate_yyyy = endDate.getFullYear();
    pageData.endDate_dd=endDate_dd;
    pageData.endDate_mm=endDate_mm;
    pageData.endDate_yyyy=endDate_yyyy;
    
    startDate= new Date();
	pageData.startDate=startDate;

    pageData.deviceName=page.navigationContext.device_name;
    navigationRequest=page.navigationContext;
    
    pageData.navigationRequest=navigationRequest;
    page.bindingContext = pageData;    
};

exports.lend = function(){
    if(selectedNum!=navigationRequest.quantity){
        alert({
			title: L('NotEnoughDevices'),
			message: L('NotEnoughChosenMessage'),
			okButtonText: "Ok"
        });
    }else{
        imeiList.lend(pageData);
        
    }
}

exports.deleteRequest = function(){
    let sum = navigationRequest.num_available + navigationRequest.quantity;
    firebase.setValue('devices/'+navigationRequest.device_id+'/quantity_available',sum);
    imeiList.deleteRequest(pageData);
}

exports.itemTap = function(args){
    var tapped = args.object;
    tappedImei = args.object.bindingContext;
    if(tappedImei.selected==true){
        tappedImei.selected=false;
        //tapped.backgroundColor="#ffffff";  
        //tappedImei.className="unselectedclass";
        
        selectedNum--;  
        
        for(var i=0;i<selectedImeiList.length;i++){            
            if(selectedImeiList.getItem(i).imei==tappedImei.imei){
                selectedImeiList.splice(i,1);
                break;
            }
        }
    } else{
        if(selectedNum<navigationRequest.quantity){
            tappedImei.selected=true;  
            //tapped.backgroundColor="#2E7D32";  
            //tappedImei.className="selectedclass";
            selectedNum++;   
            selectedImeiList.push(tappedImei);  
            for(var i=0;i<selectedImeiList.length;i++){            
                console.log("selectedImeiList["+i+"]="+selectedImeiList.getItem(i).imei);
            }           
        }           
    }
}


exports.onBackButtonTap = function(args){
    topmost().goBack();
}