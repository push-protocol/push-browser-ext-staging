import React from 'react'
import firebase from 'firebase'
import { useEffect, useState } from 'react'
import {
  goBack,
  goTo,
  popToTop,
  Link,
  Router,
  getCurrent,
  getComponentStack,
} from 'react-chrome-extension-router'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import AddressPage from '../AddressPage/AddressPage'
import { getToken } from '../firebase'
import './HomePage.css'
import Info from './Info'
import Circle1 from '../Circle/Circle1'
import Circle2 from '../Circle/Circle2'
import Circle3 from '../Circle/Circle3'

export default function Home() {
  const [token, setToken] = useState('')
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    getToken().then((res) => {
      setToken(res)
    })
  }, [])

  const toggle = () => {
    setSeen(!seen)
  }
  return (
    <div style={{ height: '600px', width: '360px' }}>
      <div>
        <Circle1 side="left" />
        <Circle2 side="left" />
        <Circle3 side="left" />
        <div id="epns-logo"></div>
      </div>
      <div>
        <div id="welcome">
          <b>Welcome!</b>
        </div>

        <spn id="welcome-text">Welcome to</spn>
        <span id="description">
          <span
            onMouseEnter={() => toggle()}
            onMouseLeave={() => toggle()}
            style={{ padding: '4px' }}
          >
            <span id="ethereum-text">Ethereum </span>
            <span id="push-text">Push </span>
            <span id="notification-text">Notification </span>
            <span id="service-text">Service </span>
          </span>
        </span>
      </div>

      {seen ? <Info /> : <div></div>}
      <Link component={AddressPage} props={{ token }}>
        <button id="button">
          <span id="button-text">Continue</span>
        </button>
      </Link>
    </div>
  )
}
