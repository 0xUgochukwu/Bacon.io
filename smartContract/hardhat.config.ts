import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

require('dotenv').config();


const private_key = process.env.PRIVATE_KEY!
const api = process.env.API_URL

const config: HardhatUserConfig = {
  solidity: "0.8.17",

  networks : {
    mumbai : {
      url : api,
      accounts : [private_key]
    }
  }
};

export default config;
