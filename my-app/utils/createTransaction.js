const { contractAddress } = require("@/constants")
const { ThirdwebSDK } = require("@thirdweb-dev/react")
import { ethers } from "ethers"

async function CreateMintNftTransaction({ smartWallet, tokenUri }) {
  try {
    const sdk = await ThirdwebSDK.fromWallet(smartWallet)

    const contract = await sdk.getContract(contractAddress["NFT"])
    const tx = await contract.call("mintNFT", [tokenUri])

    console.log(`Transaction hash: ${tx.receipt.transactionHash}`)
    return { status: 200, msg: tx.receipt.transactionHash }
  } catch (e) {
    console.log(e)
    return { status: 400, msg: e.message }
  }
}

async function CreateApproveTransaction({ smartWallet, approveTo, tokenId }) {
  try {
    const sdk = await ThirdwebSDK.fromWallet(smartWallet)

    const contract = await sdk.getContract(contractAddress["NFT"])
    const tx = await contract.call("approve", [approveTo, tokenId])

    console.log(`Transaction hash: ${tx.receipt.transactionHash}`)
    return { status: 200, msg: tx.receipt.transactionHash }
  } catch (e) {
    console.log(e)
    return { status: 400, msg: e.message }
  }
}

async function CreateListNftTransaction({ smartWallet, tokenId, listPrice }) {
  const listPriceWei = ethers.utils.parseEther(listPrice)
  try {
    const sdk = await ThirdwebSDK.fromWallet(smartWallet)

    const contract = await sdk.getContract(contractAddress["NFTMarketplace"])
    const tx = await contract.call("listItem", [
      contractAddress["NFT"],
      tokenId,
      listPriceWei,
    ])

    console.log(`Transaction hash: ${tx.receipt.transactionHash}`)
    return { status: 200, msg: tx.receipt.transactionHash }
  } catch (e) {
    console.log(e)
    return { status: 400, msg: e.message }
  }
}

export {
  CreateMintNftTransaction,
  CreateApproveTransaction,
  CreateListNftTransaction,
}
