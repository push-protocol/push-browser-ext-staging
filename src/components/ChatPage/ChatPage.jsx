import React,{useState} from 'react'
import Topbar from '../Topbar';
import styled from 'styled-components';


const ChatPage = () => {
  const [showChat, setShowChat] = useState(true);

  const toggleShowChat = () => setShowChat((prev) => !prev);

  const handleToggle = () => {
    toggleShowChat();
  };

  return (
    <div className='standard'>
      <Topbar />

      <div>
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
      </div>
    </div>
  )
}

const NavBoxHolder = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  // min-height: 80px;
  position: relative;


  :after {
    position: absolute;
    height: 1px;
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
  font-weight: 500;
  font-size: 18px;
  line-height: 141%;
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

export default ChatPage