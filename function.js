// Pull in Firebase and GCloud deps
var firebase = require('firebase');
var gcloud = require('gcloud')({
  projectId: process.env.GCP_PROJECT,
});

// Initialize Firebase App with service account
// TODO: get values from https://firebase.google.com/docs/server/setup#initialize_the_sdk
firebase.initializeApp({
  serviceAccount: {
    "project_id": "<your-project-id>",
    "private_key": "<your-private-key>",
    "client_email": "<your-service-account-email>"
  },
  databaseURL: "<your-database-url>"
});

// Get GCS, Cloud Vision API
var gcs = gcloud.storage(),
    vision = gcloud.vision();

function visiondetect(context, data) {
  if (data !== undefined) {
    // Create Firebase Storage public URL
    var urlString = "https://firebasestorage.googleapis.com/v0/b/" + data.bucket + "/o/" + data.name.replace(/\//, '%2F') + "?alt=media&token=" + data.metadata.firebaseStorageDownloadTokens;

    // Create GCS File from the data
    var file = gcs.bucket(data.bucket).file(data.name);

    // Use GCS File in the Cloud Vision API
    vision.detectLabels(file, {
      verbose: true
    }, function(err, labels, apiResponse) {
      if (err) {
        context.failure("Vision detection failed")
      } else {
        var ref = firebase.database().ref("images");
        ref.push({
          "url": urlString,
          "name": data.name,
          "labels": labels
        }, function(error) {
          if (error) {
            context.failure("Firebase write failed")
          } else {
            context.success(labels, apiResponse);
          }
        });
      }
    });
  } else {
    context.failure('No data payload defined!');
  }
}

module.exports = {
  visiondetect: visiondetect
};
