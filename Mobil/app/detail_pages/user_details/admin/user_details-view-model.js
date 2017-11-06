const observableModule = require("data/observable");


function userDetailViewModel(userModel) {
    const viewModel = observableModule.fromObject({
        user: userModel
    });

    return viewModel;
}

module.exports = userDetailViewModel;
