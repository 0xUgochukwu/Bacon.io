export const shortAddress = (address) =>
  `${address.slice(0, 10)}...${address.slice(address.length - 4)}`