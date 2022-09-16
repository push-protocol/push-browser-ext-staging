import React,{useState} from 'react'
import Image from "../../assests/epnslogo.svg";
import Topbar from '../Topbar';


const ChatPage = () => {
  const [seen, setSeen] = useState(false);
  return (
    <div className='standard'>
      <Topbar />

      <div>Chat</div>
    </div>
  )
}

export default ChatPage