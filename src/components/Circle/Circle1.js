import React, { useEffect } from "react";
import "./Circle1.css";
import gsap from "gsap";

export default function Circle1(props) {
  const tl = gsap.timeline();

  useEffect(() => {
    tl.from(".circle1", 1.3, {
      y: 100,
      ease: "power4.out",
      delay: 0.2,
      skewY: 10,
      opacity: 0,
      stagger: {
        amount: 0.7,
      },
    }).to(".circle1", 1.3, {
      opacity: 1,
    });
  }, []);

  if (props.side === "left") return <div id="circle1" className="circle1" />;
  else if (props.side === "right") return <div id="circle1-right" />;
  else return <div id="circle1-center" />;
}
