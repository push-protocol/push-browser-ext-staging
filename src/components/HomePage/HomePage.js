/*global chrome*/
import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-chrome-extension-router";
import AddressPage from "../AddressPage/AddressPage";
import { getToken } from "../firebase";
import "./HomePage.css";
import Info from "./Info";
import Circle1 from "../Circle/Circle1";
import Circle2 from "../Circle/Circle2";
import Circle3 from "../Circle/Circle3";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import { BsArrowRight } from "react-icons/bs";
import Image from "../../assests/epnslogo.svg";
import gsap from "gsap";

const useStyles = makeStyles((theme) => ({
  loader: {
    display: "flex",
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
    height: "90%",
    marginTop: "2rem",
  },
}));
export default function Home() {
  const classes = useStyles();
  const [token, setToken] = useState("");

  const tl = gsap.timeline();

  useEffect(() => {
    tl.from("span", 1.8, {
      y: 100,
      ease: "power4.out",
      delay: 0.9,
      skewY: 10,
      opacity: 0,
      stagger: {
        amount: 0.3,
      },
    })
      .to(".span", 1.8, {
        opacity: 1,
      })
      .from(".btn", 1.8, {
        y: -50,
        ease: "power4.out",
        delay: 0.9,
        opacity: 0,
      })
      .to(".btn", 1.8, {
        opacity: 1,
      });
  }, []);

  useEffect(() => {
    getToken().then((res) => {
      setToken(res);
    });
  }, []);

  return (
    <div className="standard-size">
      <div>
        <Circle1 side="left" />
        <Circle2 side="left" />
        <Circle3 side="left" />
      </div>
      <div>
        <div className="icon-page">
          <img src={Image} style={{ width: "40px" }} alt="" />
        </div>

        <div className="text-corner regular">
          <span>
            <span style={{ padding: "4px" }}>
              <span className="colored-text" style={{ color: "#e20880" }}>
                Ethereum{" "}
              </span>
              <span className="colored-text" style={{ color: "#674c9f" }}>
                Push{" "}
              </span>
              <br></br>
              <span className="colored-text" style={{ color: "#674c9f" }}>
                Notification{" "}
              </span>
              <span className="colored-text" style={{ color: "#35c5f3" }}>
                Service{" "}
              </span>
            </span>
          </span>
        </div>
      </div>

      <Info />

      {token && (
        <Link component={AddressPage} props={{ token }}>
          <button className="button hover-effect btn">
            <span className="button-text bold-font">Get Started</span>
            <i className="button-icon">
              <BsArrowRight size={17} />
            </i>
          </button>
        </Link>
      )}
      {!token && (
        <div className={classes.loader}>
          <CircularProgress color="secondary" />
        </div>
      )}
    </div>
  );
}
