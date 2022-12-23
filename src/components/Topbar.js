/*global chrome*/
import React, { useState, useRef, useEffect } from "react";
import { BsX } from "react-icons/bs";
import { Link } from "react-chrome-extension-router";
import AddressPage from "../pages/AddressPage/AddressPage";
import { AiOutlineUserSwitch } from "react-icons/ai";
import Blockies from "react-blockies";
import Image from "../assests/pushlogo.png";
import Tooltip from "../pages/NotificationPage/Tooltip";
// import NotificationPage from "../pages/NotificationPage/NotificationPage";
import styled from "styled-components";
import { convertWalletAddress } from "../pages/NotificationPage/NotificationPage";

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

  const updateWallet = async (wallet) => {
    let walletTemp = await convertWalletAddress(wallet);
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
    <>
      {model && (
        <ModalContent className="modal-content" ref={modalRef}>
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
        </ModalContent>
      )}

      <TopBar className="top-bar">
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
      </TopBar>

      {seen && <Tooltip />}
    </>
  );
};

const ModalContent = styled.div`
  position: fixed;
  top: 55px;
  left: 20px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  border-radius: 5px;
  width: 320px;
  display: inline-block;
  overflow: hidden;
  z-index: 9999;
  height: 85px;
`;

const TopBar = styled.div`
  width: 320px;
  height: 66px;
  padding-left: 20px;
  padding-right: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  border-bottom: 1.5px solid #f5f5f5;
`;

export default Topbar;
