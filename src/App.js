/*global chrome*/
import React from "react";
import { useEffect, useState } from "react";
import "./App.css";
import {
  Router,
  getCurrent,
  getComponentStack,
} from "react-chrome-extension-router";
import NotifsContext from "./context/useNotifs";
import NotificationPage from "./pages/NotificationPage/NotificationPage";
import Home from "./pages/HomePage/HomePage";

console.log = function () {};

function fnBrowserDetect() {
  let userAgent = navigator.userAgent;
  let browserName;

  if (userAgent.match(/chrome|chromium|crios/i)) {
    browserName = "chrome";
  } else if (userAgent.match(/firefox|fxios/i)) {
    browserName = "firefox";
  } else if (userAgent.match(/safari/i)) {
    browserName = "safari";
  } else if (userAgent.match(/opr\//i)) {
    browserName = "opera";
  } else if (userAgent.match(/edg/i)) {
    browserName = "edge";
  } else {
    browserName = "No browser detection";
  }

  chrome.extension.getBackgroundPage().console.log(browserName);

  // document.querySelector("h1").innerText =
  //   "You are using " + browserName + " browser";
}

function isBrave() {
  if (window.navigator.brave != undefined) {
    if (window.navigator.brave.isBrave.name == "isBrave") {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

function App() {
  const [registered, setRegistered] = useState(false);
  const [walletAddr, setWalletAddr] = useState(null);
  const [notifs, setNotifs] = useState([]);
  useEffect(() => {
    const { component, props } = getCurrent();
    const components = getComponentStack();
    chrome.storage.local.get(["epns"], function (result) {
      if (result.epns) {
        setWalletAddr(result.epns.wallet);
        setRegistered(true);
      }
    });
  });
  fnBrowserDetect();
  isBrave();
  chrome.extension.getBackgroundPage().console.log(isBrave());
  if (!registered)
    return (
      <NotifsContext.Provider value={[notifs, setNotifs]}>
        <Router>
          <Home />
        </Router>
      </NotifsContext.Provider>
    );
  else
    return (
      <NotifsContext.Provider value={[notifs, setNotifs]}>
        <Router>
          <NotificationPage />
        </Router>
      </NotifsContext.Provider>
    );
}

export default App;
