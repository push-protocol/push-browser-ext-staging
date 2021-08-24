import React from 'react'
import './Circle1.css'
import './Circle1Right.css'
import './Circle1Center.css'
export default function Circle1(props) {
  if (props.side === 'left') return <div id="circle1"></div>
  else if (props.side === 'right') return <div id="circle1-right"></div>
  else return <div id="circle1-center"></div>
}
