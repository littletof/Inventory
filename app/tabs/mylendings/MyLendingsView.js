const MyLendingsViewModel = require("./mylendings-view-model");

function onLoaded(args) {
    const component = args.object;
    component.bindingContext = new MyLendingsViewModel();
}

exports.onLoaded = onLoaded;
