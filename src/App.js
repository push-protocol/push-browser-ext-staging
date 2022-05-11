/*global chrome*/
import React from "react";
import { useEffect, useState } from "react";
import "./App.css";
import {
  Router,
  getCurrent,
  getComponentStack,
} from "react-chrome-extension-router";
import Home from "./components/HomePage/HomePage";
import WelcomeBackPage from "./components/WelcomeBackPage/WelcomeBackPage";

console.log = function () {};
function App() {
  const [registered, setRegistered] = useState(false);
  const [walletAddr, setWalletAddr] = useState(null);
  useEffect(() => {
    const { component, props } = getCurrent();
    const components = getComponentStack();
    // chrome.storage.local.get(["epns"], function (result) {
    //   if (result.epns) {
    //     setWalletAddr(result.epns.wallet);
    //     setRegistered(true);
    //   }
    // });
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
        <WelcomeBackPage />
      </Router>
    );
}

export default App;
