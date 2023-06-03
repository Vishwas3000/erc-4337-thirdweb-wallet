import { LocalWallet } from "@thirdweb-dev/wallets"

const createLocalWalletUtil = async ({ password }) => {
  // Create a local wallet to be a key for smart wallet
  const localWallet = new LocalWallet()

  // await localWallet.generate()
  await localWallet.loadOrCreate({
    strategy: "encryptedJson",
    password: password,
  })

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

  localWallet.save({
    encryption: "encryptedJson",
    password: password,
  })

  return {
    wallet: localWallet,
    jsonDataEncoded: JSON.parse(jsonData),
    privateKeyEncoded: privateKey,
  }
}

export default createLocalWalletUtil
