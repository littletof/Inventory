const LendingsViewModel = require("./lendings-view-model");

function onLoaded(args) {
    const component = args.object;
    component.bindingContext = new LendingsViewModel();
}

exports.onLoaded = onLoaded;
