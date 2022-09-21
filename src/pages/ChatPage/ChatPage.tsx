/*global chrome*/
// React + Web3 Essentials
import { useWeb3React } from '@web3-react/core'
// @ts-ignore
import { Web3Provider } from 'ethers/providers'
import React,{useState,useEffect} from 'react'
import Topbar from '../../components/Topbar';
import styled from 'styled-components';
import Chats from '../../components/Chats';
import Requests from '../../components/Requests';
import {AiOutlineEllipsis} from 'react-icons/ai'
import Blockies from "react-blockies";

// External Packages
import { ThreeIdConnect } from '@3id/connect'
import { getResolver as threeIDDIDGetResolver } from '@ceramicnetwork/3id-did-resolver'
import { CeramicClient } from '@ceramicnetwork/http-client'
import { DID } from 'dids'
import { getResolver as keyDIDGetResolver } from 'key-did-resolver'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import Web3 from 'web3'
import { createExternalExtensionProvider } from '@metamask/providers';

// internal components
import * as w2wHelper from '../../helpers/w2w'
import * as PushNodeClient from '../../utils/api'
import { Feeds, User } from '../../utils/api';
import { createCeramic } from '../../helpers/ceramic';

export interface InboxChat {
  name: string
  profilePicture: string
  timestamp: number
  fromDID: string
  toDID: string
  lastMessage: string
  messageType: string
  encType: string
  signature: string
  signatureType: string
  encryptedSecret: string
}


const ChatPage = () => {
  const [showChat, setShowChat] = useState<boolean>(true);
  const [wallet, setWallet] = useState("");
  const [addr, setAddr] = useState("");
  const [object, setObject] = useState("");
  
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [did, setDID] = useState<DID>()
  const [connectedUser, setConnectedUser] = useState<User>()
  const [active,setActive] = useState()
  // const { connector, account, chainId } = useWeb3React<Web3Provider>()




  const toggleShowChat = () => setShowChat((prev) => !prev);

  const handleToggle = () => {
    toggleShowChat();
  };

  useEffect(() => {
    chrome.storage.local.get(["epns"], function (result) {
      if (result.epns) {
        setWallet(result.epns.wallet);
        setObject(result.epns);
      }
    });
    if (wallet) {
      updateWallet(wallet);
    }
  }, [wallet]);

  const updateWallet = (wallet: string) => {
    let walletTemp = wallet;
    let fh = walletTemp.slice(0, 6);
    let sh = walletTemp.slice(-6);
    let final = fh + "...." + sh;
    setAddr(final);
  };

  useEffect(async () => {
    if (isLoading) {
      // connectToCeramic()
      let act:any = await Activate()
      setActive(act)
      // provider.on('connect');
    }
  }, [])


// const createMetaMaskProvider = require('metamask-extension-provider');

// const provider = createMetaMaskProvider();
const provider = createExternalExtensionProvider();
// const web3 = new Web3(provider)


async function Activate() {
  // const accountss = await web3.eth.requestAccounts();
  // const account = accountss[0];
  // const balance = await web3.eth.getBalance(account)
  // await web3.eth.personal.sign('xxx', account.toLowerCase(), "")

  // if (!provider) {
  //   console.error("MetaMask provider not detected.");
  //   throw new Error("MetaMask provider not detected.");
  // }
  const [accounts, chainId] = await Promise.all([
    provider.request({
      method: 'eth_requestAccounts',
    }),
    provider.request({ method: 'eth_chainId' }),
  ]);
  const account = accounts[0] ? accounts[0].toLowerCase() : null;



  // let chainId = provider.chainId;
  // let account = provider.selectedAddress;
  // let provider = provider;

  // subscribeToEvents(provider);
  // chrome.extension.getBackgroundPage().console.log(account)

  return { provider, chainId, account };
}

function Disactivate() {
  chrome.extension.getBackgroundPage().console.log('removed 1',chrome)
  // provider.on('disconnect',handler: (error) => void);
}

chrome.extension.getBackgroundPage().console.log(active,provider)

provider.on('error', (error) => {
  // Failed to connect to MetaMask, fallback logic.
});

provider.on('accountsChanged', (accounts) => {
  chrome.extension.getBackgroundPage().console.log('changed',accounts)
})

// chrome.extension.getBackgroundPage().console.log(provider)

  // chrome.extension.getBackgroundPage().console.log(account,chainId,connector)

  // const connectAndSetDID = async (): Promise<DID> => {
  //   const provider: Promise<any> = await connector.getProvider()
  //   const threeID: ThreeIdConnect = new ThreeIdConnect()
  //   const ceramic: CeramicClient = createCeramic()
  //   const didProvider = await DIDHelper.Get3IDDIDProvider(threeID, provider, account)
  //   setLoadingMessage('Connecting to DID. If it\'s your first time logging in you\'ll need to sign 2 transactions')
  //   const did: DID = await DIDHelper.CreateDID(keyDIDGetResolver, threeIDDIDGetResolver, ceramic, didProvider)
  //   setDID(did)
  //   setLoadingMessage('DID created')
  //   return did
  // }

  // const connectToCeramic = async (): Promise<void> => {
  //   const caip10: string = w2wHelper.walletToCAIP10({ account, chainId })
  //   let user: User = await PushNodeClient.getUser({ caip10 })
  //   // TODO: Change this to do verification on ceramic to validate if did is valid
  //   if (user?.did.includes('did:3:')) {
  //     await connectAndSetDID()
  //   }
  //   if (user) {
  //     if (!user.wallets.includes(caip10)) {
  //       user = await PushNodeClient.updateUser({ did: did.id, caip10 })
  //     }
  //   } else {
  //     user = {
  //       // We only need to provide this information when it's a new user
  //       name: 'john-snow',
  //       profilePicture: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAvklEQVR4AcXBsW2FMBiF0Y8r3GQb6jeBxRauYRpo4yGQkMd4A7kg7Z/GUfSKe8703fKDkTATZsJsrr0RlZSJ9r4RLayMvLmJjnQS1d6IhJkwE2bT13U/DBzp5BN73xgRZsJMmM1HOolqb/yWiWpvjJSUiRZWopIykTATZsJs5g+1N6KSMiO1N/5DmAkzYTa9Lh6MhJkwE2ZzSZlo7xvRwson3txERzqJhJkwE2bT6+JhoKTMJ2pvjAgzYSbMfgDlXixqjH6gRgAAAABJRU5ErkJggg==',
  //       wallets: caip10,
  //       ///
  //       about: '',
  //       allowedNumMsg: 0,
  //       did: '',
  //       encryptedPrivateKey: '',
  //       encryptionType: '',
  //       numMsg: 0,
  //       publicKey: '',
  //       sigType: '',
  //       signature: '',
  //       linkedListHash: ''
  //     }
  //   }
  //   setConnectedUser(user)
  //   setIsLoading(false)
  // }


  return (
    <div className='standard'>
      <Topbar />
     {/* accounts && accounts.length > 0 { */}
    {/* // chrome.extension.getBackgroundPage().console.log("user is connected"); */}
{/* } else { */}
  {/* //  chrome.extension.getBackgroundPage().console.log("user not connected"); */}
{/* } */}
    {active?.account && active?.account.length > 0 ? (
      <div onClick={()=>Disactivate()}>Disconnnect</div>
    ): (<div>Connect</div>)}
      <NavBoxHolder>
        <NavHolder>
          <NavTitleButton isActive={showChat} onClick={handleToggle}>
            Chats
          </NavTitleButton>
          <NavTitleButton isActive={!showChat} onClick={handleToggle}>
            Requests
          </NavTitleButton>
        </NavHolder>
      </NavBoxHolder>

      {showChat ? <Chats /> : <Requests />}

      <BottomNav>
        <ImageBottom>
          <Blockies seed={wallet} size={10} scale={5} className="identicon" />
        </ImageBottom>
        <Addressbar>0xF2B2...2Ec34E</Addressbar>
        
        <BottomIcon>
          <AiOutlineEllipsis size={25} />
        </BottomIcon>
      </BottomNav>
    </div>
  )
}

