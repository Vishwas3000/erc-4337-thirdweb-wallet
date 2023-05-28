import { LocalWallet, SmartWallet } from "@thirdweb-dev/wallets"
import { Mumbai } from "@thirdweb-dev/chains"

async function SmartWalletConnect() {
  // First, connect the personal wallet, which can be any wallet (metamask, walletconnect, etc.)
  // Here we're just generating a new local wallet which can be saved later
  const personalWallet = new LocalWallet()
  // await personalWallet.generate()
  await personalWallet.connect()
  console.log("personalWallet", personalWallet)

  // Setup the Smart Wallet configuration
  const SmartWalletConfig = {
    chain: Mumbai, // the chain where your smart wallet will be or is deployed
    factoryAddress: process.env.FactoryAddress, // your own deployed account factory address
    thirdwebApiKey: process.env.thirdwebApiKey, // obtained from the thirdweb dashboard
    gasless: true, // enable or disable gasless transactions
  }

  // Then, connect the Smart wallet
  const wallet = new SmartWallet(SmartWalletConfig)
  await wallet.connect({
    personalWallet,
  })
  console.log("wallet", wallet)
  //   return wallet
}

module.exports = { SmartWalletConnect }
