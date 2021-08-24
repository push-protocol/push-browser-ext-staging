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
import { Container } from '../../components/Container'
import { Description, WalletAddress, Button } from '../../components/AddressPage'
import { Text } from '../../components/Text'
// import { Button } from '@material-ui/core'
import logo from "../../assests/wallet\ 1.png"
import styled, { css } from 'styled-components'
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

const WalletLogo = styled.div`
    position: absolute;
width: 67px;
height: 50px;
left: 275px;
top: 32px;
z-index: 4;
background-image: url(${(props)=>props.imgUrl});

`
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
    <Container>
      <div>
        <Circle1 side="right" />
        <Circle2 side="right" />
        <Circle3 side="right" />
        <div id="wallet-logo"></div>

      </div>
      <WalletAddress><b>Wallet Address!</b></WalletAddress>

      <Description>
        <Text bold>EPNS</Text> requires your wallet address to deliver
        <Text pinkSmall>notifications</Text> meant for you!
      </Description>
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
            <Button verify disabled>
              Verify
            </Button>
          </div>
          <div>
            <Button cancel onClick={() => { window.close() }}>
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <Link component={LastPage} props={{ address, token }}>
          <div>
            <div>
              <Button verify>Verify</Button>
            </div>
            <div>
              <Button cancel onClick={() => { window.close() }}>Cancel</Button>
            </div>
          </div>
        </Link>
      )}
    </Container>
  )
}
