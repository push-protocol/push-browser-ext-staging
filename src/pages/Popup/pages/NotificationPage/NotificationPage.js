/*global chrome*/
import React from 'react';
import { useEffect, useState, useRef } from 'react';
import {
  goBack,
  goTo,
  popToTop,
  Link,
  Router,
  getCurrent,
  getComponentStack,
} from 'react-chrome-extension-router';
import moment from "moment";
import TrashImg from "./bin_1.png";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { api, utils, NotificationItem } from "@epnsproject/frontend-sdk-staging";
import { makeStyles } from '@material-ui/core/styles';
import Blockies from 'react-blockies';
import parse from 'html-react-parser';
import ChannelIcon from '../UI/ChannelIcon';
import './Notification.css';
import { AiOutlineClose } from 'react-icons/ai'
import AddressPage from '../AddressPage/AddressPage';
import { Container } from '../../components/Container';
import Avatar from '@mui/material/Avatar';
import { Header, Wallet, FeedBox, FeedHeader, Bottom, Line, FeedBody, NotificationTitle, NotificationBody, FeedItem, ChannelIconStyle, ChannelHeader, TimeStamp, Profile, Popup, Cross, X, Button } from "../../components/NotificationPage"
import { Text } from "../../components/Text"
const useStyles = makeStyles((theme) => ({
  input1: {
    '& > *': {
      position: 'absolute',
      width: '300px',
      height: '40px',
      left: '30px',
      top: '311px',
    },
  },
  input2: {
    '& > *': {
      position: 'absolute',
      width: '300px',
      height: '40px',
      left: '30px',
      top: '381px',
    },
  },
  checkbox: {
    '& > *': {
      position: 'absolute',
      left: '10.33%',
      right: '86.67%',
      top: '74.17%',
    },
  },
}));
const NotificationPerPage = 100000;
export default function NotificationPage(props) {
  const [notifications, setNotifications] = useState([]);
  const [wallet, setWallet] = useState('');
  const [addr, setAddr] = useState('');
  const [object, setObject] = useState('');
  const [model, setModel] = useState(false);
  const [indexVal, setIndexVal] = React.useState(0);
  const [spamNotifications, setSpamNotifications] = useState([]);

  const handleChange = (event, newValue) => {
    setIndexVal(newValue);
  };
  useEffect(() => {
    console.log('props');
    console.log(props);
    chrome.storage.local.get(['epns'], function (result) {
      if (result.epns) {
        setWallet(result.epns.active_address);
        setObject(result.epns);
      }
    });
    if (wallet) {
      callAPI();
      callSpamAPI();
    }
    let walletTemp = wallet;
    let fh = walletTemp.slice(0, 6);
    let sh = walletTemp.slice(-6);

    let final = fh + '......' + sh;
    setAddr(final);
  }, [wallet]);
  const callAPI = async () => {
    const { count, results } = await api.fetchNotifications(wallet, NotificationPerPage, 1)
    console.log(count, results, 'feed');
    const parsedResponse = utils.parseApiResponse(results);
    setNotifications(parsedResponse);

  }

  const callSpamAPI = async () => {

    const { count, results } = await api.fetchSpamNotifications(wallet, NotificationPerPage, 1, "https://backend-kovan.epns.io/apis")
    console.log(count, results, 'spam');
    const parsedResponseSpam = utils.parseApiResponse(results);
    setSpamNotifications(parsedResponseSpam);

  }
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  const classes = useStyles();
  return (
    <Container style={{ marginLeft: " -20px", marginRight: "-20px" }}>
      {model ? (
        <Popup>

          <AiOutlineClose style={{ cursor: "pointer" }} size="1.2rem" onClick={() => {
            setModel(false);
          }} />
          <Link
            style={{ width: "100%", display: "flex", flex: "2", justifyContent: "center", alignItems: "center", textDecoration: "none" }}
            component={AddressPage} props={{ object, type: 'renter' }}
          >
            <Button >
              <Text switch style={{ cursor: "pointer" }}>Switch Account</Text>
            </Button>
          </Link>
        </Popup>
      ) : null}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          marginTop: '15px',
        }}
      >
        <Profile
          onClick={() => {
            setModel(true);
          }}
        >
          <Blockies seed={wallet} size={10} scale={3} className="identicon rounded" />
        </Profile>
        <Header>
          <Wallet>{addr}</Wallet>
        </Header>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {/* <div id="logo"></div>
          <div id="settings"></div> */}
        </div>

      </div>

      {notifications && notifications.length != 0 ? (
        <FeedBox>
          <div className="FeedBoxBar">
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={indexVal} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="FeedBox" {...a11yProps(0)} />
              </Tabs>
              {/* <Tab
                  // icon={<Avatar src="../../assests/img/bin_1.png" />}
                  component={() => (
                    <Button onClick={() => setValue(0)}>
                      <Avatar src="../../assests/img/bin_1.png" />
                    </Button>
                  )}
                  {...a11yProps(1)}
                /> */}

            </Box>

            <div className="TrashImg" onClick={() => { setIndexVal(1) }}>
              <img src={TrashImg} />
            </div>



          </div>
          {indexVal == 0 && notifications && notifications.length != 0 ? (
            notifications.map((oneNotification) => (
              <NotificationItem
                notificationTitle={oneNotification.title}
                notificationBody={oneNotification.message}
                cta={oneNotification.cta}
                app={oneNotification.app}
                icon={oneNotification.icon}
                image={oneNotification.image}
                url={oneNotification.url}
              />
            ))
          ) : (
            <div>

            </div>
          )}
          {indexVal == 1 && spamNotifications && spamNotifications.length != 0 ? (
            spamNotifications.map((oneNotification) => (
              <NotificationItem
                notificationTitle={oneNotification.title}
                notificationBody={oneNotification.message}
                cta={oneNotification.cta}
                app={oneNotification.app}
                icon={oneNotification.icon}
                image={oneNotification.image}
                url={oneNotification.url}
              />
            ))
          ) : (
            <div>

            </div>
          )}
        </FeedBox>) :
        <div style={{ height: "100%", width: "100%", marginLeft: "30%", marginTop: "15%" }}>
          <div id="feeds-icon">

          </div>
          <div style={{ color: "rgba(200.0, 200.0, 200.0, 1)", fontFamily: "Roboto", fontSize: "14px", marginLeft: "2%" }}>
            No Notifications!!
          </div>
        </div>
      }
    </Container>
  );

}