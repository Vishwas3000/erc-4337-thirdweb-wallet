import "@/styles/globals.css"
import { Mumbai } from "@thirdweb-dev/chains"
import {
  ThirdwebProvider,
  smartWallet,
  localWallet,
  metamaskWallet,
  coinbaseWallet,
  paperWallet,
} from "@thirdweb-dev/react"
import Header from "../components/Header"
import { contractAddress } from "@/constants"
import CredentialPopup from "@/components/credentialPopup"
import { useState, createContext } from "react"
import ConnectWallet from "@/components/Connect"

export const UserContext = createContext({
  user: "",
  setUser: (newUser) => {},
  smartWallet: null,
  setSmartWallet: (newSmartWallet) => {},
  EOA: "", // EOA = External Owned Account that used as the key to the smart wallet
  setEOA: (newEOA) => {},
  walletType: "", // walletType = "metamask" | "smart wallet"
  setWalletType: (newWalletType) => {},
})

export default function App({ Component, pageProps }) {
  const [user, setUser] = useState()
  const [smartWallet, setSmartWallet] = useState()
  const [EOA, setEOA] = useState()
  const [walletType, setWalletType] = useState()

  const changeUser = (newUser) => {
    console.log("newUser: ", newUser)
    setUser(newUser)
  }

  const [isCredentialPopupOpen, setIsCredentialPopupOpen] = useState(true)

  return (
    <div>
      <UserContext.Provider
        value={{
          user,
          changeUser,
          smartWallet,
          setSmartWallet,
          EOA,
          setEOA,
          walletType,
          setWalletType,
        }}
      >
        <div>
          {isCredentialPopupOpen && (
            <CredentialPopup
              closePopup={() => setIsCredentialPopupOpen(false)}
            />
          )}
        </div>
        <div className="">
          <ThirdwebProvider>
            <Header />
            <div className=" p-5">
              {/* <ConnectWallet /> */}
              <ConnectWallet />
            </div>

            <Component {...pageProps} />
          </ThirdwebProvider>
        </div>
      </UserContext.Provider>
    </div>
  )
}
