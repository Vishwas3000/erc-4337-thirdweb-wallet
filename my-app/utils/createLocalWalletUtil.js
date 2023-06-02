import { LocalWallet } from "@thirdweb-dev/wallets"

const createLocalWalletUtil = async ({ password }) => {
  // Create a local wallet to be a key for smart wallet
  const localWallet = new LocalWallet()

  await localWallet.generate()

  const localWalletAddress = await localWallet.getAddress()
  console.log(`✨ Local wallet address: ${localWalletAddress}`)
  const jsonData = await localWallet.export({
    strategy: "encryptedJson",
    password: password,
  })
  const privateKey = await localWallet.export({
    strategy: "privateKey",
    password: password,
  })
  console.log("jsonData: ", JSON.parse(jsonData))
  console.log("privateKey: ", privateKey)

  return {
    wallet: localWallet,
    jsonDataEncoded: JSON.parse(jsonData),
    privateKeyEncoded: privateKey,
  }
}

export default createLocalWalletUtil
