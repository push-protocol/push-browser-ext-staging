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

export default function LastPage(props) {
  const [status, setStatus] = useState(null)
  const [loader, setLoader] = useState(true)
  useEffect(() => {
    const address = props.address
    // const password=props.password
    const token = props.token
    const object = {
      op: 'register',
      wallet: address,
      device_token: token,
      platform: 'android',
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
    <div style={{ height: '550px', width: '350px' }}>
      {loader ? (
        <div>
          <h2>Loading</h2>
        </div>
      ) : status ? (
        <div>
          <h2>All Done</h2>
          You are all set to receive notifications!!
        </div>
      ) : (
        <div>
          <h2>Something Went Wrong</h2>
        </div>
      )}
    </div>
  )
}
