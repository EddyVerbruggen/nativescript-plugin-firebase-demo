var observable = require("data/observable");
var dialogs = require("ui/dialogs");
var firebase = require("nativescript-plugin-firebase");
var DemoAppModel = (function (_super) {
  __extends(DemoAppModel, _super);
  function DemoAppModel() {
    _super.call(this);
  }

  DemoAppModel.prototype.doInit = function () {
    firebase.init({
      url: 'https://resplendent-fire-4211.firebaseio.com'
    }).then(
        function (result) {
          dialogs.alert({
            title: "Firebase is ready",
            okButtonText: "Merci!"
          })
        },
        function (error) {
          console.log("firebase.init error: " + error);
        }
    )
  };

  DemoAppModel.prototype.doLoginAnonymously = function () {
    firebase.login({
      // note that you need to enable anonymous login in your firebase instance
      type: firebase.loginType.ANONYMOUS
    }).then(
        function (result) {
          dialogs.alert({
            title: "Login OK",
            message: JSON.stringify(result),
            okButtonText: "Nice!"
          })
        },
        function (errorMessage) {
          dialogs.alert({
            title: "Login error",
            message: errorMessage,
            okButtonText: "OK, pity"
          })
        }
    )
  };

  DemoAppModel.prototype.doLoginByPassword = function () {
    firebase.login({
      // note that you need to enable email-password login in your firebase instance
      type: firebase.loginType.PASSWORD,
      // note that these credentials have been configured in our firebase instance
      email: 'eddyverbruggen@gmail.com',
      password: 'firebase'
    }).then(
        function (result) {
          dialogs.alert({
            title: "Login OK",
            message: JSON.stringify(result),
            okButtonText: "Nice!"
          })
        },
        function (errorMessage) {
          dialogs.alert({
            title: "Login error",
            message: errorMessage,
            okButtonText: "OK, pity"
          })
        }
    )
  };

  DemoAppModel.prototype.doLogout = function () {
    firebase.logout().then(
        function (result) {
          dialogs.alert({
            title: "Logout OK",
            okButtonText: "OK, bye!"
          })
        },
        function (error) {
          dialogs.alert({
            title: "Logout error",
            message: error,
            okButtonText: "Hmmkay"
          })
        }
    )
  };

  DemoAppModel.prototype.doAddChildEventListenerForUsers = function () {
    var that = this;
    var onChildEvent = function(result) {
      that.set("path", '/users');
      that.set("type", result.type);
      that.set("key", result.key);
      that.set("value", JSON.stringify(result.value));
    };

    firebase.addChildEventListener(onChildEvent, "/users").then(
        function () {
          console.log("firebase.addChildEventListener added");
        },
        function (error) {
          console.log("firebase.addChildEventListener error: " + error);
        }
    )
  };

  DemoAppModel.prototype.doAddValueEventListenerForCompanies = function () {
    var that = this;
    var onValueEvent = function(result) {
      if (result.error) {
          dialogs.alert({
            title: "Listener error",
            message: result.error,
            okButtonText: "Darn!"
          })
      } else {
        that.set("path", '/companies');
        that.set("type", result.type);
        that.set("key", result.key);
        that.set("value", JSON.stringify(result.value));
      }
    };

    firebase.addValueEventListener(onValueEvent, "/companies").then(
        function () {
          console.log("firebase.addValueEventListener added");
        },
        function (error) {
          console.log("firebase.addValueEventListener error: " + error);
        }
    )
  };

  DemoAppModel.prototype.doUserStoreByPush = function () {
    firebase.push(
        '/users',
        {
          'first': 'Eddy',
          'last': 'Verbruggen',
          'birthYear': 1977,
          'isMale': true,
          'address': {
            'street': 'foostreet',
            'number': 123
          }
        }
    ).then(
        function () {
          console.log("firebase.push done");
        },
        function (error) {
          console.log("firebase.push error: " + error);
        }
    )
  };

  DemoAppModel.prototype.doStoreCompaniesBySetValue = function () {
    firebase.setValue(
        '/companies',

        // you can store a JSON object
        //{'foo':'bar'}

        // or even an array of JSON objects
        [
          {
            name: 'Telerik'
          },
          {
            name: 'Google'
          }
        ]
    ).then(
        function () {
          console.log("firebase.setValue done");
        },
        function (error) {
          console.log("firebase.setValue error: " + error);
        }
    )
  };

  DemoAppModel.prototype.doRemoveUsers = function () {
    firebase.remove("/users").then(
        function () {
          console.log("firebase.remove done");
        },
        function (error) {
          console.log("firebase.remove error: " + error);
        }
    )
  };

  DemoAppModel.prototype.doRemoveCompanies = function () {
    firebase.remove("/companies").then(
        function () {
          console.log("firebase.remove done");
        },
        function (error) {
          console.log("firebase.remove error: " + error);
        }
    )
  };

  return DemoAppModel;
})(observable.Observable);
exports.DemoAppModel = DemoAppModel;
exports.mainViewModel = new DemoAppModel();