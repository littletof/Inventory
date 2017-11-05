const observableModule = require("data/observable");
const platform = require("platform");

function TabsUserViewModel() {
    const viewModel = observableModule.fromObject({
        title: ""
    });

    return viewModel;
}

module.exports = TabsUserViewModel;
