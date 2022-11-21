/*global chrome*/
import React from "react";
import { useEffect, useState, useCallback } from "react";
import { goTo } from "react-chrome-extension-router";
import { makeStyles } from "@material-ui/core/styles";
import LastPage from "./LastPage/LastPage";
import { BsX } from "react-icons/bs";
import "./Address.css";
import CircularProgress from "@material-ui/core/CircularProgress";
import Image from "../../assests/pushlogo.png";
import Transitions from "../../components/Transitions/Transitions";
import Tooltip from "../NotificationPage/Tooltip";
import gsap from "gsap";
import WAValidator from "wallet-address-validator";
import styled from "styled-components";
// import Push from "../../assests/push.png";

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

const Message = (props) => {
  const { error } = props;
  return (
    error !== "" && <span className="error-message regular-font">{error}</span>
  );
};

export default function AddressPage(props) {
  const [address, setAddress] = useState("");
  const [token, setToken] = useState(null);
  const [error, setError] = useState("");
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
  const handleValidation = useCallback(
    (e) => {
      let textValue = e;
      setAddress(textValue);
      if (address.length > 0) {
        let result = ADDRESS_REGEX.test(address);
        if (result) {
          setError("");
          setDisabled(false);
        } else {
          setError("Please, input a valid wallet address!");
          setDisabled(true);
        }
      } else {
        setError("");
        setDisabled(true);
      }
    },
    [address]
  );

  useEffect(() => {
    handleValidation(address);
  }, [address]);

  // wallet address validator
  const submitAddress = () => {
    let valid = WAValidator.validate(address, "ETH");
    if (valid) {
      goTo(LastPage, { address, token });
    } else {
      setError("Invalid wallet Address");
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

        <TopBar>
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
            color={"#657795"}
          />
        </TopBar>

        <div
          className="wallet-decription-text regular"
          id="wallet-description-text"
        >
          {/* <ImageArea src={Push} alt="" /> */}
          <b>Push (Previously EPNS)</b> requires your wallet address to deliver
          <span className="notification-text"> notifications</span> meant for
          you!
        </div>

        <div className="label-field">
          <label className="bold-font">Wallet Address</label>
          <textarea
            spellCheck="false"
            value={address}
            id="input-type"
            onChange={(e) => handleValidation(e.target.value)}
            className="regular text-body"
            draggable={false}
          ></textarea>
        </div>

        <Message error={error} />

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

const ImageArea = styled.img`
  height: 12px;
  width: 36px;
  margin-right: 5px;
  margin-top: 5px;
`;

const TopBar = styled.div`
  width: 320px;
  height: 66px;
  padding-left: 20px;
  padding-right: 20px;
  display: flex;
  flex-direction: row;
  // justify-content: space-between;
  align-items: center;
  background-color: #fff;
  border-bottom: 1.5px solid #f5f5f5;
`;
