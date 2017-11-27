const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const ONE_DAY = 24*60*60*1000; 

exports.deleteOldRequests = functions.https.onRequest((request, response) => {
    const A_DAY_AGO = new Date().getTime() - ONE_DAY;
    var requestsReference = admin.database().ref('requests');
    var message = "DELETED:\n\n";

    requestsReference.once('value').then(snapshots => {
        snapshots.forEach(snapshot => {
            if (A_DAY_AGO >= snapshot.val().request_date) {
                message +=  "user_id: " + snapshot.val().user_id + "\n" +
                            "request_date: " + new Date(snapshot.val().request_date).toString() + "\n" +
                            "device_id: " + snapshot.val().device_id + "\n" +
                            "device_quantity: " + snapshot.val().device_quantity + "\n" +
                            "comment: " + snapshot.val().comment + "\n\n";
                snapshot.ref.remove();
            }
        })
        response.send(message);
    });
});