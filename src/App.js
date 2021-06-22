/*global chrome*/
import logo from './logo.svg'
import React from 'react'
import { useEffect, useState } from 'react'
import './App.css'
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

function App() {
  const [registered, setRegistered] = useState(false)
  useEffect(() => {
    const { component, props } = getCurrent()
    console.log(
      component
        ? `There is a component on the stack! ${component} with ${props}`
        : `The current stack is empty so Router's direct children will be rendered`,
    )
    const components = getComponentStack()
    console.log(`The stack has ${components.length} components on the stack`)
    chrome.storage.local.get(['epns'], function (result) {
      if (result.epns) {
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
}

export default App
