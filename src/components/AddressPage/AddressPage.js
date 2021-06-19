
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
import PasswordPage from '../PasswordPage/PasswordPage'

const ADDRESS_REGEX = /^0x[a-fA-F0-9]{40}$/g
export default function AddressPage(props) {
  const [address, setAddress] = useState(null)
  const [token, setToken] = useState(null)
  useEffect(() => {
    setToken(props.token)
  
  }, [])

  return (
    <div style={{ height: '550px', width: '350px' }}>
      <h2>Wallet Address</h2>
      <input
        onChange={(e) => {
          ADDRESS_REGEX.test(e.target.value)
            ? setAddress(e.target.value)
            : setAddress(null)
        }}
      ></input>
      {address == null || address == undefined || address == '' ? (
        <button disabled>Next</button>
      ) : (
        <Link component={PasswordPage} props={{ address, token }}>
          <button>Next</button>
        </Link>
      )}
    </div>
  )
}
