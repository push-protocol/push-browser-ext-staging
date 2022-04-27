/*global chrome*/
import logo from "./logo.svg";
import React from "react";
import { useEffect, useState } from "react";
import "./App.css";
import {
  goBack,
  goTo,
  popToTop,
  Link,
  Router,
  getCurrent,
  getComponentStack,
} from "react-chrome-extension-router";

import Home from "./components/HomePage/HomePage";
import NotificationPage from "./components/NotificationPage/NotificationPage";
console.log = function () {};
function App() {
  const [registered, setRegistered] = useState(false);
  const [walletAddr, setWalletAddr] = useState(null);
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
      <Router>
        <Home />
      </Router>
    );
  else
    return (
      <Router>
        <NotificationPage />
      </Router>
    );
}

export default App;
