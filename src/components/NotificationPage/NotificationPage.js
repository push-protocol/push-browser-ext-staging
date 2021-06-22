/*global chrome*/
import React from 'react'
import { useEffect, useState } from 'react'
import { onMessageListener } from '../firebase'
export default function NotificationPage() {
  const [notify, setNotify] = useState(null)

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
  useEffect(() => {
    chrome.storage.local.get(['epnsNot'], function (result) {
      if (result.epnsNot) {
        console.log('efi')
        console.log(result)
        setNotify(result.epnsNot)
        chrome.storage.local.remove(['epnsNot'], function () {
          var error = chrome.runtime.lastError
          if (error) {
            console.error(error)
          }
        })
      }
    })
    // chrome.storage.local.get(['epnsNot'], function (result) {
    //   if (result.epnsNot) {
    //     setNotification2(result.epnsNot)
    //     chrome.storage.local.set({ epnsNot: null }, function () {
    //       console.log('inside chrome')
    //     })
    //   }
    // })
  }, [])
  return (
    <div style={{ height: '550px', width: '350px' }}>
      <h2>Notification Page</h2>
      {/* {notification ? (
        <div>
          <h3>{notification.title}</h3>
          <h3>{notification.body}</h3>
        </div>
      ) : (
        <div></div>
      )} */}

      {notify ? (
        <div>
          <h3>{notify.title}</h3>
          <h3>{notify.body}</h3>
          <a href="https://staging-app.epns.io/">Click for more</a>
        </div>
      ) : (
        <div>Nothing to show</div>
      )}
    </div>
  )
}
