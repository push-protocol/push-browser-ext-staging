/*global chrome*/
import React from "react"
import { AiOutlineUserSwitch } from "react-icons/ai"
import { useEffect, useState } from "react"
import {
  goBack,
  goTo,
  popToTop,
  Link,
  Router,
  getCurrent,
  getComponentStack,
} from "react-chrome-extension-router"
import TextField from "@material-ui/core/TextField"
import Checkbox from "@material-ui/core/Checkbox"
import { makeStyles } from "@material-ui/core/styles"
import Blockies from "react-blockies"
import ChannelIcon from "../UI/ChannelIcon"
import "./Notification.css"
import AddressPage from "../AddressPage/AddressPage"
import Transitions3 from "../Transitions/Transitions3"
import Image from "../../assests/epnslogo.svg"
import { BsX } from "react-icons/bs"

const useStyles = makeStyles(theme => ({
  input1: {
    "& > *": {
      position: "absolute",
      width: "300px",
      height: "40px",
      left: "30px",
      top: "311px",
    },
  },
  input2: {
    "& > *": {
      position: "absolute",
      width: "300px",
      height: "40px",
      left: "30px",
      top: "381px",
    },
  },
  checkbox: {
    "& > *": {
      position: "absolute",
      left: "10.33%",
      right: "86.67%",
      top: "74.17%",
    },
  },
}))
export default function NotificationPage() {
  const [notifications, setNotifications] = useState([])
  const [wallet, setWallet] = useState("")
  const [addr, setAddr] = useState("")
  const [object, setObject] = useState("")
  const [model, setModel] = useState(false)
  useEffect(() => {
    // chrome.storage.local.get(["epns"], function (result) {
    //   if (result.epns) {
    //     setWallet(result.epns.wallet);
    //     setObject(result.epns);
    //   }
    // });
    // if (wallet) callAPI();
    // // let walletTemp = "0x383643f5cc30abafbcc3c4664bce454b8c708e6f";
    // let walletTemp = wallet;
    // let fh = walletTemp.slice(0, 6);
    // let sh = walletTemp.slice(-6);
    // let final = fh + "...." + sh;
    // setAddr(final);
  }, [wallet])

  const callAPI = async () => {
    const walletAddr = wallet.toLowerCase()
    const apiURL = "https://backend-kovan.epns.io/apis/feeds/get_feeds"
    const response = await fetch(apiURL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: walletAddr.toLowerCase(),
        page: 1,
        pageSize: 5,
        op: "read",
      }),
    })
    const resJson = await response.json()
    setNotifications(resJson.results)
    setWallet(walletAddr)
  }

  const classes = useStyles()
  return (
    <>
      {/* <Transitions3 /> */}
      <div style={{ height: "600px", width: "360px" }}>
        {model ? (
          <div id="model-div">
            <div
              className="overlay"
              onClick={() => {
                setModel(false)
              }}
            ></div>
            <div
              onClick={() => {
                setModel(false)
              }}
              id="cross"
            >
              <span id="X">
                <b>X</b>
              </span>
            </div>
            <div className="modal-content">
              <Link component={AddressPage} props={{ object, type: "renter" }}>
                <button id="switch-button">
                  <AiOutlineUserSwitch fontSize={15} color="#000" className="icon"/>
                  <span id="switch-button-text">Switch Account</span>
                </button>
              </Link>
              <hr className="line" />
            </div>
          </div>
        ) : null}
        <div className="top-bar">
          <div className="icon-topbar">
            <img src={Image} style={{ with: "25px", height: "30px" }} alt="" />
          </div>

          <div className="check-wallet-address regular">{addr}</div>
          {/* <div className="check-wallet-address regular">
            0x383643f5cc30aBaFbCc3C4664bce454b8c708E6F
          </div> */}
          {/* <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div id="settings"></div>
          </div>
          <div></div> */}
          {/* <BsX
            size={25}
            className="icon-hover"
            onClick={() => {
              window.close();
            }}
          /> */}
          <div
            className="profile-image"
            onClick={() => {
              setModel(true)
            }}
          >
            <div className="blocky">
              <Blockies
                seed={wallet}
                size={7}
                scale={5}
                className="identicon"
              />
            </div>
          </div>
        </div>

        <div id="feedBox">
          {notifications ? (
            notifications.map(notif => (
              <div
                key={notif.payload_id}
                id="feedItem"
                style={{
                  border:
                    notif.payload.data.acta == "" ? "" : "0.5px solid #35C5F3",
                  cursor: notif.payload.data.acta == "" ? "" : "pointer",
                }}
                onClick={() => {
                  if (notif.payload.data.acta) {
                  }
                }}
              >
                <div id="feedHeader">
                  <div id="channelIcon">
                    <ChannelIcon url={notif.payload.data.icon} />
                  </div>
                  <div id="channelHeader">{notif.payload.data.app}</div>
                  {notif.payload.data.type == 2 || notif.payload.type == -2 ? (
                    <div id="channelSecret"></div>
                  ) : (
                    <div></div>
                  )}
                </div>
                <div id="bottom">
                  <div id="line"></div>
                </div>

                <div id="body">
                  <div id="title">{notif.payload.data.asub}</div>
                  <div id="message">{notif.payload.notification.body}</div>
                </div>
              </div>
            ))
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </>
  )
}
