const { contractAddress } = require("@/constants")
const { ThirdwebSDK } = require("@thirdweb-dev/react")

async function CreateMintNftTransaction({ smartWallet, tokenUri }) {
  // console.log("smartWallet: ", smartWallet)
  try {
    const sdk = await ThirdwebSDK.fromWallet(smartWallet)

    const contract = await sdk.getContract(contractAddress["NFT"])
    const tx = await contract.call("mintNFT", [tokenUri])

    // console.log("Transaction: ", tx)
    console.log(`Transaction hash: ${tx.receipt.transactionHash}`)
    return { status: 200, msg: tx.receipt.transactionHash }
  } catch (e) {
    console.log(e)
    return { status: 400, msg: e.message }
  }
}

export { CreateMintNftTransaction }
