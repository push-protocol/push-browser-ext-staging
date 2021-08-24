/*global chrome*/
import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  goBack,
  goTo,
  popToTop,
  Link,
  Router,
  getCurrent,
  getComponentStack,
} from 'react-chrome-extension-router';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import Circle1 from '../Circle/Circle1';
import Circle2 from '../Circle/Circle2';
import Circle3 from '../Circle/Circle3';
import NotificationPage from '../NotificationPage/NotificationPage';
import './Last.css';
import { Container } from '../../components/Container';
import { Box, Congrats, Description, Button } from '../../components/LastPage';
import { Text } from '../../components/Text';
const useStyles = makeStyles((theme) => ({
  loader: {
    display: 'flex',
    justifyContent: 'center',
    height: '100%',
    alignItems: 'center',
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
      op: 'register',
      wallet: address.toLowerCase(),
      device_token: token,
      platform: 'web',
    };

    console.log('Trying to register object %o', object);

    const numOfAttempts = 3;
    let tries = 1;
    let attempting = true;

    while (attempting) {
      try {
        const response = await axios.post(
          'https://backend-staging.epns.io/apis/pushtokens/register_no_auth',
          object
        );

        setLoader(false);
        setStatus(true);
        const userObject = {
          wallets: [address],
          device_token: token,
          active_address: address,
        };
        chrome.storage.local.set({ epns: userObject }, function () { });
      } catch (err) {
        if (tries > numOfAttempts) {
          attempting = false;
          console.error('EPNS Backend | Request retries failed, Error: ', err);
        } else {
          console.log(
            'EPNS Backend | Request Failed... Retrying: ' +
            tries +
            ' / ' +
            numOfAttempts
          );
        }
      }

      tries = tries + 1;
    }
  }, []);
  //0x25ccED8002Da0934b2FDfb52c98356EdeBBA00B9

  return (
    <Container>
      {loader ? (
        <div className={classes.loader}>
          <CircularProgress color="secondary" />
        </div>
      ) : status ? (
        <div>
          <Congrats>
            <b>Congrats!</b>
          </Congrats>
          <div>
            <Circle1 side="center" />
            <Circle2 side="center" />
            <Circle3 side="center" />
            <div id="check-icon"></div>
          </div>
          <div>
            <Box>
              <b>EPNS</b> is all setup and ready to rock!
            </Box>
          </div>
          <Description>

            Visit <Text pinkSmall>app.epns.io</Text> from a{' '}
            <b>Web3 Enabled Browser</b> to subscribe to
            your favorite <b>dApp channels</b> and start
            receiving <b>messages</b>.

          </Description>
          <Link component={NotificationPage}>
            <Button>Complete Setup!</Button>
          </Link>
        </div>
      ) : (
        <div>
          <h2>Something Went Wrong</h2>
        </div>
      )}
    </Container>
  );
}
