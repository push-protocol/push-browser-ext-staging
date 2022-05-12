/*global chrome*/
import React from "react";
import { useEffect, useState } from "react";
import { goTo } from "react-chrome-extension-router";
import { makeStyles } from "@material-ui/core/styles";
import LastPage from "../LastPage/LastPage";
import { BsX } from "react-icons/bs";
import "./Address.css";
import CircularProgress from "@material-ui/core/CircularProgress";
import Image from "../../assests/epnslogo.svg";
import Transitions from "../Transitions/Transitions";
import Tooltip from "../NotificationPage/Tooltip";
import gsap from "gsap";
import WAValidator from "wallet-address-validator";

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
  },
}));

const ADDRESS_REGEX = /^0x[a-fA-F0-9]{40}$/g;

export default function AddressPage(props) {
  const [address, setAddress] = useState("");
  const [token, setToken] = useState(null);
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

  // regex for input field
  const handleValidation = (e) => {
    let textValue = e.target.value;
    setAddress(textValue);
    let result = ADDRESS_REGEX.test(textValue);
    if (result) {
      setErrorMessage({ message: "" });
      setDisabled(false);
    } else {
      setErrorMessage({ message: "Please, input a valid wallet address!" });
      setDisabled(true);
    }
  };

  // wallet address validator
  const submitAddress = () => {
    let valid = WAValidator.validate(address, "ETH");
    if (valid) {
      goTo(LastPage, { address, token });
    } else {
      setErrorMessage({ message: "INVALID ADDRESS" });
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
          <textarea
            spellCheck="false"
            value={address}
            id="input-type"
            onChange={handleValidation}
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
          onClick={submitAddress}
        >
          <span className={"button-text bold-font"}>Verify</span>
        </button>
      </div>
    </>
  );
}
