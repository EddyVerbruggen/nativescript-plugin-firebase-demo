require("./bundle-config");
var application = require("application");

// added this here so we can do some wiring
var firebase = require("nativescript-plugin-firebase");

application.start({ moduleName: "main-page" });
