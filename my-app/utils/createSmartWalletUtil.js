import { SmartWallet } from "@thirdweb-dev/wallets"
const createSmartWalletUtil = async ({
  presonalWallet,
  activeChain,
  contractAddress,
}) => {
  // Create a smart wallet using the local wallet as the key
  const smartWallet = new SmartWallet({
    chain: activeChain,
    factoryAddress: contractAddress,
    thirdwebApiKey: process.env.NEXT_PUBLIC_THIRDWEB_API_KEY,
    gasless: true,
  })

  await smartWallet.connect({
    personalWallet: presonalWallet,
  })

  const smartWalletAddress = await smartWallet.getAddress()
  console.log(`Smart wallet address: ${smartWalletAddress}`)
  return smartWallet
}

export default createSmartWalletUtil
