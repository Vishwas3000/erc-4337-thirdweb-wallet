const { ThirdwebSDK } = require("@thirdweb-dev/react")
import { Mumbai } from "@thirdweb-dev/chains"

async function GetTokenUriUtil(nftAddress, tokenId) {
  const sdk = new ThirdwebSDK(Mumbai) //readOnly sdk
  const contract = await sdk.getContract(nftAddress)
  const tokenUri = await contract.call("tokenURI", [tokenId])

  return tokenUri
}

async function ApproveNftToUtil(nftAddress, toAddress, tokenId, smartWallet) {
  const sdk = await ThirdwebSDK.fromWallet(smartWallet)
  const contract = await sdk.getContract(nftAddress)

  const tx = await contract.call("approve", [toAddress, tokenId])

  return tx
}

export { GetTokenUriUtil, ApproveNftToUtil }
