if (global.TNS_WEBPACK) {
    //registers tns-core-modules UI framework modules
    require("bundle-entry-points");

    //register application modules
    global.registerModule("tabs/tabs-page", () => require("./tabs/tabs-page"));
    global.registerModule("browse/Browse", () => require("./browse/BrowseView"));
    global.registerModule("home/Home", () => require("./home/HomeView"));
    global.registerModule("search/Search", () => require("./search/SearchView"));
    global.registerModule("devices/Devices", () => require("./devices/DevicesView"));
    global.registerModule("mylendings/MyLendings", () => require("./mylendings/MyLendingsView"));
    global.registerModule("users/Users", () => require("./users/UsersView"));
    global.registerModule("lendgins/Lendings", () => require("./lendings/LendingsView"));
    global.registerModule("statistics/Statistics", () => require("./statistics/StatisticsView"));
    
}
