export const convertAddressToAddrCaip = (userAddress, chainId) => {
  return `eip155:${chainId}:${userAddress}`;
};

export const convertAddrCaipToAddress = (addressInCaip) => {
  const caipArr = addressInCaip.split(":");
  if (caipArr.length == 3 && caipArr[0] == "eip155") {
    return caipArr[2];
  } else {
    throw new Error("Invalid CAIP Format");
  }
};
