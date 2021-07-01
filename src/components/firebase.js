/*global chrome*/
import firebase from 'firebase/app'
import 'firebase/messaging'

//epns
var firebaseConfig = {
  apiKey: 'AIzaSyClOk4qP0ttFW-BPnXy7WT920xfdXSbFu8',
  authDomain: 'epns-internal.firebaseapp.com',
  databaseURL: 'https://epns-internal.firebaseio.com',
  projectId: 'epns-internal',
  storageBucket: 'epns-internal.appspot.com',
  messagingSenderId: '755180533582',
  appId: '1:755180533582:web:752ff8db31905506b7d01f',
  measurementId: 'G-ZJH2T7R9S1',
}

firebase.initializeApp(firebaseConfig)
const messaging = firebase.messaging()

export const getToken = () => {
  return messaging
    .getToken({
      vapidKey:
        'BFRmmAEEXOhk31FIsooph5CxlXKh6N0_NocUWHzvtpoUEvqQTwLXu6XtwkrH7ckyr2CvVz1ll-8q4oo6-ZqFJPY',
    })
    .then((currentToken) => {
      if (currentToken) {
        return currentToken
        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        console.error(
          'No registration token available. Request permission to generate one.',
        )
        // setTokenFound(false)
        // shows on the UI that permission is required
      }
    })
    .catch((err) => {
      console.error('An error occurred while retrieving token. ', err)
      // catch error while creating client token
    })
}

export const onMessageListener = () =>
  new Promise((resolve) => {
    messaging.onMessage((payload) => {
      resolve(payload)
    })
  })
