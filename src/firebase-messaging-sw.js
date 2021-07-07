/*global chrome*/

try {
  self.importScripts(
    './firebase/firebase-app.js',
    './firebase/direbase-messaging.js'
  );

  // Initialize the Firebase app in the service worker by passing the generated config
  var firebaseConfig = {
    apiKey: process.env.REACT_API_KEY,
    authDomain: process.env.REACT_AUTH_DOMAIN,
    databaseURL: process.env.REACT_DATABSE_URL,
    projectId: process.env.REACT_PROJECT_ID,
    storageBucket: process.env.REACT_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_ID,
    measurementId: process.env.REACT_MEASUREMENT_ID,
  };

  firebase.initializeApp(firebaseConfig);

  // // Retrieve firebase messaging
  const messaging = firebase.messaging();
  console.log(messaging);
  messaging.onBackgroundMessage(function (payload) {
    console.log(payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
  });
} catch (error) {
  console.error(error);
}
