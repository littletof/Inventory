const observableModule = require("data/observable");
const platform = require("platform");

function TabsGuestViewModel() {
    const viewModel = observableModule.fromObject({
        title: ""
    });

    return viewModel;
}

module.exports = TabsGuestViewModel;
