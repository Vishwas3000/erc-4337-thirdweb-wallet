import "@/styles/globals.css"
import { ThirdwebProvider } from "@thirdweb-dev/react"
import Header from "../components/Header"
import CredentialPopup from "@/components/credentialPopup"
import { useState, createContext, useEffect } from "react"
import ConnectWallet from "@/components/Connect"

export const UserContext = createContext({
  user: "",
  setUser: (newUser) => {},
  smartWallet: null,
  setSmartWallet: (newSmartWallet) => {},
  EOA: null, // EOA = External Owned Account that used as the key to the smart wallet
  setEOA: (newEOA) => {},
  EOAwalletType: "", // walletType = "metamask" | "smart wallet"
  setEOAWalletType: (newWalletType) => {},
  isEOAConnected: false,
  setIsEOAConnected: (newIsEOAConnected) => {},
})

export default function App({ Component, pageProps }) {
  const [user, setUser] = useState()
  const [smartWallet, setSmartWallet] = useState()
  const [EOA, setEOA] = useState()
  const [EOAwalletType, setEOAWalletType] = useState()
  const [isEOAConnected, setIsEOAConnected] = useState()

  const [isCredentialPopupOpen, setIsCredentialPopupOpen] = useState(true)

  return (
    <div>
      <UserContext.Provider
        value={{
          user,
          setUser,
          smartWallet,
          setSmartWallet,
          EOA,
          setEOA,
          EOAwalletType,
          setEOAWalletType,
          isEOAConnected,
          setIsEOAConnected,
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
          <div>
            <Header />
            <div className=" p-5">
              <ConnectWallet />
            </div>

            <Component {...pageProps} />
          </div>
        </div>
      </UserContext.Provider>
    </div>
  )
}
