/*global chrome*/
import React, { useState, useRef, useEffect } from "react";
import { BsX } from "react-icons/bs";
import { Link } from "react-chrome-extension-router";
import AddressPage from "../pages/AddressPage/AddressPage";
import { AiOutlineUserSwitch } from "react-icons/ai";
import Blockies from "react-blockies";
import Image from "../assests/epnslogo.svg";
import Tooltip from "../pages/NotificationPage/Tooltip";
import NotificationPage from "../pages/NotificationPage/NotificationPage";
import { BsChatLeft, BsBell } from "react-icons/bs";
import ChatPage from "../pages/ChatPage/ChatPage";

const Topbar = () => {
  const [seen, setSeen] = useState(false);
  const [model, setModel] = useState(false);
  const [object, setObject] = useState("");
  const modalRef = useRef();
  const [wallet, setWallet] = useState("");
  const [addr, setAddr] = useState("");

  useEffect(() => {
    chrome.storage.local.get(["epns"], function (result) {
      if (result.epns) {
        setWallet(result.epns.wallet);
        setObject(result.epns);
      }
    });
    if (wallet) {
      updateWallet(wallet);
    }
  }, [wallet]);

  const updateWallet = (wallet) => {
    let walletTemp = wallet;
    let fh = walletTemp.slice(0, 6);
    let sh = walletTemp.slice(-6);
    let final = fh + "...." + sh;
    setAddr(final);
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

  return (
    <div>
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

          <div className="">
            <Link
              style={{
                textDecoration: "none",
              }}
              component={NotificationPage}
              props={{ object, type: "renter" }}
            >
              <button className="switch-button">
                <BsBell fontSize={22} color="#ffff" className="icon" />
                <p className="switch-button-text regular-font">Inbox</p>
              </button>
            </Link>
          </div>

          <div className="">
            <Link
              style={{
                textDecoration: "none",
              }}
              component={ChatPage}
              props={{ object, type: "renter" }}
            >
              <button className="switch-button">
                <BsChatLeft fontSize={20} color="#ffff" className="icon" />
                <p className="switch-button-text regular-font">Chat</p>
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
            <Blockies seed={wallet} size={7} scale={5} className="identicon" />
          </div>
        </div>
      </div>

      {seen && <Tooltip />}
    </div>
  );
};

export default Topbar;
