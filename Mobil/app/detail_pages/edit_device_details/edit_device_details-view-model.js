const observableModule = require("data/observable");


function deviceDetailViewModel(deviceModel) {
    const viewModel = observableModule.fromObject({
        device: deviceModel
    });

    return viewModel;
}

module.exports = deviceDetailViewModel;
