const UsersViewModel = require("./users-view-model");

function onLoaded(args) {
    const component = args.object;
    component.bindingContext = new UsersViewModel();
}

exports.onLoaded = onLoaded;
