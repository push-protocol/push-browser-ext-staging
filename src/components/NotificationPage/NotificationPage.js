/*global chrome*/
import React, { useRef } from "react";
import { AiOutlineUserSwitch, AiFillInfoCircle } from "react-icons/ai";
import {
  BsFillExclamationCircleFill,
  BsFillExclamationOctagonFill,
} from "react-icons/bs";
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
import Checkbox from "@material-ui/core/Checkbox";
import { makeStyles } from "@material-ui/core/styles";
import Blockies from "react-blockies";
import ChannelIcon from "../UI/ChannelIcon";
import "./Notification.css";
import AddressPage from "../AddressPage/AddressPage";
import Transitions3 from "../Transitions/Transitions3";
import Image from "../../assests/epns2.png";
import { BsX } from "react-icons/bs";
import { CircularProgress } from "@material-ui/core";
import Spinner from "../../assests/Spinner.svg";
import Moment from "react-moment";
import { FiClock } from "react-icons/fi";
import { MdMessage } from "react-icons/md";
import { FaInfoCircle } from "react-icons/fa";
import {
  api,
  utils,
  NotificationItem,
} from "@epnsproject/frontend-sdk-staging";

const useStyles = makeStyles((theme) => ({
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
}));
export default function NotificationPage() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [wallet, setWallet] = useState("");
  const [addr, setAddr] = useState("");
  const [object, setObject] = useState("");
  const [model, setModel] = useState(false);
  const [active, setActive] = useState(false);
  const modalRef = useRef();
  useEffect(() => {
    chrome.storage.local.get(["epns"], function (result) {
      if (result.epns) {
        setWallet(result.epns.wallet);
        setObject(result.epns);
      }
    });
    if (wallet) callAPI();
    let walletTemp = wallet;
    let fh = walletTemp.slice(0, 6);
    let sh = walletTemp.slice(-6);
    let final = fh + "...." + sh;
    setAddr(final);
  }, [wallet]);

  const callAPI = async () => {
    if (loading) return;
    setLoading(true);
    const walletAddr = wallet.toLowerCase();

    try {
      const { count, results } = await api.fetchNotifications(
        walletAddr,
        100000,
        1,
        "https://backend-kovan.epns.io/apis"
      );
      const parsedResponse = utils.parseApiResponse(results);
      const map1 = new Map();
      const map2 = new Map();
      results.forEach((each) => {
        map1.set(each.payload.data.sid, each.epoch);
        map2.set(each.payload.data.sid, each.channel);
      });
      parsedResponse.forEach((each) => {
        each.date = map1.get(each.sid);
        each.epoch = new Date(each.date).getTime() / 1000;
        each.channel = map2.get(each.sid);
      });
      setWallet(walletAddr);
      setNotifications(parsedResponse);
      chrome.extension.getBackgroundPage().console.log(count, parsedResponse);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (model && modalRef.current && !modalRef.current.contains(e.target)) {
        setModel(false);
      }
    };

    document.addEventListener("click", checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("click", checkIfClickedOutside);
    };
  }, [model]);

  const classes = useStyles();
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
                setModel(false);
              }}
              id="cross"
            >
              <div id="X">
                <BsX
                  size={24}
                  className=""
                  onClick={() => {
                    setModel(false);
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
          {notifications?.length > 0 && (
            <div className="twin-button regular">
              <button
                className={!active ? "regular" : "none"}
                onClick={() => setActive(false)}
              >
                Inbox
              </button>
              <button
                className={active ? "regular" : "none"}
                onClick={() => setActive(true)}
              >
                Spam
              </button>
            </div>
          )}
        </div>

        {notifications && !loading ? (
          notifications?.length > 0 ? (
            <div className="new-space" style={{ padding: "5px 30px" }}>
              {notifications.map((oneNotification, index) => {
                const { cta, title, message, app, icon, image } =
                  oneNotification;

                // render the notification item
                return (
                  <div key={`${message}+${title}`}>
                    <NotificationItem
                      notificationTitle={title}
                      notificationBody={message}
                      cta={cta}
                      app={app}
                      icon={icon}
                      image={image}
                      // theme={themes.scheme}
                    />
                  </div>
                );
              })}
            </div>
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
                  from a <b>Web3 Enabled Browser</b> to opt-in to your favorite{" "}
                  <b>channels</b> and start receiving <b>notifications</b>.
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
    </>
  );
}
