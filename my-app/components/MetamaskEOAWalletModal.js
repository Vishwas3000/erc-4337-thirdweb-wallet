import { Mumbai } from "@thirdweb-dev/chains"
import { MetaMaskWallet } from "@thirdweb-dev/wallets"
import { createSmartWalletUtil } from "../utils/createSmartWalletUtil"

async function MetamaskEOAWalletConnect(
  setEOA,
  setIsEOAConnected,
  user,
  setSmartWallet
) {
  const handelGenerateSmartWallet = async (personalWallet) => {
    const newSmartWallet = await createSmartWalletUtil({ personalWallet })
    setSmartWallet(newSmartWallet)
  }

  const handleUploadToServer = async (wallet) => {
    console.log("user:", user)
    const data = {
      wallet_address: await wallet.getAddress(),
      user_mail_id: user,
    }

    const req = await fetch(
      "http://13.234.122.138:3000/metamask-wallet/create",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )

    console.log("Upload metamask account", req)

    const res = await req.json()
    console.log(res)
  }

  const handleDisplayMetamask = async () => {
    const wallet = new MetaMaskWallet({
      chains: [Mumbai],
    })

    await wallet.connect()
    console.log("metamask wallet: ", wallet)
    setEOA(wallet)
    setIsEOAConnected(true)

    return wallet
  }

  const wallet = await handleDisplayMetamask()
  await handleUploadToServer(wallet)
  await handelGenerateSmartWallet(wallet)
}

export default MetamaskEOAWalletConnect
