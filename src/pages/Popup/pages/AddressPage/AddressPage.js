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
// var Web3 = require("web3");
import Web3 from "web3";

const { default: Resolution } = require('@unstoppabledomains/resolution');
// const resolution = new Resolution();
let resolution = new Resolution({
  blockchain: {
    uns: {
      url: "https://mainnet.infura.io/v3/12351245223",
      network: "mainnet"
    }
  }
});



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
background-image: url(${(props) => props.imgUrl});

`

export default function AddressPage(props) {
  const [address, setAddress] = useState(null)
  const [token, setToken] = useState(null)
  const [textFieldValue, setTextFieldValue] = useState('');
  const classes = useStyles();
  // const [resolved, setResolved] = useState({});
  // const [type, setType] = useState(undefined);


  useEffect(() => {
    if (props.token) {
      setToken(props.token)
    }
    if (props.object) {
      setToken(props.object.device_token)
    }
  }, [])



  resolveBlockchainDomain: async (domain, currency) => {
    const resolution = new Resolution();
    return new Promise((resolve, reject) => {
      resolution
        .addr(domain, currency)
        .then((address) => {
          console.log(address);
          resolve(address);
        })
        .catch(err => {
          console.log(err);
          reject(err);
        });
    });
  }

  async function resolve(domain, currency) {

    // // var address = ens.resolver(domain).addr().then(function (addr) { });
    // await resolution.isSupportedDomain(domain)
    //   .then((result) => console.log(result))
    //   .catch((err) => console.err(err));
    // // setAddress(address);
    // // console.log(`This domain is supported: ${supported}`);

    // resolution
    //   .addr(domain, currency)
    //   .then((address) => {
    //     console.log(address);
    //     setAddress(address)
    //   })
    //   .catch(console.error);
    console.log(domain);
    // Web3Helper.resolveBlockchainDomain(domain, "ETH")
    //   .then((address) => {
    //     console.log(`resolved address is ${address}`);
    //     setAddress(address);
    //   })
    //   .catch((err) => {
    //     setAddress(null);
    //     console.err(err);
    //   })


    const provider = new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/4ff53a5254144d988a8318210b56f47a');
    var web3 = new Web3(provider);
    var ens = web3.eth.ens;
    var address = await ens.getAddress("mrjaf.eth");
    console.log({
      address,
    });



  }

  function TextFieldChanged(e) {
    ADDRESS_REGEX.test(e.target.value)
      ? setAddress(e.target.value)
      : resolve(e.target.value, 'ETH')
  }

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
        label="Wallet Address or ENS"
        variant="outlined"
        className={classes.input}
        onChange={(e) => {
          // setTextFieldValue()
          TextFieldChanged(e)
          // ADDRESS_REGEX.test(e.target.value)
          //   ? setAddress(e.target.value)
          //   : setAddress(null)
        }}
      />



      {/* <ENSAddress
        provider={window.web3 || window.ethereum}
        onResolve={({ name, address, type }) => {
          if (type) {
            setResolved({
              value: address,
              type
            })
          }
        }}
      /> */}
      {/* {resolvedInput.type === 'address' && setAddress(resolved.value)} */}
      {/* // `We found your reverse record ${resolved.value}`} */}
      {/* {resolvedInput.type === 'name' && setAddress(resolved.value)} */}
      {/* // `We found your address record ${resolved.value}`} */}



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
