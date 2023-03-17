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
import { NotificationItem } from "@pushprotocol/uiweb";
import {
  convertAddrCaipToAddress,
  convertAddressToAddrCaip,
  convertAddressToAddrCaipForNotifs,
} from "../../utils/utils";
import Topbar from "../../components/Topbar";
import styled from "styled-components";
import Config from "../../config";
import { useSDKSocket } from "../../context/useSDKSocket.js";
import { FiSearch, FiSliders } from "react-icons/fi";
import { Item } from "../../utils/SharedStyling";
import { useClickAway } from "react-use";
import SearchFilter from "../../components/SearchFilter";
import RefreshContext from "../../context/useRefresh";
import InboxPage from "./InboxPage";
import SpamPage from "./SpamPage";

const Loader = (props) => {
  const { load } = props;
  return (
    <div className={load === "top" ? "loading" : "loadinging"}>
      <img src={Spinner} alt="" style={{ width: "5rem" }} />
    </div>
  );
};

export const Illustration = (props) => {
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
              href="https://app.push.org/"
              target="_blank"
              rel="noreferrer"
              className="link-home"
            >
              app.push.org
            </a>{" "}
            from a <b>Web3 Enabled Browser</b> to opt-in to your favorite{" "}
            <b>channels</b> and start receiving <b>notifications</b>.
          </p>
        )}
      </div>
    </div>
  );
};

export const convertWalletAddress = async (wallet) => {
  if (wallet.includes(":")) {
    let walletTemp = convertAddrCaipToAddress(wallet);
    return walletTemp;
  } else {
    return wallet;
  }
};

export const convertWalletAddressForSocket = async (wallet) => {
  if (wallet.includes(":")) {
    return wallet;
  } else {
    let walletTemp = convertAddressToAddrCaip(wallet);
    return walletTemp;
  }
};

const NavButton = (props) => {
  const { text, onClick, className } = props;
  return (
    <button className={className} onClick={onClick}>
      {text}
    </button>
  );
};

export default function NotificationPage(props) {
  const [loading, setLoading] = useState(false);
  const [wallet, setWallet] = useState("");
  const [addr, setAddr] = useState("");
  const [activeTab, setActiveTab] = useState(false);
  const [object, setObject] = useState("");
  const [bgUpdateLoading, setBgUpdateLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSpam, setPageSpam] = useState(1);
  const [limit, setLimit] = React.useState(10);

  // filter states
  const [showFilter, setShowFilter] = useState(false);
  const [search, setSearch] = useState("");
  const [allNotf, setNotif] = React.useState([]);
  const [allSpam, setSpam] = React.useState([]);
  const [filter, setFilter] = React.useState(false);
  const [allFilter, setAllFilter] = React.useState([]);
  const toggleShowFilter = () => setShowFilter((prev) => !prev);
  const toggleSetActive = () => setActiveTab((prev) => !prev);
  const [loadFilter, setLoadFilter] = React.useState(false);
  const [filteredNotifications, setFilteredNotifications] = React.useState([]);
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
      // callLatestNotifs();
      // fetchAllNotif();
    }
  }, [wallet]);

  const updateWallet = async (wallet) => {
    let walletTemp = await convertWalletAddress(wallet);
    let fh = walletTemp.slice(0, 6);
    let sh = walletTemp.slice(-6);
    let final = fh + "...." + sh;
    setAddr(final);
  };

  // enable socket notifications
  useSDKSocket({
    account: props.wallet,
    chainId: Config.chainID,
    env: Config.env,
  });

  const showInbox = () => {
    setActiveTab(false);
    setShowFilter(false);
    setSearch("");
  };

  const showSpam = () => {
    setActiveTab(true);
    setShowFilter(false);
    setSearch("");
  };

  return (
    <>
      <Transitions3 />
      <div className="standard-page">
        <Topbar />

        <NavBoxHolder>
          <NavHolder>
            <NavTitleButton isActive={!activeTab} onClick={showInbox}>
              Inbox
            </NavTitleButton>
            <NavTitleButton isActive={activeTab} onClick={showSpam}>
              Spam
            </NavTitleButton>
          </NavHolder>
        </NavBoxHolder>

        <div className="feed-content" id="scrollstyle-secondary">
          {!activeTab ? (
            <InboxPage wallet={wallet} setWallet={setWallet} />
          ) : (
            <SpamPage wallet={wallet} setWallet={setWallet} />
          )}
        </div>
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
