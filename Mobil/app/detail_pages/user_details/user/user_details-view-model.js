const observableModule = require("data/observable");
var firebase = require("nativescript-plugin-firebase");
var alert = require("ui/dialogs").alert;

var user = new observableModule.fromObject({
	'userID': "",
	'userName': "<userName>",
	'emailAddress': "<userEmail>",
	'role': "1"
});

exports.getData = function(userID){
    const path = "/users/"+userID;
    const onValueEvent = result => {
      console.log("Query result: " + JSON.stringify(result));
      if (result.error) {
        alert({
          title: "Listener error",
          message: result.error,
          okButtonText: "Darn!!"
        });
      } else {
		  user.set("userID", userID);
		  user.set("userName", result.value.name);
		  user.set("emailAddress", result.value.email_address);
		  user.set("role", result.value.role);
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
	return user;
}


exports.deleteData = function(userID){
	firebase.remove('/users/'+userID);
}


