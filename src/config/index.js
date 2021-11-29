import contractAbi from "./contractAbi.json";

const config = {
  CONTRACT_ADDRESS: process.env.REACT_APP_CONTRACT_ADDRESS,
  GIPHY_KEY: process.env.REACT_APP_GIPHY_KEY,
};

export { contractAbi, config };
