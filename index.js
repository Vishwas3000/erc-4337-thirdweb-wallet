const { LocalWallet } = require("@thirdweb-dev/wallets")
const { SmartWallet } = require("@thirdweb-dev/wallets")
const { Mumbai } = require("@thirdweb-dev/chains")
const { ThirdwebSDK } = require("@thirdweb-dev/sdk")
require("dotenv").config()

async function createLocalWallet() {
  const localWallet = new LocalWallet()
  await localWallet.generate()

  const localWalletAddress = await localWallet.getAddress()
  console.log("Local Wallet Address: ", localWalletAddress)
  return localWallet
}

async function createSmartWallet(localWallet) {
  // Create a smart wallet using the local wallet as the key
  const smartWallet = new SmartWallet({
    chain: Mumbai,
    factoryAddress: process.env.TWFactoryAddress,
    thirdwebApiKey: process.env.TWApiKey,
    gasless: true,
  })

  await smartWallet.connect({
    personalWallet: localWallet,
  })

  const smartWalletAddress = await smartWallet.getAddress()
  console.log(`✨ Smart wallet address: ${smartWalletAddress}`)
  return smartWallet
}
async function getSmartWallet() {
  const localWallet = await createLocalWallet()
  const smartWallet = await createSmartWallet(localWallet)
  return smartWallet
}

async function claimNFT(smartWallet) {
  // Instantiate thirdweb SDK with the smart wallet
  // (or you can get signer using smartWallet.getSigner())
  const sdk = await ThirdwebSDK.fromWallet(smartWallet)

  try {
    // Claiming access NFT
    const contract = await sdk.getContract(process.env.EditionDropAddress)
    const claimTxn = await contract.erc1155.claim(
      process.env.EditionDropTokenId,
      1
    )
    console.log(
      `🪄 Access NFT claimed! Txn hash: ${claimTxn.receipt.transactionHash}`
    )
  } catch (error) {
    console.error(`❌ Error claiming NFT: ${error.message}`)
  }
}

async function main() {
  const smartWallet = await getSmartWallet()
  await claimNFT(smartWallet)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
