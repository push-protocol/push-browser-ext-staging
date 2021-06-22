/*global chrome*/
import firebase from 'firebase/app'
import 'firebase/messaging'
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
//   apiKey: "AIzaSyDNNJnxu01QCYduf_0Rxhwt_lJffyiEgKo",
//   authDomain: "test-ac535.firebaseapp.com",
//   projectId: "test-ac535",
//   storageBucket: "test-ac535.appspot.com",
//   messagingSenderId: "532398581043",
//   appId: "1:532398581043:web:bafb46b35920e0644c0a46"
// };

firebase.initializeApp(firebaseConfig)
const messaging = firebase.messaging()

export const getToken = () => {
  return messaging
    .getToken({
      vapidKey:
      //epns
        'BFRmmAEEXOhk31FIsooph5CxlXKh6N0_NocUWHzvtpoUEvqQTwLXu6XtwkrH7ckyr2CvVz1ll-8q4oo6-ZqFJPY',
        //my
        // "BGJ_k4q_AdVe96XvPNUn7ERbNA4n9oq6B6x8hu670XZEKXCqc_VpEWUsbwfuZXjfiA55cy6geN_dekwxkSxIsGA",
    })
    .then((currentToken) => {
      if (currentToken) {
        console.log('current token for client: ', currentToken)
        return currentToken
        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        console.log(
          'No registration token available. Request permission to generate one.',
        )
        // setTokenFound(false)
        // shows on the UI that permission is required
      }
    })
    .catch((err) => {
      console.log('An error occurred while retrieving token. ', err)
      // catch error while creating client token
    })
}

export const onMessageListener = () =>
  new Promise((resolve) => {
    messaging.onMessage((payload) => {
      resolve(payload)
    })
  })
