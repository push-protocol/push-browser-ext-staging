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
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';
import Blockies from 'react-blockies';
import parse from 'html-react-parser';
import ChannelIcon from '../UI/ChannelIcon';
import './Notification.css';
import AddressPage from '../AddressPage/AddressPage';
import { Container } from '../../components/Container';
import { Header, Wallet, FeedBox, FeedHeader, Bottom, Line, FeedBody, NotificationTitle, NotificationBody, FeedItem, ChannelIconStyle, ChannelHeader, TimeStamp, Profile,Popup, Cross, X, Button } from "../../components/NotificationPage"
import {Text} from "../../components/Text"
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
export default function NotificationPage(props) {
  const [notifications, setNotifications] = useState([]);
  const [wallet, setWallet] = useState('');
  const [addr, setAddr] = useState('');
  const [object, setObject] = useState('');
  const [model, setModel] = useState(false);

  useEffect(() => {
    console.log('props');
    console.log(props);
    chrome.storage.local.get(['epns'], function (result) {
      if (result.epns) {
        setWallet(result.epns.active_address);
        setObject(result.epns);
      }
    });
    if (wallet) callAPI();

    let walletTemp = wallet;
    let fh = walletTemp.slice(0, 6);
    let sh = walletTemp.slice(-6);

    let final = fh + '......' + sh;
    setAddr(final);
  }, [wallet]);

  const callAPI = async () => {
    const walletAddr = wallet.toLowerCase();
    const apiURL = 'https://backend-staging.epns.io/apis/feeds/get_feeds';
    const response = await fetch(apiURL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: walletAddr.toLowerCase(),
        page: 1,
        pageSize: 5,
        op: 'read',
      }),
    });
    const resJson = await response.json();
    console.log(resJson)
    setNotifications(resJson.results);
  };

  const classes = useStyles();
  return (
    <Container style={{ marginLeft:" -20px",marginRight: "-20px"}}>
      {model ? (
        <Popup>
          <Cross
            onClick={() => {
              setModel(false);
            }}
          >
            <X>
              <b>X</b>
            </X>
          </Cross>
          {/* <Link component={AddressPage} props={{ object, type: 'renter' }}>
            <button id="add-button">
              <span id="add-button-text">Switch Account</span>
            </button>
          </Link> */}
          <Link
            component={AddressPage} props={{ object, type: 'renter' }}
          >
            <Button>
              <Text switch>Switch Account</Text>
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
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {/* <div id="logo"></div>
          <div id="settings"></div> */}
        </div>
        <div></div>
      </div>

      <FeedBox>
        {notifications && notifications.length!=0 ? (
          notifications.map((notif) => (
            <FeedItem
              key={notif.payload_id}

              style={{
                border:
                  notif.payload.data.acta == '' ? '' : '0.5px solid #35C5F3',
                cursor: notif.payload.data.acta == '' ? '' : 'pointer',
              }}
              onClick={() => {
                if (notif.payload.data.acta) {
                  window.open(notif.payload.data.acta, '_blank')
                }
              }}
            >
              <FeedHeader>
                <ChannelIconStyle>
                  <ChannelIcon url={notif.payload.data.icon} />
                </ChannelIconStyle>
                <ChannelHeader>{notif.payload.data.app}</ChannelHeader>
                {notif.payload.data.type == 2 || notif.payload.type == -2 ? (
                  <div id="channelSecret"></div>
                ) : (
                  <div></div>
                )}
              </FeedHeader>
              <Bottom>
                <Line></Line>
              </Bottom>

              <FeedBody>
                <NotificationTitle>{notif.payload.data.asub}</NotificationTitle>
                <NotificationBody><FormatBody content={notif.payload.data.amsg} time={notif.payload.data.epoch} /></NotificationBody>
              </FeedBody>
            </FeedItem>
          ))
        ) : (
          <div></div>
        )}
      </FeedBox>
    </Container>
  );
}


//Component to fomrat message
const FormatBody = (props) => {
  const data = (props.content.split("\n"))
  let formatedData = "";
  // const timestamp = props.content.match(/\[(timestamp):([^\]]+)\]/i)[2]
  const time = moment(props.time * 1000).format("MMMM Do YYYY | h:mm")
  data.forEach(ele => {

    const splitData = ele.replace(/\s+(?=[^[\]]*\])/g, "").split(" ")
    splitData.forEach(ele1 => {

      if (/\[([^:]+):([^\]]+)\]/i.test(ele1)) {
        if (/\[(d):([^\]]+)\]/i.test(ele1)) { //// default or primary gradient color
          // console.log("d", ele1.match(/\[(s):([^\]]+)\]/i))
          formatedData += `<span style="color:rgba(27.0, 150.0, 227.0, 1.0);font-weight: bold;font-family: Roboto;font-size: 12px;line-height: 14px;">${ele1.match(/\[(d):([^\]]+)\]/i)[2]}</span> `
        }
        if (/\[(t):([^\]]+)\]/i.test(ele1)) { //// third gradient color
          // console.log("t", ele1.match(/\[(s):([^\]]+)\]/i))
          formatedData += `<span style="color:rgba(103.0, 76.0, 159.0, 1.0);font-weight: bold;font-family: Roboto;font-size: 12px;line-height: 14px;">${ele1.match(/\[(t):([^\]]+)\]/i)[2]}</span> `
        }
        if (/\[(s):([^\]]+)\]/i.test(ele1)) {//// secondary gradient color
          // console.log("s", ele1.match(/\[(s):([^\]]+)\]/i))
          formatedData += `<span style="color:rgba(53.0, 197.0, 243.0, 1.0);font-weight: bold;font-family: Roboto;font-size: 12px;line-height: 14px;">${ele1.match(/\[(s):([^\]]+)\]/i)[2]}</span> `
        }
        if (/\[(b):([^\]]+)\]/i.test(ele1)) {//// bold
          // console.log("b", ele.match(/\[(s):([^\]]+)\]/i))
          formatedData += `<span style="font-weight:bold;font-family: Roboto;font-size: 12px;line-height: 14px;">${ele1.match(/\[(b):([^\]]+)\]/i)[2]}</span> `
        }
        if (/\[(i):([^\]]+)\]/i.test(ele1)) {//// italic
          // console.log("b", ele.match(/\[(s):([^\]]+)\]/i))
          formatedData += `<span style="font-style: 'italic':italic;font-family: Roboto;font-size: 12px;line-height: 14px;">${ele1.match(/\[(i):([^\]]+)\]/i)[2]}</span> `
        }
        if(/\[(u):([^\]]+)\]/i.test(ele1)){// url
          formatedData += `<span style=" color:rgba(226.0, 8.0, 128.0, 1.0);font-style:italic;font-weight:bold;font-family: Roboto;font-size: 12px;line-height: 14px;text-decoration: underline;">${ele1.match(/\[(u):([^\]]+)\]/i)[2]}</span> `
        }
        if(/\[(ub):([^\]]+)\]/i.test(ele1)){// url
          formatedData += `<span style=" color:rgba(53.0, 197.0, 243.0, 1.0);font-style:italic;font-weight:bold;font-family: Roboto;font-size: 12px;line-height: 14px;text-decoration: underline;">${ele1.match(/\[(ub):([^\]]+)\]/i)[2]}</span> `
        }
        if(/\[(ut):([^\]]+)\]/i.test(ele1)){// url
          formatedData += `<span style=" color:rgba(103.0, 76.0, 159.0, 1.0);font-style:italic;font-weight:bold;font-family: Roboto;font-size: 12px;line-height: 14px;text-decoration: underline;">${ele1.match(/\[(ut):([^\]]+)\]/i)[2]}</span> `
        }
        if(/\[(up):([^\]]+)\]/i.test(ele1)){// url
          formatedData += `<span style=" color:rgba(226.0, 8.0, 128.0, 1.0);font-style:italic;font-family: Roboto;font-size: 12px;line-height: 14px;text-decoration: underline;">${ele1.match(/\[(up):([^\]]+)\]/i)[2]}</span> `
        }
        if(/\[(e):([^\]]+)\]/i.test(ele1)){// error
          formatedData += `<span style="color:rgba(237.0, 59.0, 72.0, 1.0);font-weight:bold;font-family: Roboto;font-size: 12px;line-height: 14px;text-decoration: underline;">${ele1.match(/\[(e):([^\]]+)\]/i)[2]}</span> `
        }
        else
          if (!/\[([^:]+):([^\]]+)\]/i.test(ele1))
            formatedData += `<span style="font-family: Roboto;font-size: 12px;line-height: 14px;">${ele1}</span> `
      }
      else
        formatedData += `<span style="font-family: Roboto;font-size: 12px;line-height: 14px;">${ele1}</span> `

    })

    formatedData += "<br>"
  })

  return (
    <div>
      <div>{parse(formatedData)}</div>


      <TimeStamp>{time}</TimeStamp>

      {/* {props.content} */}
    </div>
  )
}