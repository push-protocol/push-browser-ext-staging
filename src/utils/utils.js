/*global chrome*/
export const convertAddressToAddrCaip = (userAddress) => {
  return `eip155:${userAddress}`;
};
export const convertAddressToAddrCaipForNotifs = (userAddress, chainId) => {
  if (userAddress.includes(":")) {
    const caipArr = userAddress.split(":");
    if (caipArr.length == 2 && caipArr[0] == "eip155") {
      return `eip155:${chainId}:${caipArr[1]}`;
    } else {
      throw new Error("Invalid CAIP Format");
    }
  } else {
    return `eip155:${chainId}:${userAddress}`;
  }
};

export const convertAddrCaipToAddress = (addressInCaip) => {
  const caipArr = addressInCaip.split(":");
  if (caipArr.length === 2 && caipArr[0] == "eip155") {
    return caipArr[1];
  } else if (caipArr.length === 3 && caipArr[0] == "eip155") {
    return caipArr[2];
  } else {
    throw new Error("Invalid CAIP Format");
  }
};
