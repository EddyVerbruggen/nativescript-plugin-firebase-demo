# nativescript-plugin-firebase demo app

> DEPRECATED: The demo app for the NativeScript Firebase plugin is now inlined in the [plugin repo](https://github.com/EddyVerbruggen/nativescript-plugin-firebase). 🚀

If you want to see this app in action first, check this 41 second demo:
[![YouTube demo, 41 sec](screenshots/yt-thumb.png)](https://youtu.be/7zYU5e0Djkw "YouTube demo, 41 sec")


## Installation

This app is built with the [NativeScript CLI](https://github.com/NativeScript/nativescript-cli).
Once you have the CLI [installed](https://github.com/NativeScript/nativescript-cli#installation), start by cloning this repo:

```
$ git clone https://github.com/EddyVerbruggen/nativescript-plugin-firebase-demo
$ cd nativescript-plugin-firebase-demo
$ cd Firebase
```

Next, install the app's iOS and Android runtimes, as well as the app's npm dependencies:

```
$ tns install
```

#### Now take these steps to avoid build errors on Android

- Copy `app/App_Resources/Android/google-services.json` to `platforms/android/google-services.json` or you'll run into the error "FirebaseApp with name [DEFAULT] doesn't exist."
- Open `platforms/android/build.gradle` and [do these things](https://github.com/EddyVerbruggen/nativescript-plugin-firebase#open-platformsandroidbuildgradle).

#### Want to use Remote Config or Cloud Messaging?
Open `node_modules/nativescript-plugin-firebase/platforms/android/include.gradle` and
`node_modules/nativescript-plugin-firebase/platforms/ios/Podfile` and uncomment the relevant lines. 

## Running
Now you can use the `run` command to run the demo app on iOS:

```
$ tns run ios --emulator
$ tns emulate ios --device iPhone-6s
```

.. or on Android

```
$ tns run android --emulator
$ tns emulate android --geny "Nexus 6_23"
```
