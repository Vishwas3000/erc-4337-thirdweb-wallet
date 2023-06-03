import { SmartWallet } from "@thirdweb-dev/wallets"
import { Mumbai } from "@thirdweb-dev/chains"
import { contractAddress } from "@/constants"
const createSmartWalletUtil = async ({ presonalWallet }) => {
  // Create a smart wallet using the local wallet as the key
  const smartWallet = new SmartWallet({
    chain: Mumbai,
    factoryAddress: contractAddress["FactoryAddress"],
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
