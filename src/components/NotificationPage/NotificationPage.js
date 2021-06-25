/*global chrome*/
import React from 'react'
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
import TextField from '@material-ui/core/TextField'
import Checkbox from '@material-ui/core/Checkbox'
import { makeStyles } from '@material-ui/core/styles'
import Circle1 from '../Circle/Circle1'
import Circle2 from '../Circle/Circle2'
import Circle3 from '../Circle/Circle3'
import ChannelIcon from '../UI/ChannelIcon'
import './Notification.css'
import  AddressPage from '../AddressPage/AddressPage'

const useStyles = makeStyles((theme) => ({
  input1: {
    '& > *': {
      position: 'absolute',
      width: '300px',
      height: '40px',
      left: '30px',
      top: '311px',
    },
  },
  input2: {
    '& > *': {
      position: 'absolute',
      width: '300px',
      height: '40px',
      left: '30px',
      top: '381px',
    },
  },
  checkbox: {
    '& > *': {
      position: 'absolute',
      left: '10.33%',
      right: '86.67%',
      top: '74.17%',
    },
  },
}))
export default function NotificationPage() {
  const [notifications, setNotifications] = useState([])
  const [wallet, setWallet] = useState('')
  const [addr, setAddr] = useState('')
  const [object, setObject] = useState('')
  const [model, setModel] = useState(false)
  // console.log(props)
  // onMessageListener()
  //   .then((payload) => {
  //     // setShow(true);
  //     setNotify({
  //       title: payload.notification.title,
  //       body: payload.notification.body,
  //     })
  //     console.log("Message")
  //     console.log(payload)
  //     chrome.storage.local.set(
  //       { epnsNot: payload.notification },
  //       function () {},
  //     )
  //   })
  //   .catch((err) => console.log('failed: ', err))
  // const channel = new BroadcastChannel('sw-messages')
  // channel.addEventListener('message', (event) => {
  //   // chrome.storage.local.get(['epnsNot'], function (result)
  //   if (event.data.data) console.log('Noti')
  //   console.log(event.data.data)
  //   chrome.storage.local.set(
  //     { epnsNot: event.data.data.notification },
  //     function () {},
  //   )
  //   console.log('Received', event.data.data.notification)
  //   setNotify(event.data.data.notification)
  // })
  // useEffect(() => {
  //   chrome.storage.local.get(['epnsNot'], function (result) {
  //     if (result.epnsNot) {
  //       console.log('efi')
  //       console.log(result)
  //       setNotify(result.epnsNot)
  //       chrome.storage.local.remove(['epnsNot'], function () {
  //         var error = chrome.runtime.lastError
  //         if (error) {
  //           console.error(error)
  //         }
  //       })
  //     }
  //   })
  // chrome.storage.local.get(['epnsNot'], function (result) {
  //   if (result.epnsNot) {
  //     setNotification2(result.epnsNot)
  //     chrome.storage.local.set({ epnsNot: null }, function () {
  //       console.log('inside chrome')
  //     })
  //   }
  // })
  // }, [])
  useEffect(() => {
    chrome.storage.local.get(['epns'], function (result) {
      console.log(result.epns)
      if (result.epns) {
        console.log('noti')
        console.log(result.epns.wallet)
        setWallet(result.epns.wallet)
        setObject(result.epns)
      }
    })
    if (wallet) callAPI()

    let walletTemp = wallet
    let fh = walletTemp.slice(0, 6)
    let sh = walletTemp.slice(-6)
    console.log('WALLET ADDR', fh, sh)
    let final = fh + '......' + sh
    setAddr(final)
  }, [wallet])

  const callAPI = async () => {
    console.log(wallet)
    const walletAddr = wallet.toLowerCase()
    const apiURL = 'https://backend-staging.epns.io/apis/feeds/get_feeds'
    const response = await fetch(apiURL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: walletAddr.toLowerCase(),
        page: 1,
        pageSize: 5,
        op: 'read',
      }),
    })
    const resJson = await response.json()
    console.log(resJson)
    setNotifications(resJson.results)
    setWallet(walletAddr)
  }

  const classes = useStyles()
  return (
    <div style={{ height: '600px', width: '360px' }}>
      {model?<div id="model-div">
				<div onClick={()=>{setModel(false)}} id="cross"><b>X</b></div>
        <Link component={AddressPage} props={{ object, type: 'renter' }}>
				<button id="switch-button"><span id="switch-button-text">Switch Account</span></button>
        </Link>
			</div>:null}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          marginTop: '15px',
        }}
      >
        <div id="profile-image" onClick={()=>{setModel(true)}}></div>
        <div id="wallet-address">{addr}</div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div id="logo"></div>
          <div id="settings"></div>
        </div>
        <div>
          {/* <Link component={AddressPage} props={{ object, type: 'renter' }}>
          <button id="button"><span id="button-text">Switch Account</span></button>
          </Link> */}
        </div>
      </div>

      <div id="feedBox">
        {notifications ? (
          notifications.map((notif) => (
            <div
              key={notif.payload_id}
              id="feedItem"
              style={{
                border:
                  notif.payload.data.acta == '' ? '' : '0.5px solid #35C5F3',
                cursor: notif.payload.data.acta == '' ? '' : 'pointer',
              }}
              onClick={() => {
                if (notif.payload.data.acta) {
                  console.log('Clicked')
                }
              }}
            >
              <div id="feedHeader">
                <div id="channelIcon">
                  <ChannelIcon url={notif.payload.data.icon} />
                </div>
                <div id="channelHeader">{notif.payload.data.app}</div>
                {notif.payload.data.type == 2 || notif.payload.type == -2 ? (
                  <div id="channelSecret"></div>
                ) : (
                  <div></div>
                )}
              </div>
              <div id="bottom">
                <div id="line"></div>
              </div>

              <div id="body">
                <div id="title">{notif.payload.data.asub}</div>
                <div id="message">{notif.payload.notification.body}</div>
              </div>
            </div>
          ))
        ) : (
          <div></div>
        )}
      </div>
    </div>
  )
}
