/*global chrome*/
import React, { useRef } from "react"
import { AiOutlineUserSwitch, AiFillInfoCircle } from "react-icons/ai"
import {
  BsFillExclamationCircleFill,
  BsFillExclamationOctagonFill,
} from "react-icons/bs"
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
import Image from "../../assests/epns2.png"
import { BsX } from "react-icons/bs"
import { CircularProgress } from "@material-ui/core"
import Spinner from "../../assests/Spinner.svg"

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
  loader: {
    // display: "flex",
    // justifyContent: "center",
    // height: "100%",
    // alignItems: "center",
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
  const [active, setActive] = useState(false)
  const modalRef = useRef()
  useEffect(() => {
    chrome.storage.local.get(["epns"], function (result) {
      if (result.epns) {
        setWallet(result.epns.wallet)
        setObject(result.epns)
      }
    })
    if (wallet) callAPI()
    let walletTemp = wallet
    let fh = walletTemp.slice(0, 6)
    let sh = walletTemp.slice(-6)
    let final = fh + "...." + sh
    setAddr(final)
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
    chrome.extension.getBackgroundPage().console.log(resJson.results)
    setWallet(walletAddr)
  }

  useEffect(() => {
    const checkIfClickedOutside = e => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (model && modalRef.current && !modalRef.current.contains(e.target)) {
        setModel(false)
      }
    }

    document.addEventListener("click", checkIfClickedOutside)

    return () => {
      // Cleanup the event listener
      document.removeEventListener("click", checkIfClickedOutside)
    }
  }, [model])

  const classes = useStyles()
  return (
    <>
      {/* <Transitions3 /> */}
      <div style={{ height: "600px", width: "360px" }}>
        {model && (
          <div className="modal-content" ref={modalRef}>
            {/* <div
              className="overlay"
              onClick={() => {
                setModel(false);
              }}
            ></div> */}
            <div
              onClick={() => {
                setModel(false)
              }}
              id="cross"
            >
              <div id="X">
                <BsX
                  size={24}
                  className=""
                  onClick={() => {
                    setModel(false)
                  }}
                />
              </div>
            </div>
            <div className="">
              <Link
                style={{
                  textDecoration: "none",
                }}
                component={AddressPage}
                props={{ object, type: "renter" }}
              >
                <button className="switch-button">
                  <AiOutlineUserSwitch
                    fontSize={22}
                    color="#ffff"
                    className="icon"
                  />
                  <p className="switch-button-text regular-font">
                    Switch Account
                  </p>
                </button>
              </Link>
            </div>
          </div>
        )}
        <div className="top-bar">
          <div className="icon-topbar">
            <img src={Image} style={{ height: "35px" }} alt="" />
          </div>

          <div className="check-wallet-address regular-font">{addr}</div>
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
          <div className="profile-image" onClick={() => setModel(true)}>
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

        <div className="feedBox">
          <div className="twin-button regular">
            <button
              className={!active ? "regular" : "none"}
              onClick={() => setActive(false)}
            >
              Feed
            </button>
            <button
              className={active ? "regular" : "none"}
              onClick={() => setActive(true)}
            >
              Bin
            </button>
          </div>
          {notifications ? (
            notifications?.length > 0 ? (
              notifications.map(notif => (
                <>
                  {/* navigation */}

                  <div
                    key={notif.payload_id}
                    id="feedItem"
                    style={{
                      border:
                        notif.payload.data.acta == ""
                          ? ""
                          : "0.5px solid #35C5F3",
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
                      {notif.payload.data.type == 2 ||
                      notif.payload.type == -2 ? (
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
                </>
              ))
            ) : (
              <div className="illustration">
                <BsFillExclamationCircleFill
                  color="#D1D5DB"
                  size={140}
                  className="icon-empty"
                  style={{
                    border: "1px solid #d6d3d1",
                    borderRadius: "100%",
                    padding: "1px",
                  }}
                />
                <div className="slide-left description-texts regular">
                  <span className="regular">NO NOTIFICATIONS YET!!</span>
                  <p id="decription">
                    Visit{" "}
                    <a
                      href="https://app.epns.io/"
                      target="_blank"
                      rel="noreferrer"
                      className="link-home"
                    >
                      app.epns.io
                    </a>{" "}
                    from a <b>Web3 Enabled Browser</b> to subscribe to your
                    favorite <b>channels</b> and start receiving{" "}
                    <b>notifications</b>.
                  </p>
                </div>
              </div>
            )
          ) : (
            <div className="loading">
              <img src={Spinner} alt="" style={{ width: "5rem" }} />
            </div>
          )}
        </div>
      </div>
    </>
  )
}
