import React, { Fragment } from "react";
import "./Info.css";
export default function Info() {
  return (
    <Fragment>
      <div className="box regular">
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
