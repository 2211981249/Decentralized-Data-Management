require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
const GOERLI_URL = "HTTP://127.0.0.1:7545";
const PRIVATE_KEY = "98af5c0c98b07fcdac7b476e268fa68a996b910ed15c9e400019a508f059a1f9";

module.exports = {
  solidity: "0.8.24",
    networks: {
      localganache: {
        url: GOERLI_URL,
        accounts: [PRIVATE_KEY],
      },
    },
};

