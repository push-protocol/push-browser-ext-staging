/*global chrome*/
import React from 'react'
import { useEffect, useState } from 'react'
// import './App.css'
import {
  goBack,
  goTo,
  popToTop,
  Link,
  Router,
  getCurrent,
  getComponentStack,
} from 'react-chrome-extension-router'

import Home from './components/HomePage/HomePage'
import NotificationPage from './components/NotificationPage/NotificationPage'
const App = () => {
  const [registered, setRegistered] = useState(false)
  const [walletAddr, setWalletAddr] =useState(null)
  useEffect(() => {
    console.log(chrome)
    chrome.storage.local.get(['epns'], function (result) {
      if (result.epns) {
        setWalletAddr(result.epns.wallet)
        setRegistered(true)
      }
    })
  })
  if (!registered)
    return (
      <Router>
        <Home />
      </Router>
    )
  else
    return (
      <Router>
        <NotificationPage />
      </Router>
    )
};

export default App;
