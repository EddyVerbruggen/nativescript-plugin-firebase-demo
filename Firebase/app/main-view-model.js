var observable = require("data/observable");
var dialogs = require("ui/dialogs");
var fs = require("file-system");
var firebase = require("nativescript-plugin-firebase");
var DemoAppModel = (function (_super) {
  __extends(DemoAppModel, _super);
  function DemoAppModel() {
    _super.call(this);
  }

  DemoAppModel.prototype.doInit = function () {
    var that = this;
    firebase.init({
      storageBucket: 'gs://n-plugin-test.appspot.com',
      persist: true, // optional, default false
      onAuthStateChanged: function(data) { // optional
        console.log((data.loggedIn ? "Logged in to firebase" : "Logged out from firebase") + " (init's onAuthStateChanged callback)");
        if (data.loggedIn) {
          that.set("useremail", data.user.email ? data.user.email : "N/A");
        }
      },
      onPushTokenReceivedCallback: function(token) {
        // you can use this token to send to your own backend server,
        // so you can send notifications to this specific device
        console.log("Firebase plugin received a push token: " + token);
      },
      onMessageReceivedCallback: function(message) {
        dialogs.alert({
          title: "Push message: " + (message.title !== undefined ? message.title : ""),
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

  DemoAppModel.prototype.doLogAnayticsEvent = function () {
    firebase.analytics.logEvent({
      // see https://firebase.google.com/docs/reference/android/com/google/firebase/analytics/FirebaseAnalytics.Event.html
      key: "add_to_cart",
      parameters: [{ // optional
        key: "item_id",
        value: "p7654"
      },
      {
        key: "item_name",
        value: "abc"
      }]
    }).then(
        function () {
          dialogs.alert({
            title: "Analytics event pushed",
            okButtonText: "Awesome :)"
          });
        },
        function (errorMessage) {
          dialogs.alert({
            title: "Analytics error",
            message: errorMessage,
            okButtonText: "Ehh, OK"
          });
        }
    );
  };

  DemoAppModel.prototype.doSetAnalyticsUserProperty = function () {
    firebase.analytics.setUserProperty({
      key: "origin", // note that this needs to be preregistered, see https://support.google.com/firebase/answer/6317519?hl=en&ref_topic=6317489#create-property
      value: "demoapp"
    }).then(
        function () {
          dialogs.alert({
            title: "Analytics user property set",
            okButtonText: "Great :P"
          });
        },
        function (errorMessage) {
          dialogs.alert({
            title: "Analytics error",
            message: errorMessage,
            okButtonText: "Ehhmmm, OK"
          });
        }
    );
  };

  // This can be used instead of passing it in from 'init'.
  // This is not tied to a button, just showing what you'd need to do.
  DemoAppModel.prototype.doAddOnMessageReceivedCallback = function () {
    firebase.addOnMessageReceivedCallback(
      function(message) {
        dialogs.alert({
          title: "Push message: " + (message.title !== undefined ? message.title : ""),
          message: JSON.stringify(message),
          okButtonText: "Sw33t"
        });
      }
    );
  };

  // This can be used instead of passing it in from 'init'.
  // This is not tied to a button, just showing what you'd need to do.
  DemoAppModel.prototype.doAddOnPushTokenReceivedCallback = function () {
    firebase.addOnPushTokenReceivedCallback(
      function(token) {
        // you can use this token to send to your own backend server,
        // so you can send notifications to this specific device
        console.log("Firebase plugin received a push token: " + token);
      }
    );
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
    var that = this;
    firebase.logout().then(
        function (result) {
          that.set("useremail", null);
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

  DemoAppModel.prototype.doKeepUsersInSyncOn = function () {
    firebase.keepInSync("/users", true).then(
        function () {
          console.log("firebase.keepInSync ON");
        },
        function (error) {
          console.log("firebase.keepInSync error: " + error);
        }
    );
  };

  DemoAppModel.prototype.doKeepUsersInSyncOff = function () {
    firebase.keepInSync("/users", false).then(
        function () {
          console.log("firebase.keepInSync OFF");
        },
        function (error) {
          console.log("firebase.keepInSync error: " + error);
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
        function (result) {
          that._userListenerWrapper = result;
          console.log("firebase.addChildEventListener added");
        },
        function (error) {
          console.log("firebase.addChildEventListener error: " + error);
        }
    );
  };

  DemoAppModel.prototype.doRemoveChildEventListenerForUsers = function () {
    if (!this._userListenerWrapper) {
      return;
    }
    firebase.removeEventListeners(this._userListenerWrapper.listeners, this._userListenerWrapper.path).then(
      function () {
        console.log("firebase.doRemoveChildEventListenerForUsers success");
        dialogs.alert({
          title: "Listener(s) removed",
          okButtonText: "OK"
        });
      },
      function (error) {
        console.log("firebase.removeEventListeners error: " + error);
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
      function (result) {
        that._companiesListenerWrapper = result;
        console.log("firebase.addValueEventListener added");
      },
      function (error) {
        console.log("firebase.addValueEventListener error: " + error);
      }
    );
  };

  DemoAppModel.prototype.doRemoveValueEventListenerForCompanies = function () {
    if (!this._companiesListenerWrapper) {
      return;
    }
    firebase.removeEventListener(this._companiesListenerWrapper.listeners[0], this._companiesListenerWrapper.path).then(
      function () {
        console.log("firebase.doRemoveValueEventListenerForCompanies success");
        dialogs.alert({
          title: "Listener removed",
          okButtonText: "OK"
        });
      },
      function (error) {
        console.log("firebase.removeEventListener error.");
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
            country: 'Bulgaria',
            since: 2000
          },
          {
            name: 'Google',
            country: 'USA',
            since: 1900
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
          value: 'since' // mandatory when type is 'child'
        },
        // but only companies 'since' a certain year (Telerik's value is 2000, which is imaginary btw)
        // .. we're using 'ranges', but you could also use 'range' with type firebase.QueryRangeType.EQUAL_TO and value 2000
        ranges: [
          {
            type: firebase.QueryRangeType.START_AT,
            value: 1999
          },
          {
            type: firebase.QueryRangeType.END_AT,
            value: 2000
          }
        ],
        // only the first 2 matches (not that there's only 1 in this case anyway)
        limit: {
          type: firebase.QueryLimitType.LAST,
          value: 2
        }
      }
    ).then(
      function (result) {
        console.log("This 'result' should be undefined since singleEvent is not set to true: " + result);
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
      function (result) {
        console.log("This 'result' should be available since singleEvent is true: " + JSON.stringify(result));
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

  DemoAppModel.prototype.doUploadFile = function () {
    // let's first create a File object using the tns file module
    var appPath = fs.knownFolders.currentApp().path;
    var logoPath = appPath + "/res/telerik-logo.png";

    firebase.uploadFile({
      remoteFullPath: 'uploads/images/telerik-logo-uploaded.png',
      // localFile: fs.File.fromPath(logoPath) // use this (a file-system module File object)
      localFullPath: logoPath, // or this, a full file path
      onProgress: function(status) {
        console.log("Uploaded fraction: " + status.fractionCompleted + " (" + status.percentageCompleted + "%)");
      }
    }).then(
        function (uploadedFile) {
          dialogs.alert({
            title: "File upload successful!",
            message: JSON.stringify(uploadedFile),
            okButtonText: "Cool!"
          });
        },
        function (error) {
          console.log("firebase.doUploadFile error: " + error);
        }
    );
  };

  DemoAppModel.prototype.doDownloadFile = function () {
    // let's first determine where we'll create the file using the 'file-system' module
    var documents = fs.knownFolders.documents();
    var logoPath = documents.path + "/telerik-logo-downloaded.png";

    // this will create or overwrite a local file in the app's documents folder
    var localLogoFile = documents.getFile("telerik-logo-downloaded.png");

    firebase.downloadFile({
      remoteFullPath: 'uploads/images/telerik-logo-uploaded.png',
      // localFile: localLogoFile // use this (a file-system module File object)
      localFullPath: logoPath // or this, a full file path
    }).then(
        function () {
          dialogs.alert({
            title: "File download successful!",
            message: "The file has been downloaded to the requested location",
            okButtonText: "OK"
          });
        },
        function (error) {
          dialogs.alert({
            title: "File download error",
            message: error,
            okButtonText: "Mmkay!"
          });
        }
    );
  };

  DemoAppModel.prototype.doGetDownloadUrl = function () {
    firebase.getDownloadUrl({
      remoteFullPath: 'uploads/images/telerik-logo-uploaded.png'
    }).then(
        function (theUrl) {
          dialogs.alert({
            title: "File download URL determined",
            message: "You can download the file at: " + theUrl,
            okButtonText: "OK OK"
          });
        },
        function (error) {
          dialogs.alert({
            title: "File download URL error",
            message: error,
            okButtonText: "Mmkay"
          });
        }
    );
  };

  DemoAppModel.prototype.doDeleteFile = function () {
    firebase.deleteFile({
      remoteFullPath: 'uploads/images/telerik-logo-uploaded.png'
    }).then(
        function (theUrl) {
          dialogs.alert({
            title: "File deleted",
            message: "Enjoy your day!",
            okButtonText: "Thanks ;)"
          });
        },
        function (error) {
          dialogs.alert({
            title: "File deletion error",
            message: error,
            okButtonText: "OK"
          });
        }
    );
  };

  return DemoAppModel;
})(observable.Observable);
exports.DemoAppModel = DemoAppModel;
exports.mainViewModel = new DemoAppModel();