const NavBoxHolder = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: relative;


  :after {
    position: absolute;
    height: 1.5px;
    left: 0;
    bottom: 0;
    width: 100%;
    content: '';
    background-color: #E4E8EF;
  }
`;

const NavHolder = styled.div`
  display: flex;
  align-self: flex-end;
  padding-bottom: 15px;
  padding-top: 15px;
`;

const NavTitleButton = styled.div`
  width: 180px;
  height: 25px;
  font-style: normal;
  font-weight: ${(props) => (props.isActive ? '600' : '500')};
  font-size: 18px;
  line-height: 25.4px;
  text-align: center;
  position: relative;
  color: ${(props) => (props.isActive ? '#CF1C84' : '#000000')};
  cursor: pointer;

  ${(props) =>
    props.isActive &&
    `&:after{
        position: absolute;
        height: 1.5px;
        left: 0;
        bottom: -15px;
        width: 100%;
        content: '';
        background-color: #CF1C84;
        z-index: 1;
        
    }`}
`;

const BottomNav = styled.div`
  position: absolute;
  top:530px;
  left:15px;
  width:330px;
  height: 70px;
  display: flex;
  flex-direction:row;
  align-items:center;
  border-top: 1px solid #E4E8EF;
`;

const Addressbar = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 17px;
  line-height: 150%;
  letter-spacing: -0.019em;
  color: #1E1E1E;
  margin-left:10px;
`

const ImageBottom = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 100%;
  overflow: hidden;
  transform: scale(0.85);
  outline-color: rgba(225,225,225,0.2);
`

const BottomIcon = styled.div`
margin-left:auto;
transform: rotate(90deg)
`

export default ChatPage