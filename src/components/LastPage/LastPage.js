/*global chrome*/
import React from 'react'
import axios from 'axios'
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
import CircularProgress from '@material-ui/core/CircularProgress'
import { makeStyles } from '@material-ui/core/styles'
import Circle1 from '../Circle/Circle1'
import Circle2 from '../Circle/Circle2'
import Circle3 from '../Circle/Circle3'
import NotificationPage from '../NotificationPage/NotificationPage'
import './Last.css'

const useStyles = makeStyles((theme) => ({
  loader: {
    display: 'flex',
    justifyContent: 'center',
    height: '100%',
    alignItems: 'center',
  },
}))

export default function LastPage(props) {
  const classes = useStyles()
  const [status, setStatus] = useState(null)
  const [loader, setLoader] = useState(true)
  useEffect(() => {
    const address = props.address
    // const password=props.password
    const token = props.token
    const object = {
      op: 'register',
      wallet: address.toLowerCase(),
      device_token: token,
      platform: 'web',
    }
    axios
      .post(
        'https://backend-staging.epns.io/apis/pushtokens/register_no_auth',
        object,
      )
      .then((response) => {
        console.log(response)
        setLoader(false)
        setStatus(true)
        chrome.storage.local.set({ epns: object }, function () {
          console.log('inside chrome')
        })
      })

      .catch(function (err) {
        console.log('Error Occurred.' + err)
        setLoader(false)
        setStatus(false)
      })
  }, [])
  //0x25ccED8002Da0934b2FDfb52c98356EdeBBA00B9

  return (
    <div style={{ height: '600px', width: '360px' }}>
      {loader ? (
        <div className={classes.loader}>
          <CircularProgress color="secondary" />
        </div>
      ) : status ? (
        <div>
          <div id="congrats">
            <p id="congrats-text">
              <b>Congrats!</b>
            </p>
          </div>
          <div>
            <Circle1 side="center" />
            <Circle2 side="center" />
            <Circle3 side="center" />
            <div id="check-icon"></div>
          </div>
          <div>
            <p id="last-epns-text">
              <spn id="bold-epns"><p></p>EPNS</spn> is all setup and ready to rock!
            </p>
          </div>
          <div id="description-text">
            <p id="decription">
              Visit <span id="epnsio-text">app.epns.io</span> from a{' '}
              <span id="bold-text">Web3 Enabled Browser</span> to subscribe to
              your favorite <span id="bold-text">dApp channels</span> and start
              receiving <span id="bold-text">messages</span>.
            </p>
          </div>
          <Link component={NotificationPage}>
            <button id="complete-button">Complete Setup!</button>
          </Link>
        </div>
      ) : (
        <div>
          <h2>Something Went Wrong</h2>
        </div>
      )}
    </div>
  )
}
