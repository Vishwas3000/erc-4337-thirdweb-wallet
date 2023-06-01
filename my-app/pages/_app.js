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
import CredentialPopup from "@/components/credentialPopup"
import { useState, createContext } from "react"

export const UserContext = createContext()

export default function App({ Component, pageProps }) {
  const [isCredentialPopupOpen, setIsCredentialPopupOpen] = useState(true)
  const [user, setUser] = useState()

  const changeUser = (newUser) => {
    console.log("newUser: ", newUser)
    setUser(newUser)
  }

  return (
    <div>
      <UserContext.Provider value={{ user, changeUser }}>
        <div>
          {isCredentialPopupOpen && (
            <CredentialPopup
              closePopup={() => setIsCredentialPopupOpen(false)}
            />
          )}
        </div>
        <div className="">
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
            <div className=" p-5">
              <ConnectWallet />
            </div>

            <Component {...pageProps} />
          </ThirdwebProvider>
        </div>
      </UserContext.Provider>
    </div>
  )
}
