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
import { makeStyles } from '@material-ui/core/styles'
import Circle1 from '../Circle/Circle1'
import Circle2 from '../Circle/Circle2'
import Circle3 from '../Circle/Circle3'
import LastPage from '../LastPage/LastPage'
import './Address.css'

const ADDRESS_REGEX = /^0x[a-fA-F0-9]{40}$/g

const useStyles = makeStyles((theme) => ({
  input: {
    '& > *': {
      width: '300px',
      height: '100px',
      left: ' 31px',
      top: '316px',
    },
  },
}))
export default function AddressPage(props) {
  const [address, setAddress] = useState(null)
  const [token, setToken] = useState(null)
  const classes = useStyles()

  useEffect(() => {
    if (props.token) {
      setToken(props.token)
    }
    if (props.object) {
      setToken(props.object.device_token)
    }
  }, [])

  return (
    <div style={{ height: '600px', width: '360px' }}>
      <div>
        <Circle1 side="right" />
        <Circle2 side="right" />
        <Circle3 side="right" />
        <div id="wallet-logo"></div>
      </div>
      <p id="wallet-text"><b>Wallet Address!</b></p>
      
      <div id="wallet-decription-text">
        <b>EPNS</b> requires your wallet address to deliver
        <span id="notification-text">notifications</span> meant for you!
      </div>
      <TextField
        id="outlined-basic"
        label="Wallet Address"
        variant="outlined"
        className={classes.input}
        onChange={(e) => {
          ADDRESS_REGEX.test(e.target.value)
            ? setAddress(e.target.value)
            : setAddress(null)
        }}
      />
      {address == null || address == undefined || address == '' ? (
        <div>
          <div>
            <button id="verify-button" disabled>
              Verify
            </button>
          </div>
          <div>
            <button id="cancel-button" disabled>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <Link component={LastPage} props={{ address, token }}>
          <div>
            <div>
              <button id="verify-button">Verify</button>
            </div>
            <div>
              <button id="cancel-button">Cancel</button>
            </div>
          </div>
        </Link>
      )}
    </div>
  )
}
