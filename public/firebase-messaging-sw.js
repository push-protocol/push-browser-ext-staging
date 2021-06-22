/*global chrome*/

importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js')

// Initialize the Firebase app in the service worker by passing the generated config

//epns
var firebaseConfig = {
  apiKey: "AIzaSyClOk4qP0ttFW-BPnXy7WT920xfdXSbFu8",
  authDomain: "epns-internal.firebaseapp.com",
  databaseURL: "https://epns-internal.firebaseio.com",
  projectId: "epns-internal",
  storageBucket: "epns-internal.appspot.com",
  messagingSenderId: "755180533582",
  appId: "1:755180533582:web:752ff8db31905506b7d01f",
  measurementId: "G-ZJH2T7R9S1"
};

//my
// var firebaseConfig = {
//   apiKey: 'AIzaSyDNNJnxu01QCYduf_0Rxhwt_lJffyiEgKo',
//   authDomain: 'test-ac535.firebaseapp.com',
//   projectId: 'test-ac535',
//   storageBucket: 'test-ac535.appspot.com',
//   messagingSenderId: '532398581043',
//   appId: '1:532398581043:web:bafb46b35920e0644c0a46',
// }
firebase.initializeApp(firebaseConfig)

// Retrieve firebase messaging
const messaging = firebase.messaging()

messaging.onBackgroundMessage(function (payload) {
  console.log(self)
  console.log('Received background message ', payload)
  const channel = new BroadcastChannel('sw-messages')
  channel.postMessage({ data: payload })

  const notificationTitle = payload.notification.title
  const notificationOptions = {
    body: payload.notification.body,
  }

  self.registration.showNotification(notificationTitle, notificationOptions)
})

// if ('serviceWorker' in navigator) {
//     navigator.serviceWorker.register('../firebase-messaging-sw.js')
//       .then(function(registration) {
//         console.log('Registration successful, scope is:', registration.scope);
//       }).catch(function(err) {
//         console.log('Service worker registration failed, error:', err);
//       });
//     }
