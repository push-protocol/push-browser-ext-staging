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
import NotifsContext from "./context/useNotifs";

console.log = function () {};
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
          <WelcomeBackPage />
        </Router>
      </NotifsContext.Provider>
    );
}

export default App;
