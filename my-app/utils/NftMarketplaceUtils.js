const { ThirdwebSDK } = require("@thirdweb-dev/react")
import { ethers } from "ethers"

async function ListItemUtil(
  nftMarketplaceAddress,
  nftAddress,
  tokenId,
  price,
  smartWallet
) {
  const priceInWei = ethers.utils.parseEther(price.toString())
  const sdk = await ThirdwebSDK.fromWallet(smartWallet)
  const contract = await sdk.getContract(nftMarketplaceAddress)
  const tx = await contract.call("listItem", [nftAddress, tokenId, priceInWei])
  return tx
}

async function UnListItemUtil(
  nftMarketplaceAddress,
  nftAddress,
  tokenId,
  smartWallet
) {
  const sdk = await ThirdwebSDK.fromWallet(smartWallet)
  const contract = await sdk.getContract(nftMarketplaceAddress)
  const tx = await contract.call("cancelListing", [nftAddress, tokenId])
  return tx
}

async function UpdateItemPriceUtil(
  nftMarketplaceAddress,
  nftAddress,
  tokenId,
  price,
  smartWallet
) {
  const priceInWei = ethers.utils.parseEther(price.toString())
  const sdk = await ThirdwebSDK.fromWallet(smartWallet)
  const contract = await sdk.getContract(nftMarketplaceAddress)
  const tx = await contract.call("updateListing", [
    nftAddress,
    tokenId,
    priceInWei,
  ])
  return tx
}

async function BuyItemUtil(
  nftMarketplaceAddress,
  nftAddress,
  tokenId,
  smartWallet
) {
  const sdk = await ThirdwebSDK.fromWallet(smartWallet)
  const contract = await sdk.getContract(nftMarketplaceAddress)
  const tx = await contract.call("buyItem", [nftAddress, tokenId])
  return tx
}

export { ListItemUtil, UnListItemUtil, UpdateItemPriceUtil, BuyItemUtil }
