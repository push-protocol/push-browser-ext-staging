/*global chrome*/
import React,{useState,useEffect} from 'react'
import Topbar from '../Topbar';
import styled from 'styled-components';
import Chats from '../Chats';
import Requests from '../Requests';
import {AiOutlineEllipsis} from 'react-icons/ai'
import Blockies from "react-blockies";


const ChatPage = () => {
  const [showChat, setShowChat] = useState(true);
  const [wallet, setWallet] = useState("");
  const [addr, setAddr] = useState("");
  const [object, setObject] = useState("");

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

  const updateWallet = (wallet) => {
    let walletTemp = wallet;
    let fh = walletTemp.slice(0, 6);
    let sh = walletTemp.slice(-6);
    let final = fh + "...." + sh;
    setAddr(final);
  };

  return (
    <div className='standard'>
      <Topbar />

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