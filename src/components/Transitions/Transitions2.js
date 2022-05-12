import React, { useEffect } from "react";
import "./Transitions2.css";
import gsap from "gsap";

const Transitions2 = () => {
  const tl = gsap.timeline();

  useEffect(() => {
    tl.to(".transition2-effect", {
      duration: 5,
      x: 2600,
      ease: "power4.easeOut",
    });
  }, []);

  return <div className="transition2-effect"></div>;
};

export default Transitions2;
