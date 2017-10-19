const StatisticsViewModel = require("./statistics-view-model");

function onLoaded(args) {
    const component = args.object;
    component.bindingContext = new StatisticsViewModel();
}

exports.onLoaded = onLoaded;
