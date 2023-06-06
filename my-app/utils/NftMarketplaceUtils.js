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

export { ListItemUtil }
