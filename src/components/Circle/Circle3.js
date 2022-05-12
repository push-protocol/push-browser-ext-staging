import React, { useEffect } from "react";
import "./Circle3.css";
import gsap from "gsap";

export default function Circle3(props) {
  const tl = gsap.timeline();

  useEffect(() => {
    tl.from(".circle3", 1.9, {
      y: 100,
      ease: "power4.out",
      delay: 0.4,
      skewY: 10,
      opacity: 0,
      stagger: {
        amount: 0.7,
      },
    }).to(".circle3", 1.9, {
      opacity: 1,
    });
  }, []);

  if (props.side === "left") return <div id="circle3" className="circle3" />;
  else if (props.side === "right") return <div id="circle3-right" />;
  else return <div id="circle3-center" />;
}
