# Flaming Specs
Flaming Specs combines [Firebase Storage](https://firebase.google.com/storage)
with the [Google Cloud Vision API](https://cloud.google.com/vision) through
[Google Cloud Functions](https://cloud.google.com/functions), all in ~100 LoC!

This is a demo for a presentation given at
[Serverless Conf](http://serverlessconf.io/) on May 27th, 2016
by [Frank van Puffelen](https://github.com/puf) and myself. Slides are available
here.

You can view the public demo [here](http://fir-cloudvisiontest.firebaseapp.com).

# Setup

## Create a Firebase Account

Create an account through the [Firebase Console](https://console.firebase.com),
and upgrade to Blaze plan. This will allow you to access Cloud resources,
like Cloud Functions and the Cloud Vision API.

## Modify the code

There are two `TODO:`s where you must add your app keys into JSON configuration,
one in `index.html` and one in `function.js`. This information comes from the
[Firebase Console](https://console.firebase.com) for your prroject.

## Host the website

Install the Firebase CLI: `npm install -g firebase-tools`, run `firebase init`,
and move `index.html` into your app's public folder. From there, you can either
run `firebase serve` to locally test your app, or `firebase deploy` to host
your app on the public internet.

## Deploy your function

[Sign up for the GCF Alpha](https://docs.google.com/a/google.com/forms/d/1WQNWPK3xdLnw4oXPT_AIVR9-gd6DLo5ZIucyxzSQ5fQ/viewform), and when accepted, follow the instructions to
deploy a function (either via the console or via the CLI). The function called
will be named `visiondetect`, since that's what's exported from `function.js`.

# Contact
Reach out to me [@asciimike](https://www.twitter.com/asciimike) or
[mcdonald@firebase.com](mailto:mcdonald@firebase.com) to let me know what you
think!
