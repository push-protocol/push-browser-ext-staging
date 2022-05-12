import React, { useEffect } from "react";
import "./Transitions3.css";
import gsap from "gsap";

const Transitions3 = () => {
  const tl = gsap.timeline();

  useEffect(() => {
    tl.to(".transition3-effect", {
      duration: 5,
      x: 2600,
      ease: "power4.easeOut",
    });
  }, []);

  return <div className="transition3-effect"></div>;
};

export default Transitions3;
