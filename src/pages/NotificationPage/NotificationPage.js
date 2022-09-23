/*global chrome*/
import React, { useContext, useRef } from "react";
import { BsFillExclamationCircleFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import "./Notification.css";
import Transitions3 from "../../components/Transitions/Transitions3";
import Spinner from "../../assests/Spinner.svg";
import { Waypoint } from "react-waypoint";
import NotifsContext from "../../context/useNotifs";
import { NotificationItem } from "@epnsproject/sdk-uiweb";
import * as EpnsAPI from "@epnsproject/sdk-restapi";
import { convertAddressToAddrCaip } from "../../utils/utils";
import Topbar from "../../components/Topbar";
import styled from "styled-components";
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
        const { cta, title, message, app, icon, image, blockchain, url } =
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
              url={url}
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
  const [active, setActive] = useState(false);
  const [object, setObject] = useState("");
  const [bgUpdateLoading, setBgUpdateLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSpam, setPageSpam] = useState(1);
  // eslint-disable-next-line
  const [notifs, setNotifs] = useContext(NotifsContext);
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
    let user = convertAddressToAddrCaip(walletAddr, 42);

    try {
      const results = await EpnsAPI.user.getFeeds({
        user: user, // user address in CAIP
        // raw: true,
        env: Config.env,
        page: page,
        limit: NOTIFICATIONS_PER_PAGE,
      });
      const parsedResponse = await results;
      setNotifs((x) => [...x, ...parsedResponse]);
    } catch (err) {
      console.log(err);
    } finally {
      setBgUpdateLoading(false);
      setLoading(false);
    }
  };

  const fetchSpam = async () => {
    setBgUpdateLoading(true);
    const walletAddr = wallet.toLowerCase();
    let user = convertAddressToAddrCaip(walletAddr, 42);

    try {
      const results = await EpnsAPI.user.getFeeds({
        user: user, // user address in CAIP
        env: Config.env,
        page: pageSpam,
        limit: NOTIFICATIONS_PER_PAGE,
        spam: true,
      });
      const parsedResponse = await results;
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
    let user = convertAddressToAddrCaip(walletAddr, 42);

    try {
      const results = await EpnsAPI.user.getFeeds({
        user: user, // user address in CAIP
        env: Config.env,
        page: 1,
        limit: NOTIFICATIONS_PER_PAGE,
      });
      if (!notifs.length) {
        setPage(page + 1);
      }
      const parsedResponse = await results;
      setWallet(walletAddr);
      setNotifs([...parsedResponse]);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchLatestSpam = async () => {
    setLoading(true);
    const walletAddr = wallet.toLowerCase();
    let user = convertAddressToAddrCaip(walletAddr, 42);

    try {
      const results = await EpnsAPI.user.getFeeds({
        user: user, // user address in CAIP
        env: Config.env,
        page: 1,
        limit: NOTIFICATIONS_PER_PAGE,
        spam: true,
      });

      if (!notifs.length) {
        setPageSpam(pageSpam + 1);
      }

      const parsedResponse = await results;
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

  const toggleSetActive = () => setActive((prev) => !prev);

  const handleToggle = () => {
    toggleSetActive();
  };

  return (
    <>
      <Transitions3 />
      <div className="standard">
        <Topbar />

        {/* <div className="feedBox">
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
        </div> */}

        <NavBoxHolder>
          <NavHolder>
            <NavTitleButton isActive={!active} onClick={handleToggle}>
              Inbox
            </NavTitleButton>
            <NavTitleButton isActive={active} onClick={handleToggle}>
              Spam
            </NavTitleButton>
          </NavHolder>
        </NavBoxHolder>

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

const NavBoxHolder = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: relative;

  :after {
    position: absolute;
    height: 1.5px;
    left: 0;
    bottom: 0;
    width: 100%;
    content: "";
    background-color: #e4e8ef;
  }
`;

const NavHolder = styled.div`
  display: flex;
  align-self: flex-end;
  padding-bottom: 15px;
  padding-top: 15px;
`;

const NavTitleButton = styled.div`
  width: 180px;
  height: 25px;
  font-style: normal;
  font-weight: ${(props) => (props.isActive ? "600" : "500")};
  font-size: 18px;
  line-height: 25.4px;
  text-align: center;
  position: relative;
  color: ${(props) => (props.isActive ? "#CF1C84" : "#000000")};
  cursor: pointer;

  ${(props) =>
    props.isActive &&
    `&:after{
        position: absolute;
        height: 1.5px;
        left: 0;
        bottom: -15px;
        width: 100%;
        content: '';
        background-color: #CF1C84;
        z-index: 1;
        
    }`}
`;
