import React, { Fragment, useEffect } from "react";
import "./Info.css";
import gsap from "gsap";

export default function Info() {
  const tl = gsap.timeline();

  useEffect(() => {
    tl.from(".text, .regular", 1.8, {
      x: 100,
      ease: "power4.out",
      delay: 0.7,
      skewY: 5,
      opacity: 0,
      stagger: {
        amount: 0.3,
      },
    }).to(".text", 1.8, {
      opacity: 1,
    });
  }, []);

  return (
    <Fragment>
      <div className="box regular text">
        EPNS is a decentralized communication protocol for Web3! that allows any
        <b> dApps</b>, <b>Smart Contracts</b>, backends or protocols to send
        communication directly to user wallet addresses in an open, gasless and
        platform agnostic fashion.
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
