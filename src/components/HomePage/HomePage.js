/*global chrome*/
import React from "react";
import { useEffect, useState } from "react";
import {
  goBack,
  goTo,
  popToTop,
  Link,
  Router,
  getCurrent,
  getComponentStack,
} from "react-chrome-extension-router";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import AddressPage from "../AddressPage/AddressPage";
import { getToken } from "../firebase";
import "./HomePage.css";
import Info from "./Info";
import Circle1 from "../Circle/Circle1";
import Circle2 from "../Circle/Circle2";
import Circle3 from "../Circle/Circle3";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import { BsArrowRight } from "react-icons/bs";
import Image from "../../assests/epnslogo.svg";

const useStyles = makeStyles((theme) => ({
  loader: {
    display: "flex",
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
    height: "90%",
    marginTop: "2rem",
  },
}));
export default function Home() {
  const classes = useStyles();
  const [token, setToken] = useState("");
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    getToken().then((res) => {
      setToken(res);
    });
  }, []);

  const toggle = () => {
    setSeen(!seen);
  };
  return (
    <div style={{ height: "600px", width: "360px" }}>
      <div>
        <Circle1 side="left" />
        <Circle2 side="left" />
        <Circle3 side="left" />
        {/* <div id="epns-logo"></div> */}
      </div>
      <div>
        {/* <div id="welcome">
          <b className="bold-font">Welcome!</b>
        </div> */}

        <div className="icon-page">
          <img src={Image} style={{ width: "40px" }} alt="" />
        </div>

        <div className="text-corner regular">
          {/* Welcome to */}
          <span>
            <span
              onMouseEnter={() => toggle()}
              onMouseLeave={() => toggle()}
              style={{ padding: "4px" }}
            >
              <span className="colored-text" style={{ color: "#e20880" }}>
                Ethereum{" "}
              </span>
              <span className="colored-text" style={{ color: "#674c9f" }}>
                Push{" "}
              </span>
              <br></br>
              <span className="colored-text" style={{ color: "#674c9f" }}>
                Notification{" "}
              </span>
              <span className="colored-text" style={{ color: "#35c5f3" }}>
                Service{" "}
              </span>
            </span>
          </span>
        </div>
      </div>
      {/* {seen ?  */}
      <Info />
      {/* : <div></div>} */}
      {token && (
        <Link component={AddressPage} props={{ token }}>
          <button className="button hover-effect">
            <span className="button-text bold-font">Get Started</span>
            <i className="button-icon">
              <BsArrowRight size={17} />
            </i>
          </button>
        </Link>
      )}
      {!token && (
        <div className={classes.loader}>
          <CircularProgress color="secondary" />
        </div>
      )}
    </div>
  );
}