/*global chrome*/
import React, { useContext, useRef } from "react";
import { AiOutlineUserSwitch } from "react-icons/ai";
import { BsFillExclamationCircleFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import { Link } from "react-chrome-extension-router";
import { makeStyles } from "@material-ui/core/styles";
import Blockies from "react-blockies";
import ChannelIcon from "../UI/ChannelIcon";
import "./Notification.css";
import AddressPage from "../AddressPage/AddressPage";
import Transitions3 from "../Transitions/Transitions3";
import Image from "../../assests/epnslogo.svg";
import { BsX } from "react-icons/bs";
import Spinner from "../../assests/Spinner.svg";
import { Waypoint } from "react-waypoint";
import NotifsContext from "../../context/useNotifs";
import {
  api,
  utils,
  NotificationItem,
} from "@epnsproject/frontend-sdk-staging";
import Tooltip from "./Tooltip";
import Config from "../../config";

const Loader = (props) => {
  const { load } = props;
  return (
    <div className={load === "top" ? "loading" : "loadinging"}>
      <img src={Spinner} alt="" style={{ width: "5rem" }} />
    </div>
  );
};

const NotifItem = (props) => {
  const { notifs, load, showWayPoint, handlePagination, bgUpdateLoading } =
    props;
  return (
    <div className="new-space" style={{ padding: "5px 30px" }}>
      {notifs.map((oneNotification, index) => {
        const { cta, title, message, app, icon, image, blockchain } =
          oneNotification;
        // render the notification item
        return (
          <div key={index}>
            <NotificationItem
              notificationTitle={title}
              notificationBody={message}
              cta={cta}
              app={app}
              icon={icon}
              image={image}
              chainName={blockchain}
            />
            {showWayPoint(index) && <Waypoint onEnter={handlePagination} />}
          </div>
        );
      })}

      {bgUpdateLoading && <Loader load={load} />}
    </div>
  );
};

const Illustration = (props) => {
  const { text, body } = props;
  return (
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
        <span className="regular">{text}</span>
        {body && (
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
        )}
      </div>
    </div>
  );
};

const NavButton = (props) => {
  const { text, onClick, className } = props;
  return (
    <button className={className} onClick={onClick}>
      {text}
    </button>
  );
};

const NOTIFICATIONS_PER_PAGE = 10;

export default function NotificationPage() {
  const [loading, setLoading] = useState(false);
  const [wallet, setWallet] = useState("");
  const [addr, setAddr] = useState("");
  const [object, setObject] = useState("");
  const [model, setModel] = useState(false);
  const [active, setActive] = useState(false);
  const [bgUpdateLoading, setBgUpdateLoading] = useState(false);
  const [seen, setSeen] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSpam, setPageSpam] = useState(1);
  // eslint-disable-next-line
  const [notifs, setNotifs] = useContext(NotifsContext);
  const modalRef = useRef();
  useEffect(() => {
    chrome.storage.local.get(["epns"], function (result) {
      if (result.epns) {
        setWallet(result.epns.wallet);
        setObject(result.epns);
      }
    });
    if (wallet) {
      updateWallet(wallet);
      callLatestNotifs();
    }
  }, [wallet]);

  const updateWallet = (wallet) => {
    let walletTemp = wallet;
    let fh = walletTemp.slice(0, 6);
    let sh = walletTemp.slice(-6);
    let final = fh + "...." + sh;
    setAddr(final);
  };

  const callNotifs = async () => {
    setBgUpdateLoading(true);
    const walletAddr = wallet.toLowerCase();

    try {
      const { count, results } = await api.fetchNotifications(
        walletAddr,
        NOTIFICATIONS_PER_PAGE,
        page,
        Config.baseURL
      );

      const parsedResponse = utils.parseApiResponse(results);
      setNotifs((x) => [...x, ...parsedResponse]);
    } catch (err) {
      console.log(err);
    } finally {
      setBgUpdateLoading(false);
      setLoading(false);
    }
  };

  const callLatestNotifs = async () => {
    setLoading(true);
    const walletAddr = wallet.toLowerCase();

    try {
      const { count, results } = await api.fetchNotifications(
        walletAddr,
        NOTIFICATIONS_PER_PAGE,
        1,
        Config.baseURL
      );

      if (!notifs.length) {
        setPage(page + 1);
      }
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
      setNotifs([...parsedResponse]);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchSpam = async () => {
    setBgUpdateLoading(true);
    const walletAddr = wallet.toLowerCase();

    try {
      const { count, results } = await api.fetchSpamNotifications(
        walletAddr,
        NOTIFICATIONS_PER_PAGE,
        pageSpam,
        Config.baseURL
      );
      const parsedResponse = utils.parseApiResponse(results);

      setNotifs((x) => [...x, ...parsedResponse]);
    } catch (err) {
      console.log(err);
    } finally {
      setBgUpdateLoading(false);
      setLoading(false);
    }
  };

  const fetchLatestSpam = async () => {
    setLoading(true);
    const walletAddr = wallet.toLowerCase();

    try {
      const { count, results } = await api.fetchSpamNotifications(
        walletAddr,
        NOTIFICATIONS_PER_PAGE,
        1,
        Config.baseURL
      );

      if (!notifs.length) {
        setPageSpam(pageSpam + 1);
      }

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
      setNotifs([...parsedResponse]);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (active) {
      if (wallet) fetchLatestSpam();
    } else {
      if (wallet) callLatestNotifs();
    }
  }, [active]);

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

  //function to query more notifications
  const handlePagination = async () => {
    if (active) {
      fetchSpam();
      setPageSpam(pageSpam + 1);
    } else {
      callNotifs();
      setPage(page + 1);
    }
  };

  const showWayPoint = (index) => {
    return Number(index) === notifs.length - 1 && !loading;
  };

  const makeActive = (status) => {
    setActive(status);
    setNotifs([]);
  };

  return (
    <>
      <Transitions3 />
      <div className="standard">
        {model && (
          <div className="modal-content" ref={modalRef}>
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
          <div
            className="icon-topbar"
            onMouseOver={() => setSeen(true)}
            onMouseLeave={() => setSeen(false)}
          >
            <img src={Image} className="actual-image" alt="" />
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

        {seen && <Tooltip />}

        <div className="feedBox">
          <div className="twin-button regular">
            <NavButton
              text="Inbox"
              className={!active ? "regular" : "none"}
              onClick={() => makeActive(false)}
            />
            <NavButton
              text="Spam"
              className={active ? "regular" : "none"}
              onClick={() => makeActive(true)}
            />
          </div>
        </div>

        {active ? (
          <>
            {notifs && !loading ? (
              notifs?.length > 0 ? (
                <NotifItem
                  notifs={notifs}
                  load="bottom"
                  showWayPoint={showWayPoint}
                  handlePagination={handlePagination}
                  bgUpdateLoading={bgUpdateLoading}
                />
              ) : (
                <Illustration text="NO SPAM NOTIFICATIONS!" body={false} />
              )
            ) : (
              <Loader load="top" />
            )}
          </>
        ) : (
          <>
            {notifs && !loading ? (
              notifs?.length > 0 ? (
                <NotifItem
                  notifs={notifs}
                  load="bottom"
                  showWayPoint={showWayPoint}
                  handlePagination={handlePagination}
                  bgUpdateLoading={bgUpdateLoading}
                />
              ) : (
                <Illustration text="NO NOTIFICATIONS YET!" body={true} />
              )
            ) : (
              <Loader load="top" />
            )}
          </>
        )}
      </div>
    </>
  );
}
