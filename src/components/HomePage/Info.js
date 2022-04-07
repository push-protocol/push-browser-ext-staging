import React, { Fragment, useEffect } from "react";
import "./Info.css";
import gsap from "gsap";

export default function Info() {
  const tl = gsap.timeline()

  useEffect(() => {
    tl.from(".text, .regular", 1.8, {
      x: 100,
      ease: "power4.out",
      delay: 0.9,
      skewY: 5,
      opacity:0,
      stagger: {
        amount: 0.3,
      },
    })
    .to(".text", 1.8, {
      opacity: 1,
    })
  }, [])

  return (
    <Fragment>
      <div className="box regular text">
        EPNS is an innovative way to receive notification from different{" "}
        <b>dApps</b> and <b>Smart Contracts</b>. Think notification but coming
        from blockchain ecosystem.
      </div>
      <p className="link-page regular">
        Visit{" "}
        <a
          href="https://epns.io/"
          target="_blank"
          rel="noreferrer"
          className="link-home"
        >
          epns.io
        </a>{" "}
        to learn more
      </p>
    </Fragment>
  );
}
