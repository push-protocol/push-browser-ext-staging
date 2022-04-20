/*global chrome*/
import React from "react";
import axios from "axios";
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
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import Circle1 from "../Circle/Circle1";
import Circle2 from "../Circle/Circle2";
import Circle3 from "../Circle/Circle3";
import NotificationPage from "../NotificationPage/NotificationPage";
import "./Last.css";
import { BsArrowRight } from "react-icons/bs";
import { FaCheckCircle } from "react-icons/fa";
import Transitions2 from "../Transitions/Transitions2";
import gsap from "gsap";
import Spinner from "../../assests/Spinner.svg";

const useStyles = makeStyles((theme) => ({
  loader: {
    display: "flex",
    justifyContent: "center",
    height: "100%",
    alignItems: "center",
  },
}));

export default function LastPage(props) {
  const classes = useStyles();
  const [status, setStatus] = useState(null);
  const [loader, setLoader] = useState(true);

  useEffect(async () => {
    const address = props.address;
    // const password=props.password
    const token = props.token;
    const object = {
      op: "register",
      wallet: address.toLowerCase(),
      device_token: token,
      platform: "web",
    };
    const numOfAttempts = 3;
    let tries = 1;
    let attempting = true;
    while (attempting) {
      try {
        const response = await axios.post(
          "https://backend-kovan.epns.io/apis/pushtokens/register_no_auth",
          object
        );
        setLoader(false);
        setStatus(true);
        chrome.storage.local.set({ epns: object }, function () {});
      } catch (err) {
        if (tries > numOfAttempts) {
          // attempting = false;
          // chrome.extension
          //   .getBackgroundPage()
          //   .console.error(
          //     "EPNS Backend | Request retries failed, Error: ",
          //     err
          //   );
        } else {
          // chrome.extension
          //   .getBackgroundPage()
          //   .console.log(
          //     "EPNS Backend | Request Failed... Retrying: " +
          //       tries +
          //       " / " +
          //       numOfAttempts
          //   );
        }
      }
      tries = tries + 1;
    }
  }, []);
  //0x25ccED8002Da0934b2FDfb52c98356EdeBBA00B9

  const tl = gsap.timeline();

  useEffect(() => {
    tl.from(".slide-left", 1.3, {
      x: 100,
      ease: "power4.out",
      delay: 0.5,
      opacity: 0,
      stagger: {
        amount: 0.2,
      },
    }).to(".slide-left", 1.3, {
      opacity: 1,
    });
  }, []);

  return (
    <>
      {!loader && <Transitions2 />}
      <div style={{ height: "600px", width: "360px" }}>
        {loader ? (
          <div className={classes.loader}>
            {/* <CircularProgress color="secondary" /> */}
            <img src={Spinner} alt="" style={{ width: "5rem" }} />
          </div>
        ) : status ? (
          <div className="">
            <div id="congrats">
              <p className="congrats-text bold-font">
                <b>Congratulations!</b>
              </p>
            </div>

            <div className="check-test">
              <FaCheckCircle
                size={140}
                // color="#008000"
                color="#18A009"
                style={{
                  border: "1px solid #d6d3d1",
                  borderRadius: "100%",
                  padding: "1px",
                }}
              />
            </div>
            {/* <div>
          <Circle1 side="center" />
          <Circle2 side="center" />
          <Circle3 side="center" />
          <div id="check-icon"></div>
        </div> */}
            <div>
              <span className="slide-left last-epns-text regular">
                <b>EPNS </b>
                is all setup and ready to rock!
              </span>
            </div>
            <div className="slide-left description-text regular">
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
                from a <b>Web3 Enabled Browser</b> to subscribe to your favorite{" "}
                <b>channels</b> and start receiving <b>notifications</b>.
              </p>
            </div>
            <Link component={NotificationPage}>
              <button className="button hover-effect">
                <span className="button-text bold-font">Continue</span>
                <i className="button-icon">
                  <BsArrowRight size={17} />
                </i>
              </button>
            </Link>
          </div>
        ) : (
          <div>
            <h2>Something Went Wrong</h2>
          </div>
        )}
      </div>
    </>
  );
}
