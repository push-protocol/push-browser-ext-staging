/*global chrome*/
import React from "react";
import { Fragment, useEffect, useState } from "react";
import { Link } from "react-chrome-extension-router";
import AddressPage from "../AddressPage/AddressPage";
import "./DisplayNotice.css";
import Circle1 from "../../components/Circle/Circle1";
import Circle2 from "../../components/Circle/Circle2";
import Circle3 from "../../components/Circle/Circle3";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import { BsArrowRight } from "react-icons/bs";
import Image from "../../assests/pushlogo.png";
import gsap from "gsap";
import { getToken } from "../../components/firebase";
import styled from "styled-components";
import { StandardSize } from "../../utils/SharedStyling";
import Push from "../../assests/push.png";

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

const DisplayInfo = () => {
  const tl = gsap.timeline();

  return (
    <Fragment>
      <div className="box regular text">
        To get started with <b>Push Protocol</b> on Brave Browser:
      </div>
      <p className="link-pages">
        - Go to <b>Settings</b>.
      </p>
      <p className="second-link-page">
        - Check under <b>Privacy & Settings</b>.
      </p>
      <p className="third-link-page">
        - Enable <b>Use Google services for push messaging</b>, and then
        Relaunch the browser.
      </p>
    </Fragment>
  );
};
export default function DisplayNotice() {
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
    <StandardSize>
      <div>
        <Circle1 side="left" />
        <Circle2 side="left" />
        <Circle3 side="left" />
      </div>
      <div>
        <IconPage>
          <img src={Image} style={{ width: "55px" }} alt="" />
          <img src={Push} className="push-color" alt="" />
        </IconPage>
      </div>

      <DisplayInfo />
    </StandardSize>
  );
}

const IconPage = styled.div`
  position: absolute;
  width: 360px;
  top: 250px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
