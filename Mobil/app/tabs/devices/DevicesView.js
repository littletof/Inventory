const DevicesViewModel = require("./devices-view-model");


var deviceList = new DevicesViewModel([]);


var data ={
    deviceList:deviceList
}

function onLoaded(args) {
    

    const component = args.object;


    deviceList.empty();
    deviceList.load();
    
    component.bindingContext = data;
}

exports.onDetails=function(args){
    console.log(args.object.device);
}

exports.onImageLoaded=function(args){
    console.log(args.object.device+". kép betöltve");    

}

exports.onLoaded = onLoaded;
