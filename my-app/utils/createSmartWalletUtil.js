import { SmartWallet } from "@thirdweb-dev/wallets"
import { Mumbai } from "@thirdweb-dev/chains"
import { contractAddress } from "@/constants"

const createSmartWallet = async ({ presonalWallet }) => {
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

const handelUploadToServer = async ({ personalWallet, newSmartWallet }) => {
  // console.log("personal wallet: ", personalWallet.walletId)
  const data = {
    wallet_address: await newSmartWallet.getAddress(),
    eoa_wallet_address: await personalWallet.getAddress(),
    eoa_wallet_type: personalWallet.walletId,
  }

  console.log("data: ", data)

  const req = await fetch("http://localhost:3000/smart-wallet/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  console.log("Upload smart account", req)
  // const res = await req.json()
  // console.log("result of server: ", res)
}

const createSmartWalletUtil = async ({ personalWallet }) => {
  // console.log("personal wallet: ", personalWallet)

  const newSmartWallet = await createSmartWallet({
    presonalWallet: personalWallet,
  })
  // console.log("new smart wallet: ", newSmartWallet)

  await handelUploadToServer({ personalWallet, newSmartWallet })
  return newSmartWallet
}

export { createSmartWalletUtil }
