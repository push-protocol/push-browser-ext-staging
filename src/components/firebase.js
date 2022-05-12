/*global chrome*/
import firebase from "firebase/app";

import * as dotenv from "dotenv";
import "firebase/messaging";
dotenv.config();

var firebaseConfig = {
  apiKey: "AIzaSyClOk4qP0ttFW-BPnXy7WT920xfdXSbFu8",
  authDomain: "epns-internal.firebaseapp.com",
  databaseURL: "https://epns-internal.firebaseio.com",
  projectId: "epns-internal",
  storageBucket: "epns-internal.appspot.com",
  messagingSenderId: "755180533582",
  appId: "1:755180533582:web:752ff8db31905506b7d01f",
  measurementId: "G-ZJH2T7R9S1",
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

export const getToken = () => {
  return new Promise(async (resolve, reject) => {
    const numOfAttempts = 3;
    let tries = 1;
    let attempting = true;

    while (attempting) {
      try {
        const currentToken = await messaging.getToken({
          vapidKey:
            "BFRmmAEEXOhk31FIsooph5CxlXKh6N0_NocUWHzvtpoUEvqQTwLXu6XtwkrH7ckyr2CvVz1ll-8q4oo6-ZqFJPY",
        });

        if (currentToken) {
          resolve(currentToken);
          attempting = false;
        } else {
          console.error(
            "No registration token available. Request permission to generate one."
          );
          reject(true);
          attempting = false;
        }
      } catch (err) {
        if (tries > numOfAttempts) {
          attempting = false;
          console.error("FCM | Request retries failed, Error: ", err);
        } else {
          console.log(
            "FCM | Request Failed... Retrying: " + tries + " / " + numOfAttempts
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
