const { ethers, network } = require("hardhat")

const networkConfig = {
  default: {
    name: "hardhat",
  },
  31337: {
    name: "localhost",
  },
  5: {
    name: "goerli",
  },
  1: {
    name: "mainnet",
  },
  11155111: {
    name: "sepolia",
  },
  80001: {
    name: "polygonMumbai",
  },
}
const developmentChains = ["hardhat", "localhost"]

const frontEndAbiLocation = "../my-app/constants/"
const frontEndContractAddresses =
  "../m-app/constants/addressMapping/contractAddress.json"

module.exports = {
  networkConfig,
  developmentChains,
  frontEndAbiLocation,
  frontEndContractAddresses,
}
