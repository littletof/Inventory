const DevicesViewModel = require("./devices-view-model");

function onLoaded(args) {
    const component = args.object;
    component.bindingContext = new DevicesViewModel();
}

exports.onLoaded = onLoaded;
