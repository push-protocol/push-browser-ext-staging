/*global chrome*/
// React + Web3 Essentials
import { useContext, useEffect, useState } from "react";

// Internal Components
import { createSocketConnection, EVENTS } from "@pushprotocol/socket";
import { convertAddressToAddrCaipForNotifs } from "../utils/utils";
import NotifsContext from "./useNotifs";

export const useSDKSocket = ({ account, env, chainId }) => {
  const [notifs, setNotifs] = useContext(NotifsContext);
  const [sdkSocket, setSDKSocket] = useState(null);
  const [isSDKSocketConnected, setIsSDKSocketConnected] = useState(
    sdkSocket?.connected
  );
  chrome.extension.getBackgroundPage().console.log("i am here");
  let userCaip = convertAddressToAddrCaipForNotifs(account, chainId);

  const addSocketEvents = () => {
    sdkSocket?.on(EVENTS.CONNECT, () => {
      setIsSDKSocketConnected(true);
    });

    sdkSocket?.on(EVENTS.DISCONNECT, () => {
      setIsSDKSocketConnected(false);
    });

    sdkSocket?.on(EVENTS.USER_FEEDS, (feedItem) => {
      /**
       * We receive a feedItem
       */
      chrome.extension
        .getBackgroundPage()
        .console.log(feedItem, "add", [...feedItem]);
      // setNotifs((x) => [...x, feedItem]);
    });

    sdkSocket?.on(EVENTS.USER_SPAM_FEEDS, (feedItem) => {
      /**
       * We receive a feedItem
       */
      chrome.extension.getBackgroundPage().console.log(feedItem);
      // setNotifs((x) => [...x, feedItem]);
    });
  };

  const removeSocketEvents = () => {
    sdkSocket?.off(EVENTS.CONNECT);
    sdkSocket?.off(EVENTS.DISCONNECT);
    sdkSocket?.off(EVENTS.USER_FEEDS);
    sdkSocket?.off(EVENTS.USER_SPAM_FEEDS);
  };

  useEffect(() => {
    if (sdkSocket) {
      addSocketEvents();
    }

    return () => {
      if (sdkSocket) {
        removeSocketEvents();
      }
    };
  }, [sdkSocket]);

  /**
   * Whenever the requisite params to create a connection object change
   *  - disconnect the old connection
   *  - create a new connection object
   */
  useEffect(() => {
    if (account && chainId && env) {
      if (sdkSocket) {
        sdkSocket?.disconnect();
      }

      // this is auto-connect on instantiation
      const connectionObject = createSocketConnection({
        user: userCaip,
        env,
      });
      setSDKSocket(connectionObject);
    }
  }, [account, chainId, env]);

  return {
    sdkSocket,
    isSDKSocketConnected,
  };
};
