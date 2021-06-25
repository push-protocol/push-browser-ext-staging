import React from 'react'
import './Circle3.css'
import './Circle3Right.css'
import './Circle3Center.css'
export default function Circle3(props) {
  if (props.side === 'left') return <div id="circle3"></div>
  else if (props.side === 'right') return <div id="circle3-right"></div>
  else return <div id="circle3-center"></div>
}
