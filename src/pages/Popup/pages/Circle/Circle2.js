import React from 'react'
import "./Circle2.css"
import "./Circle2Right.css"
import './Circle2Center.css'
export default function Circle2(props) {
    if (props.side === 'left') return <div id="circle2"></div>
  else if (props.side === 'right') return <div id="circle2-right"></div>
  else return <div id="circle2-center"></div>
}


