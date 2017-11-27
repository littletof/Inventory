var ObservableArray = require("data/observable-array").ObservableArray;
var config = require("../../shared/config");
var firebase = require("nativescript-plugin-firebase");
const topmost = require("ui/frame").topmost;



function IMEIViewModel(items) {
    var viewModel = new ObservableArray(items);
    var pageData;
    
    viewModel.load = function(request) {
        console.log("request adatai:"+request.device_name+"\t"+request.user_name);
        
                var findIMEI = function(imei) {
                    for(let uid in imei.value){
                        if(imei.value[uid].available==true){
                            
                            viewModel.push({
                                imei:uid,
                                comment:imei.value[uid].comments,
                                selected:false,
                                className:"unselectedclass"
                            })
                        }
                    }
                }

                firebase.query(
                    findIMEI,
                    "/devices/"+request.device_id+'/imei',
                    {
                        singleEvent: true,
                        orderBy: {
                            type: firebase.QueryOrderByType.CHILD,
                            value: 'name'
                        }
                });
        return viewModel;
    };

    viewModel.lend = function(args){
        pageData=args;
        console.log("navigationrequest.devicename"+pageData.navigationRequest.device_name);
        var startDate = new Date();
        startDate_dd = startDate.getDate();
        startDate_mm = startDate.getMonth()+1;
        startDate_yyyy = startDate.getFullYear();
        if(startDate_dd<10) {
            startDate_dd = '0'+startDate_dd;
        } 
        if(startDate_mm<10) {
            startDate_mm = '0'+startDate_mm;
        }
        if(pageData.endDate_dd<10) {
            pageData.endDate_dd = '0'+pageData.endDate_dd;
        } 
    
        if(pageData.endDate_mm<10) {
            pageData.endDate_mm = '0'+pageData.endDate_mm;
        }

        let start = startDate_mm + '/' + startDate_dd + '/' + startDate_yyyy;
        let endDate = pageData.endDate_mm + '/' + pageData.endDate_dd + '/' + pageData.endDate_yyyy;
        /*console.log('comment'+ pageData.navigationRequest.comment+
        'device_id'+ pageData.navigationRequest.device_id+
        'device_quantity'+ pageData.navigationRequest.quantity+
        'end_date'+ endDate+
        'start_date'+ startDate+
        'user_id'+ user.uid);*/
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
        var tmp=[];

              for(var i=0; i<pageData.selectedImeiList.length; i++){
				tmp.push({
					'imei':pageData.selectedImeiList.getItem(i).imei,
				});
				
				firebase.setValue('devices/'+pageData.navigationRequest.device_id+'/imei/'+pageData.selectedImeiList.getItem(i).imei+'/available',false);
			}  
        firebase.push( '/lendings/present_lendings', {
            'comment': pageData.navigationRequest.comment,
            'device_id': pageData.navigationRequest.device_id,
            'device_quantity': pageData.navigationRequest.quantity,
            'end_date': endDate.valueOf(),
            'start_date': start.valueOf(),
            'user_id': user.uid,
            'imei':tmp
        });
        

        viewModel.deleteRequest(pageData);
    });
    }


    
    viewModel.deleteRequest = function(args) {
        pageData=args;
        firebase.remove("/requests/"+pageData.navigationRequest.request_id);
        topmost().goBack();
    };
    
    viewModel.empty = function() {
        while (viewModel.length) {
            viewModel.pop();
        }
    };

    

    return viewModel;
}

module.exports = IMEIViewModel;


