# nativescript-firebase demo app

Demo app for the {N} [Firebase plugin](https://www.npmjs.com/package/nativescript-firebase)

If you want to see this app in action first, check this 41 second demo:
[![YouTube demo, 41 sec](screenshots/yt-thumb.png)](https://youtu.be/7zYU5e0Djkw "YouTube demo, 41 sec")


## Installation

This app is built with the [NativeScript CLI](https://github.com/NativeScript/nativescript-cli).
Once you have the [CLI installed](https://github.com/NativeScript/nativescript-cli#installation), start by cloning the repo:

```
$ git clone https://github.com/EddyVerbruggen/nativescript-firebase-demo
$ cd nativescript-firebase-demo
```

Next, install the app's iOS and Android runtimes, as well as the app's npm dependencies:

```
$ tns install
```

From there you can use the `run` command to run the demo app on iOS:

```
$ tns run ios --emulator
$ tns emulate ios --device iPhone-6s
```

.. or on Android

```
$ tns run android --emulator
$ tns emulate android --geny "Nexus 6_23"
```