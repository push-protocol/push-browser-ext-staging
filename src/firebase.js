/*global chrome*/
import firebase from 'firebase/app';
import 'firebase/messaging';

var firebaseConfig = {
  apiKey: 'AIzaSyClOk4qP0ttFW-BPnXy7WT920xfdXSbFu8',
  authDomain: 'epns-internal.firebaseapp.com',
  databaseURL: 'https://epns-internal.firebaseio.com',
  projectId: 'epns-internal',
  storageBucket: 'epns-internal.appspot.com',
  messagingSenderId: '755180533582',
  appId: '1:755180533582:web:752ff8db31905506b7d01f',
  measurementId: 'G-ZJH2T7R9S1',
};
// var firebaseConfig = {
//   apiKey: 'AIzaSyDNNJnxu01QCYduf_0Rxhwt_lJffyiEgKo',
//   authDomain: 'test-ac535.firebaseapp.com',
//   projectId: 'test-ac535',
//   storageBucket: 'test-ac535.appspot.com',
//   messagingSenderId: '532398581043',
//   appId: '1:532398581043:web:bafb46b35920e0644c0a46',
// };

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

export const getToken = () => {
  return new Promise(async (resolve, reject) => {
    const numOfAttempts = 3;
    let tries = 1;
    let attempting = true;
    console.log('inside fun');
    while (attempting) {
      console.log(attempting);
      console.log(tries);
      try {
        console.log('try');
        console.log(messaging);
        const currentToken = await messaging.getToken({
          vapidKey:
            'BFRmmAEEXOhk31FIsooph5CxlXKh6N0_NocUWHzvtpoUEvqQTwLXu6XtwkrH7ckyr2CvVz1ll-8q4oo6-ZqFJPY',
          // vapidKey:
          //   'BIIc0khmgruDmYF8mYTF1NwbI_a2yy9vCgSZGO-J8aLbMAwwuclXFDm0NJ9U8OemCqHee_yjMcThagkHmlC2e1g',
        });
        console.log(currentToken);

        if (currentToken) {
          resolve(currentToken);
          attempting = false;
        } else {
          console.error(
            'No registration token available. Request permission to generate one.'
          );
          reject(true);
          attempting = false;
        }
      } catch (err) {
        if (tries > numOfAttempts) {
          attempting = false;
          console.error('FCM | Request retries failed, Error: ', err);
        } else {
          console.log(
            'FCM | Request Failed... Retrying: ' + tries + ' / ' + numOfAttempts
          );
        }
      }

      tries = tries + 1;
    }
  });
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    messaging.onMessage((payload) => {
      resolve(payload);
    });
  });
