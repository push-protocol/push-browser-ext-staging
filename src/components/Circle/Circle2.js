import React, { useEffect } from "react";
import "./Circle2.css";
import gsap from "gsap";

export default function Circle2(props) {
  const tl = gsap.timeline();

  useEffect(() => {
    tl.from(".circle2", 1.7, {
      y: -100,
      ease: "power4.out",
      delay: 0.3,
      skewY: 10,
      opacity: 0,
      stagger: {
        amount: 0.3,
      },
    }).to(".circle2", 1.7, {
      opacity: 1,
    });
  }, []);
  if (props.side === "left") return <div id="circle2" className="circle2" />;
  else if (props.side === "right") return <div id="circle2-right" />;
  else return <div id="circle2-center" />;
}
