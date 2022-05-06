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
      </div>
    </Fragment>
  );
}
