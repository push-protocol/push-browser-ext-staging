import React from 'react'
import { useState, useEffect } from 'react'
import {
  goBack,
  goTo,
  popToTop,
  Link,
  Router,
  getCurrent,
  getComponentStack,
} from 'react-chrome-extension-router'
import PasswordInput from './PasswordInput'
import LastPage from '../LastPage/LastPage'

export default function PasswordPage(props) {
  const [password, setPassword] = useState('')
  const [verifyPassword, setVerifyPassword] = useState('')
  const [address, setAddress] = useState(null)
  const [token, setToken] = useState(null)
  
  const handlePasswordChanges = (e) => {
    setPassword(e.target.value)
  }
  useEffect(() => {
    setAddress(props.address)
    setToken(props.token)
  })
  return (
    <div style={{ height: '550px', width: '350px' }}>
      <h2>Security</h2>

      <p>Enter your password</p>
      <PasswordInput
        value={password}
        placeholder="Type your password"
        handleChanges={handlePasswordChanges}
      />

      <p>Re-enter your password</p>
      <input
        type="password"
        onChange={(e) => {
          setVerifyPassword(e.target.value)
        }}
      ></input>

      {password === verifyPassword ? (
        <Link component={LastPage} props={{ address,password,token }}>
          <button>Next</button>
        </Link>
      ) : (
        <button disabled>Next</button>
      )}
    </div>
  )
}
