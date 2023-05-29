const { network, ethers } = require("hardhat")
const { networkConfig, developmentChains } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts()

  const chainId = network.config.chainId

  const percentageOfRoyality = 0

  const args = [percentageOfRoyality]

  log("----------------")
  const nftMarketplace = await deploy("NftMarketplace", {
    from: deployer,
    args: args,
    log: true,
    waitConformations: network.config.blockConformations || 1,
  })

  if (
    !developmentChains.includes(network.name) &&
    process.env.ETHERSCAN_API_KEY
  ) {
    log("Verifying...")
    await verify(nftMarketplace.address, args)
  }
}

module.exports.tags = ["all", "nftMarketplace", "main"]
