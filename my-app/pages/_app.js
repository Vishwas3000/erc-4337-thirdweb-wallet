import "@/styles/globals.css"
import { Mumbai } from "@thirdweb-dev/chains"
import {
  ThirdwebProvider,
  smartWallet,
  localWallet,
  metamaskWallet,
  coinbaseWallet,
  paperWallet,
  ConnectWallet,
} from "@thirdweb-dev/react"
import Header from "../components/Header"
import { contractAddress } from "@/constants"
import SignInPopup from "../components/SignInPopup"
import { useState } from "react"

export default function App({ Component, pageProps }) {
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(true)

  return (
    <div>
      <div>
        {isLoginPopupOpen && (
          <SignInPopup closePopup={() => setIsLoginPopupOpen(false)} />
        )}
      </div>
      <div>
        <ThirdwebProvider
          autoConnect={false}
          activeChain={Mumbai}
          supportedWallets={[
            smartWallet({
              gasless: true,
              factoryAddress: contractAddress["FactoryAddress"],
              thirdwebApiKey: process.env.NEXT_PUBLIC_THIRDWEB_API_KEY,
              chain: Mumbai,
              personalWallets: [
                metamaskWallet(),
                localWallet({ persist: true }),
                coinbaseWallet(),
                paperWallet({
                  clientId: process.env.NEXT_PUBLIC_PAPER_WALLET_API_KEY,
                }),
              ],
            }),
            localWallet({ persist: true }),
            metamaskWallet(),
          ]}
          sdkOptions={{
            gasless: {
              openzeppelin: {
                relayerUrl: process.env.NEXT_PUBLIC_RELAYER_URL,
              },
            },
          }}
        >
          <Header />
          <ConnectWallet />

          <Component {...pageProps} />
        </ThirdwebProvider>
      </div>
    </div>
  )
}
