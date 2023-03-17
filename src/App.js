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
import RefreshContext from "./context/useRefresh";

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

  return browserName;
}

export function isBrave() {
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
  const [notifs, setNotifs] = useState({
    inbox: [],
    spam: [],
  });

  const [refresh, setRefresh] = useState(false);
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

  if (!registered)
    return (
      <NotifsContext.Provider value={[notifs, setNotifs]}>
        <RefreshContext.Provider value={[refresh, setRefresh]}>
          <Router>
            <Home />
          </Router>
        </RefreshContext.Provider>
      </NotifsContext.Provider>
    );
  else
    return (
      <NotifsContext.Provider value={[notifs, setNotifs]}>
        <RefreshContext.Provider value={[refresh, setRefresh]}>
          <Router>
            <NotificationPage wallet={walletAddr} />
          </Router>
        </RefreshContext.Provider>
      </NotifsContext.Provider>
    );
}

export default App;
