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

import Home from './pages/HomePage/HomePage'
import NotificationPage from './pages/NotificationPage/NotificationPage'
const App = () => {
  const [registered, setRegistered] = useState(false)
  const [walletAddr, setWalletAddr] =useState(null)
  const [epnsObject, setEpnsObject] =useState(null)
  useEffect(() => {
    
    chrome.storage.local.get(['epns'], function (result) {
      console.log(result)
      if (result.epns) {
        setWalletAddr(result.epns.wallet)
        setEpnsObject(result.epns)
        setRegistered(true)
      }
    })
  },[])
  if (!registered)
    return (
      <Router>
        <Home />
      </Router>
    )
  else
    return (
      <Router>
        <NotificationPage component={walletAddr,epnsObject}/>
      </Router>
    )
};

export default App;
