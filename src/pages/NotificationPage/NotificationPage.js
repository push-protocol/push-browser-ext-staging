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
import * as PushAPI from "@pushprotocol/restapi";
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

const NOTIFICATIONS_PER_PAGE = 10;

export default function NotificationPage(props) {
  const [loading, setLoading] = useState(false);
  const [wallet, setWallet] = useState("");
  const [addr, setAddr] = useState("");
  const [active, setActive] = useState(false);
  const [object, setObject] = useState("");
  const [bgUpdateLoading, setBgUpdateLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSpam, setPageSpam] = useState(1);

  // filter states
  const [showFilter, setShowFilter] = useState(false);
  const [search, setSearch] = useState("");
  const [allNotf, setNotif] = React.useState([]);
  const [allSpam, setSpam] = React.useState([]);
  const [filter, setFilter] = React.useState(false);
  const [allFilter, setAllFilter] = React.useState([]);
  const toggleShowFilter = () => setShowFilter((prev) => !prev);
  const toggleSetActive = () => setActive((prev) => !prev);
  const [loadFilter, setLoadFilter] = React.useState(false);
  const [filteredNotifications, setFilteredNotifications] = React.useState([]);
  // eslint-disable-next-line
  const [notifs, setNotifs] = useContext(NotifsContext);
  const [refresh, setRefresh] = useContext(RefreshContext);
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
      fetchAllNotif();
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
    env: "staging",
  });

  const callNotifs = async () => {
    setBgUpdateLoading(true);

    const addressChain = convertAddressToAddrCaipForNotifs(
      wallet,
      Config.chainID
    );

    try {
      const results = await PushAPI.user.getFeeds({
        user: addressChain, // user address in CAIP
        raw: true,
        env: Config.env,
        page: page,
        limit: NOTIFICATIONS_PER_PAGE,
        raw: true,
      });
      const parsedResponse = PushAPI.utils.parseApiResponse(results);
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

    const addressChain = convertAddressToAddrCaipForNotifs(
      wallet,
      Config.chainID
    );

    try {
      const results = await PushAPI.user.getFeeds({
        user: addressChain, // user address in CAIP
        env: Config.env,
        page: pageSpam,
        limit: NOTIFICATIONS_PER_PAGE,
        spam: true,
        raw: true,
      });
      const parsedResponse = PushAPI.utils.parseApiResponse(results);
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

    const addressChain = convertAddressToAddrCaipForNotifs(
      wallet,
      Config.chainID
    );

    try {
      const results = await PushAPI.user.getFeeds({
        user: addressChain, // user address in CAIP
        env: Config.env,
        page: 1,
        limit: NOTIFICATIONS_PER_PAGE,
        raw: true,
      });
      if (!notifs.length) {
        setPage(page + 1);
      }
      const parsedResponse = PushAPI.utils.parseApiResponse(results);
      setWallet(wallet);
      setNotifs([...parsedResponse]);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchLatestSpam = async () => {
    setLoading(true);

    const addressChain = convertAddressToAddrCaipForNotifs(
      wallet,
      Config.chainID
    );

    try {
      const results = await PushAPI.user.getFeeds({
        user: addressChain, // user address in CAIP
        env: Config.env,
        page: 1,
        limit: NOTIFICATIONS_PER_PAGE,
        spam: true,
        raw: true,
      });

      if (!notifs.length) {
        setPageSpam(pageSpam + 1);
      }

      const parsedResponse = PushAPI.utils.parseApiResponse(results);
      setWallet(wallet);
      setNotifs([...parsedResponse]);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllNotif = async () => {
    const addressChain = convertAddressToAddrCaipForNotifs(
      wallet,
      Config.chainID
    );

    try {
      const results = await PushAPI.user.getFeeds({
        user: addressChain, // user address in CAIP
        env: Config.env,
        limit: 100000,
        page: 1,
        raw: true,
      });

      const parsedResponse = PushAPI.utils.parseApiResponse(results);
      const map1 = new Map();
      const map2 = new Map();
      results.forEach((each) => {
        map1.set(each.payload.data.sid, each.epoch);
        map2.set(each.payload.data.sid, each.sender);
      });
      parsedResponse.forEach((each) => {
        each["date"] = map1.get(each.sid);
        each["epoch"] = new Date(each["date"]).getTime() / 1000;
        each["channel"] = map2.get(each.sid);
      });
      setNotif([...parsedResponse]);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchAllSpamNotif = async () => {
    const addressChain = convertAddressToAddrCaipForNotifs(
      wallet,
      Config.chainID
    );

    try {
      const results = await PushAPI.user.getFeeds({
        user: addressChain, // user address in CAIP
        env: Config.env,
        limit: 100000,
        page: 1,
        raw: true,
        spam: true,
      });

      const parsedResponse = PushAPI.utils.parseApiResponse(results);
      const map1 = new Map();
      const map2 = new Map();
      results.forEach((each) => {
        map1.set(each.payload.data.sid, each.epoch);
        map2.set(each.payload.data.sid, each.sender);
      });
      parsedResponse.forEach((each) => {
        each["date"] = map1.get(each.sid);
        each["epoch"] = new Date(each["date"]).getTime() / 1000;
        each["channel"] = map2.get(each.sid);
      });
      setNotif([...parsedResponse]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (active) {
      if (wallet) fetchLatestSpam();
      fetchAllSpamNotif();
    } else {
      if (wallet) callLatestNotifs();
      fetchAllNotif();
    }
  }, [active]);

  useEffect(() => {
    if (search.length === 0) {
      // setNotif([]);
      reset();
      if (active) {
        if (wallet) fetchLatestSpam();
      } else {
        if (wallet) callLatestNotifs();
      }
    }
  }, [active, search]);

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

  const handleToggle = () => {
    toggleSetActive();
    setShowFilter(false);
    setSearch("");
  };

  const modalRef = React.useRef(null);
  useClickAway(modalRef, () => showFilter && setShowFilter(false));

  const reset = () => setFilter(false);
  const filterNotifications = async (query, channels, startDate, endDate) => {
    if (startDate == null) startDate = new Date("January 1, 2000");
    if (endDate == null) endDate = new Date("January 1, 3000");
    startDate = startDate.getTime() / 1000;
    endDate = endDate.getTime() / 1000;

    if (loading) return;
    setLoading(true);
    setFilter(true);
    var Filter = {
      channels: channels,
      date: { lowDate: startDate, highDate: endDate },
    };
    if (channels.length == 0) delete Filter.channels;

    setFilteredNotifications([]);
    try {
      let filterNotif = [];
      for (const notif of allNotf) {
        let timestamp;
        const matches = notif.message.match(/\[timestamp:(.*?)\]/);
        if (matches) {
          timestamp = matches[1];
        } else timestamp = notif.epoch;
        if (
          (Filter.channels === undefined
            ? true
            : Filter.channels.includes(notif.channel)) &&
          timestamp >= startDate &&
          timestamp <= endDate &&
          (query === "" ||
            notif.message.toLowerCase().includes(query.toLowerCase()))
        )
          filterNotif.push(notif);
      }
      const newNotifs = filterNotif;
      setAllFilter(newNotifs);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
      setShowFilter(false);
    }
  };

  React.useEffect(() => {
    setFilteredNotifications(allFilter);
  }, [allFilter]);

  React.useEffect(() => {
    if (refresh) {
      if (active) {
        if (wallet) fetchLatestSpam();
      } else {
        if (wallet) callLatestNotifs();
      }
    }
    setRefresh(false);
  }, [refresh]);

  return (
    <>
      <Transitions3 />
      <div className="standard">
        <Topbar />

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

        <SearchContainer>
          <SearchBar
            type="text"
            className="input"
            placeholder="Search Notification"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <ItemIcon position="absolute" top="0" bottom="0" left="22px">
            <FiSearch size={18} style={{ color: "#657795" }} />
          </ItemIcon>

          <ItemIconRotate
            position="absolute"
            top="0"
            bottom="0"
            right="22px"
            onClick={toggleShowFilter}
          >
            <FiSliders size={18} style={{ color: "#657795" }} />
          </ItemIconRotate>
        </SearchContainer>

        <div ref={modalRef}>
          <SearchFilter
            notifications={allNotf}
            filterNotifications={filterNotifications}
            filter={filter}
            reset={reset}
            loadFilter={loadFilter}
            showFilter={showFilter}
            setShowFilter={setShowFilter}
            search={search}
            setSearch={setSearch}
          />
        </div>

        {filter ? (
          <>
            {filter && !loading ? (
              allFilter?.length > 0 ? (
                <NotifItem
                  notifs={filteredNotifications}
                  load="bottom"
                  showWayPoint={showWayPoint}
                />
              ) : (
                <div className="no-item">No items match your search</div>
              )
            ) : (
              <Loader load="top" />
            )}
          </>
        ) : active ? (
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

// css styles
const SearchContainer = styled(Item)`
  position: relative;
  max-width: 496px;
  min-width: 320px;
  width: 80%;
  box-sizing: border-box;
  margin: 10px auto;
`;

const SearchBar = styled.input`
  width: 100%;
  height: 44px;
  padding-left: 50px;
  border-radius: 99px;
  border: none;
  background: #f4f5fa;
  color: #657795;

  box-sizing: border-box;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;

  input[type="reset"] {
    display: none;
  }
  &::placeholder {
    color: #657795;
  }
  &:hover,
  &:active,
  &:focus {
    outline: none;
  }
  &:focus {
    // border: 1px solid #ec008c;
  }
`;

const ItemIcon = styled(Item)`
  cursor: pointer;
`;

const ItemIconRotate = styled(Item)`
  cursor: pointer;
  transform: rotate(90deg);
`;
