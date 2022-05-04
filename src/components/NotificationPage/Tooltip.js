import React, { Fragment, useEffect } from "react";
import "./Tooltip.css";
import gsap from "gsap";

export default function Tooltip() {
  return (
    <Fragment>
      <div className="new-one regular">
        <b>EPNS</b> is an innovative way to receive notification from different{" "}
        <b>dApps</b> and <b>Smart Contracts</b>. Think notification but coming
        from blockchain ecosystem.
        {/* <p>
          Visit{" "}
          <a href="https://epns.io/" target="_blank" rel="noreferrer">
            epns.io
          </a>{" "}
          to learn more
        </p> */}
      </div>

      {/* <p className="link-page regular">
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
      </p> */}
    </Fragment>
  );
}
