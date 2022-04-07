import React,{useEffect} from 'react'
import "./Circle2.css"
import "./Circle2Right.css"
import './Circle2Center.css'
import gsap from 'gsap'


export default function Circle2(props) {

  const tl = gsap.timeline()

  useEffect(() => {
    tl.from(".circle2", 1.7, {
      y: -100,
      ease: "power4.out",
      delay: 0.9,
      skewY: 10,
      opacity: 0,
      stagger: {
        amount: 0.3,
      },
    })
    .to(".circle2", 1.7,{
      opacity:1
    })
  }, [])
    if (props.side === 'left') return <div id="circle2" className='circle2'></div>
  else if (props.side === 'right') return <div id="circle2-right"></div>
  else return <div id="circle2-center"></div>
}


