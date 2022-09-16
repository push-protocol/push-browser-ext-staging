import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-chrome-extension-router";
import { getToken } from "../../components/firebase";
import "./WelcomeBackPage.css";
import Circle1 from "../../components/Circle/Circle1";
import Circle2 from "../../components/Circle/Circle2";
import Circle3 from "../../components/Circle/Circle3";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import { BsArrowRight } from "react-icons/bs";
import Image from "../../assests/epnslogo.svg";
import NotificationPage from "../NotificationPage/NotificationPage";

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

const WelcomeBackPage = () => {
  const classes = useStyles();
  const [token, setToken] = useState("");
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

      <h1 className="welcome-text regular-font">Welcome Back!</h1>

      {token && (
        <Link component={NotificationPage}>
          <button className="button hover-effect">
            <span className="button-text bold-font">Continue</span>
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
};

export default WelcomeBackPage;
