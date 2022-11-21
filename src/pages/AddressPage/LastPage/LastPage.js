/*global chrome*/
import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-chrome-extension-router";
import { makeStyles } from "@material-ui/core/styles";
import NotificationPage from "../../NotificationPage/NotificationPage";
import "./Last.css";
import { BsArrowRight } from "react-icons/bs";
import { FaCheckCircle } from "react-icons/fa";
import Transitions2 from "../../../components/Transitions/Transitions2";
import gsap from "gsap";
import Spinner from "../../../assests/Spinner.svg";
import Config from "../../../config";

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

  useEffect(() => {
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

    const registerNoAuth = async (object) => {
      const response = await axios.post(
        `${Config.baseURL}/pushtokens/register_no_auth`,
        object
      );
      setLoader(false);
      setStatus(true);
      chrome.storage.local.set({ epns: object }, function () {});
    };

    if (attempting) {
      try {
        registerNoAuth(object);
      } catch (err) {
        console.log(err);
        if (tries > numOfAttempts) {
          attempting = false;
          chrome.extension
            .getBackgroundPage()
            .console.error(
              "EPNS Backend | Request retries failed, Error: ",
              err
            );
        } else {
          chrome.extension
            .getBackgroundPage()
            .console.log(
              "EPNS Backend | Request Failed... Retrying: " +
                tries +
                " / " +
                numOfAttempts
            );
        }
      }
      tries += 1;
    }
  }, []);

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
      <div className="standard-size">
        {loader ? (
          <div className={classes.loader}>
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
            <div>
              <span className="slide-left last-epns-text regular">
                <b>PUSH </b>
                is all setup and ready to rock!
              </span>
            </div>
            <div className="slide-left description-text regular">
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
                from a <b>Web3 Enabled Browser</b> to opt-ins to your favorite{" "}
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
