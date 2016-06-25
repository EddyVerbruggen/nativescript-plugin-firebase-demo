var application = require("application");

// added this here so we can do some wiring
var firebase = require("nativescript-plugin-firebase");

application.mainModule = "main-page";
application.cssFile = "./app.css";
application.start();
