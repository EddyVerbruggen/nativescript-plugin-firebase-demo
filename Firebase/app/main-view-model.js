var observable = require("data/observable");
var dialogs = require("ui/dialogs");
var firebase = require("nativescript-plugin-firebase");
var DemoAppModel = (function (_super) {
  __extends(DemoAppModel, _super);
  function DemoAppModel() {
    _super.call(this);
  }

  DemoAppModel.prototype.doInit = function () {
    var that = this;
    firebase.init({
      persist: true, // optional, default false
      onAuthStateChanged: function(data) { // optional
        console.log((data.loggedIn ? "Logged in to firebase" : "Logged out from firebase") + " (init's onAuthStateChanged callback)");
        if (data.loggedIn) {
          that.set("useremail", data.user.email ? data.user.email : "N/A");
        }
      },
      onMessageReceivedCallback: function(message) {
        // TODO make sure this is the one that was tapped in the notification center (when more than 1 was pending)
        dialogs.alert({
          title: "Push message: " + message.title,
          message: JSON.stringify(message),
          okButtonText: "W00t!"
        });
      }
    }).then(
        function (result) {
          console.log("Firebase is ready");
        },
        function (error) {
          console.log("firebase.init error: " + error);
        }
    );
  };

  // This can be used instead of passing it in from 'init'.
  // This is not tied to a button, just showing what you'd need to do
  DemoAppModel.prototype.doAddOnMessageReceivedCallback = function () {
    firebase.addOnMessageReceivedCallback(
      function(message) {
        dialogs.alert({
          title: "Push message: " + message.title,
          message: JSON.stringify(message),
          okButtonText: "Sw33t"
        });
      });
  };

  DemoAppModel.prototype.doGetRemoteConfig = function () {
    firebase.getRemoteConfig({
      developerMode: false,
      cacheExpirationSeconds: 600, // 10 minutes, default is 12 hours
      properties: [{
        key: "holiday_promo_enabled",
        default: false
      },
      {
        key: "default_only_prop",
        default: 77
      },
      {
        key: "coupons_left",
        default: 100
      },
      {
        key: "origin",
        default: "client"
      },
      {
        key: "double_test",
        default: 9.99
      },
      {
        key: "int_test",
        default: 11
      }]
    }).then(
        function (result) {
          dialogs.alert({
            title: "Fetched at " + result.lastFetch + (result.throttled ? " (throttled)" : ""),
            message: JSON.stringify(result.properties),
            okButtonText: "Nice!"
          });
        },
        function (errorMessage) {
          dialogs.alert({
            title: "Remote Config error",
            message: errorMessage,
            okButtonText: "OK, thanks"
          });
        }
    );
  };

  DemoAppModel.prototype.doGetCurrentUser = function () {
    firebase.getCurrentUser().then(
        function (result) {
          dialogs.alert({
            title: "Current user",
            message: JSON.stringify(result),
            okButtonText: "Nice!"
          });
        },
        function (errorMessage) {
          dialogs.alert({
            title: "No current user",
            message: errorMessage,
            okButtonText: "OK, thanks"
          });
        }
    );
  };

  DemoAppModel.prototype.doLoginAnonymously = function () {
    firebase.login({
      type: firebase.LoginType.ANONYMOUS
    }).then(
        function (result) {
          dialogs.alert({
            title: "Login OK",
            message: JSON.stringify(result),
            okButtonText: "Nice!"
          });
        },
        function (errorMessage) {
          dialogs.alert({
            title: "Login error",
            message: errorMessage,
            okButtonText: "OK, pity"
          });
        }
    );
  };

  DemoAppModel.prototype.doCreateUser = function () {
    firebase.createUser({
      email: 'eddy@x-services.nl',
      password: 'firebase'
    }).then(
        function (result) {
          dialogs.alert({
            title: "User created",
            message: JSON.stringify(result),
            okButtonText: "Nice!"
          });
        },
        function (errorMessage) {
          dialogs.alert({
            title: "No user created",
            message: errorMessage,
            okButtonText: "OK, got it"
          });
        }
    );
  };

  DemoAppModel.prototype.doDeleteUser = function () {
    firebase.deleteUser().then(
        function () {
          dialogs.alert({
            title: "User deleted",
            okButtonText: "Nice!"
          });
        },
        function (errorMessage) {
          dialogs.alert({
            title: "User not deleted",
            message: errorMessage,
            okButtonText: "OK, got it"
          });
        }
    );
  };

  DemoAppModel.prototype.doLoginByPassword = function () {
    firebase.login({
      // note that you need to enable email-password login in your firebase instance
      type: firebase.LoginType.PASSWORD,
      // note that these credentials have been configured in our firebase instance
      email: 'eddy@x-services.nl',
      password: 'firebase'
    }).then(
        function (result) {
          dialogs.alert({
            title: "Login OK",
            message: JSON.stringify(result),
            okButtonText: "Nice!"
          });
        },
        function (errorMessage) {
          dialogs.alert({
            title: "Login error",
            message: errorMessage,
            okButtonText: "OK, pity"
          });
        }
    );
  };

  DemoAppModel.prototype.doLoginByFacebook = function () {
    firebase.login({
      // note that you need to enable Facebook auth in your firebase instance
      type: firebase.LoginType.FACEBOOK
    }).then(
        function (result) {
          dialogs.alert({
            title: "Login OK",
            message: JSON.stringify(result),
            okButtonText: "Nice!"
          });
        },
        function (errorMessage) {
          dialogs.alert({
            title: "Login error",
            message: errorMessage,
            okButtonText: "OK, pity"
          });
        }
    );
  };

  DemoAppModel.prototype.doLoginByGoogle = function () {
    firebase.login({
      // note that you need to enable Google auth in your firebase instance
      type: firebase.LoginType.GOOGLE
    }).then(
        function (result) {
          dialogs.alert({
            title: "Login OK",
            message: JSON.stringify(result),
            okButtonText: "Nice!"
          });
        },
        function (errorMessage) {
          dialogs.alert({
            title: "Login error",
            message: errorMessage,
            okButtonText: "OK, pity"
          });
        }
    );
  };

  DemoAppModel.prototype.doResetPassword = function () {
    firebase.resetPassword({
      email: 'eddy@x-services.nl'
    }).then(
        function (result) {
          dialogs.alert({
            title: "Password reset. Check your email.",
            okButtonText: "OK, nice!"
          });
        },
        function (error) {
          dialogs.alert({
            title: "Password reset error",
            message: error,
            okButtonText: "Hmmkay :("
          });
        }
    );
  };

  DemoAppModel.prototype.doLogout = function () {
    firebase.logout().then(
        function (result) {
          dialogs.alert({
            title: "Logout OK",
            okButtonText: "OK, bye!"
          });
        },
        function (error) {
          dialogs.alert({
            title: "Logout error",
            message: error,
            okButtonText: "Hmmkay"
          });
        }
    );
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
    );
  };

  DemoAppModel.prototype.doAddValueEventListenerForCompanies = function () {
    var path = "/companies";
    var that = this;
    var onValueEvent = function(result) {
      if (result.error) {
          dialogs.alert({
            title: "Listener error",
            message: result.error,
            okButtonText: "Darn!"
          });
      } else {
        that.set("path", path);
        that.set("type", result.type);
        that.set("key", result.key);
        that.set("value", JSON.stringify(result.value));
      }
    };

   firebase.addValueEventListener(onValueEvent, path).then(
        function () {
          console.log("firebase.addValueEventListener added");
        },
        function (error) {
          console.log("firebase.addValueEventListener error: " + error);
        }
    );
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
        function (result) {
          console.log("firebase.push done, created key: " + result.key);
        },
        function (error) {
          console.log("firebase.push error: " + error);
        }
    );
  };

  DemoAppModel.prototype.doStoreCompaniesBySetValue = function () {
    firebase.setValue(
        '/companies',

        // you can store a JSON object
        //{'foo':'bar'}

        // or even an array of JSON objects
        [
          {
            name: 'Telerik',
            country: 'Bulgaria'
          },
          {
            name: 'Google',
            country: 'USA'
          }
        ]
    ).then(
        function () {
          console.log("firebase.setValue done");
        },
        function (error) {
          console.log("firebase.setValue error: " + error);
        }
    );
  };

  DemoAppModel.prototype.doRemoveUsers = function () {
    firebase.remove("/users").then(
        function () {
          console.log("firebase.remove done");
        },
        function (error) {
          console.log("firebase.remove error: " + error);
        }
    );
  };

  DemoAppModel.prototype.doRemoveCompanies = function () {
    firebase.remove("/companies").then(
        function () {
          console.log("firebase.remove done");
        },
        function (error) {
          console.log("firebase.remove error: " + error);
        }
    );
  };

  DemoAppModel.prototype.doQueryBulgarianCompanies = function () {
    var path = "/companies";
    var that = this;
    var onValueEvent = function(result) {
      // note that the query returns 1 match at a time,
      // in the order specified in the query
      console.log("Query result: " + JSON.stringify(result));
      if (result.error) {
          dialogs.alert({
            title: "Listener error",
            message: result.error,
            okButtonText: "Darn!"
          });
      } else {
        that.set("path", path);
        that.set("type", result.type);
        that.set("key", result.key);
        that.set("value", JSON.stringify(result.value));
      }
    };
    firebase.query(
      onValueEvent,
      path,
      {
        // order by company.country
        orderBy: {
          type: firebase.QueryOrderByType.CHILD,
          value: 'country' // mandatory when type is 'child'
        },
        // but only companies named 'Telerik'
        // (this range relates to the orderBy clause)
        range: {
          type: firebase.QueryRangeType.EQUAL_TO,
          value: 'Bulgaria'
        },
        // only the first 2 matches (not that there's only 1 in this case anyway)
        limit: {
          type: firebase.QueryLimitType.LAST,
          value: 2
        }
      }
    ).then(
      function () {
        console.log("firebase.doQueryBulgarianCompanies done; added a listener");
      },
      function (errorMessage) {
        dialogs.alert({
          title: "Login error",
          message: errorMessage,
          okButtonText: "OK, pity"
        });
      }
    );
  };

  DemoAppModel.prototype.doQueryUsers = function () {
    var path = "/users";
    var that = this;
    var onValueEvent = function(result) {
      // note that the query returns 1 match at a time,
      // in the order specified in the query
      console.log("Query result: " + JSON.stringify(result));
      if (result.error) {
          dialogs.alert({
            title: "Listener error",
            message: result.error,
            okButtonText: "Darn!!"
          });
      } else {
        that.set("path", path);
        that.set("type", result.type);
        that.set("key", result.key);
        that.set("value", JSON.stringify(result.value));
      }
    };
    firebase.query(
      onValueEvent,
      path,
      {
        singleEvent: true,
        orderBy: {
          type: firebase.QueryOrderByType.KEY
        }
      }
    ).then(
      function () {
        console.log("firebase.doQueryUsers done; added a listener");
      },
      function (errorMessage) {
        dialogs.alert({
          title: "Login error",
          message: errorMessage,
          okButtonText: "OK, pity!"
        });
      }
    );
  };

  return DemoAppModel;
})(observable.Observable);
exports.DemoAppModel = DemoAppModel;
exports.mainViewModel = new DemoAppModel();