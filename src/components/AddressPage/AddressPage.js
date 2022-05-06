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
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Circle1 from "../Circle/Circle1";
import Circle2 from "../Circle/Circle2";
import Circle3 from "../Circle/Circle3";
import LastPage from "../LastPage/LastPage";
import { BsX } from "react-icons/bs";
import "./Address.css";
import CircularProgress from "@material-ui/core/CircularProgress";
import Home from "../HomePage/HomePage";
import Image from "../../assests/epnslogo.svg";
import Transitions from "../Transitions/Transitions";
import Tooltip from "../NotificationPage/Tooltip";
import gsap from "gsap";

const ADDRESS_REGEX = /^0x[a-fA-F0-9]{40}$/g;

const useStyles = makeStyles((theme) => ({
  input: {
    "& > *": {
      width: "300px",
      height: "100px",
      left: " 31px",
      top: "316px",
    },
  },
  loader: {
    display: "flex",
    justifyContent: "center",
    height: "100%",
    alignItems: "center",
    color: "white",
    // width: "10px",
    // height: "10px",
  },
}));
export default function AddressPage(props) {
  const [address, setAddress] = useState("");
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(null);
  const [errorMessage, setErrorMessage] = useState({
    message: "",
  });
  const [seen, setSeen] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const classes = useStyles();

  useEffect(() => {
    if (props.token) {
      setToken(props.token);
    }
    if (props.object) {
      setToken(props.object.device_token);
    }
  }, []);

  // useEffect(() => {
  //   if (address === "") {
  //     setDisabled(true);
  //     setErrorMessage({ message: "" });
  //     document.getElementById("input-type").style.border =
  //       "1.5px solid #e5e7eb";
  //   }
  // }, [address]);

  // regex for input field
  const handleValidation = (e) => {
    setAddress(e);
    let result = ADDRESS_REGEX.test(e);
    if (result) {
      setErrorMessage({ message: "" });
      setDisabled(false);
      // document.getElementById("input-type").style.borderBottom =
      //   "1.5px solid #e5e7eb";
      return "Facts";
    } else {
      setErrorMessage({ message: "Please, input a valid wallet address!" });
      setDisabled(true);
      // document.getElementById("input-type").style.border =
      //   "1.5px solid #f87171";
    }
  };

  // wallet address validator
  const submitAddress = () => {
    var WAValidator = require("wallet-address-validator");

    var valid = WAValidator.validate(address, "ETH");
    if (valid) {
      goTo(LastPage, { address, token });
    } else {
      setErrorMessage({ message: "INVALID ADDRESS" });
      // document.getElementById("input-type").style.border =
      //   "1.5px solid #f87171";
    }
  };

  const tl = gsap.timeline();

  useEffect(() => {
    tl.from(".wallet-decription-text, .label-field", 1.3, {
      y: 100,
      ease: "power4.easeOut",
      delay: 0.2,
      opacity: 0,
      stagger: {
        amount: 0.2,
      },
    }).to(".wallet-decription-text", 1.3, {
      opacity: 1,
    });
  }, []);

  return (
    <>
      <Transitions />
      <div className="standard-size">
        {seen && <Tooltip />}

        <div className="top-bar">
          <div
            className="icon-topbar"
            onMouseOver={() => setSeen(true)}
            onMouseLeave={() => setSeen(false)}
          >
            <img src={Image} className="actual-image" alt="" />
          </div>

          <span className="wallet-text regular-font">Enter Wallet Address</span>
          <BsX
            size={25}
            className="icon-hover"
            onClick={() => {
              window.close();
            }}
          />
        </div>

        <div
          className="wallet-decription-text regular"
          id="wallet-description-text"
        >
          <b>EPNS</b> requires your wallet address to deliver
          <span className="notification-text"> notifications</span> meant for
          you!
        </div>

        <div className="label-field">
          <label className="bold-font">Wallet Address</label>
          {/* <input
            type="text"
            id="input-type"
            className="regular"
            spellCheck="false"
            value={address}
            onChange={(e) => handleValidation(e.target.value)}
          /> */}
          <textarea
            spellCheck="false"
            value={address}
            id="input-type"
            onChange={(e) => handleValidation(e.target.value)}
            className="regular text-body"
            draggable={false}
          ></textarea>
        </div>

        {errorMessage?.message !== "" && (
          <span className="error-message regular-font">
            {errorMessage?.message}
          </span>
        )}

        <button
          disabled={disabled}
          className={
            disabled ? "button-disabled" : "button-verify hover-effect"
          }
          onClick={() => submitAddress()}
          // style={{ backgroundColor: "#e20880" }}
        >
          {loading ? (
            <CircularProgress
              color="secondary"
              className={classes.loader}
              size={23}
            />
          ) : (
            <span className={"button-text bold-font"}>Verify</span>
          )}
        </button>
      </div>
    </>
  );
}
