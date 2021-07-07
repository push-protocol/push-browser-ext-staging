/*global chrome*/
import firebase from 'firebase/app';
import 'firebase/messaging';

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
          vapidKey: process.env.REACT_VAPID_KEY,
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
