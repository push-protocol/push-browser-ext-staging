/*global chrome*/
// React + Web3 Essentials
import { useEffect, useState } from "react";

// Internal Components
import { createSocketConnection, EVENTS } from "@pushprotocol/socket";
import { convertAddressToAddrCaipForNotifs } from "../utils/utils";
import { convertWalletAddressForSocket } from "../pages/NotificationPage/NotificationPage";

// Types
export type SDKSocketHookOptions = {
  account?: string | null;
  env?: string;
  chainId?: number;
}

export const useSDKSocket = async ({ account, env, chainId }: SDKSocketHookOptions) => {
  const [sdkSocket, setSDKSocket] = useState<any>(null);
  const [isSDKSocketConnected, setIsSDKSocketConnected] = useState(
    sdkSocket?.connected
  );
  let address = await convertWalletAddressForSocket(account);
  let userCaip = convertAddressToAddrCaipForNotifs(address, chainId);

  const addSocketEvents = () => {
    sdkSocket?.on(EVENTS.CONNECT, () => {
      setIsSDKSocketConnected(true);
    });

    sdkSocket?.on(EVENTS.DISCONNECT, () => {
      setIsSDKSocketConnected(false);
    });

    sdkSocket?.on(EVENTS.USER_FEEDS, (feedItem: any) => {
      /**
       * We receive a feedItem
       */
      // chrome.extension.getBackgroundPage().console.log(feedItem);
    });
  };

  const removeSocketEvents = () => {
    sdkSocket?.off(EVENTS.CONNECT);
    sdkSocket?.off(EVENTS.DISCONNECT);
    sdkSocket?.off(EVENTS.USER_FEEDS);
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
