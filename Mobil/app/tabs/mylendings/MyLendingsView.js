const MyLendingsViewModel = require("./mylendings-view-model");

var lendingsList = new MyLendingsViewModel([]);


var data ={
    lendingsList:lendingsList
}

function onLoaded(args) {
    const component = args.object;

    lendingsList.empty();
    lendingsList.load();

    component.bindingContext = data;
}

exports.onLoaded = onLoaded;
