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
  walletType: "", // walletType = "metamask" | "smart wallet"
  setWalletType: (newWalletType) => {},
  isEOAConnected: false,
  setIsEOAConnected: (newIsEOAConnected) => {},
})

export default function App({ Component, pageProps }) {
  const [user, setUser] = useState()
  const [smartWallet, setSmartWallet] = useState()
  const [EOA, setEOA] = useState()
  const [walletType, setWalletType] = useState()
  const [isEOAConnected, setIsEOAConnected] = useState()

  // const changeUser = (newUser) => {
  //  console.log("newUser: ", newUser)
  //   setUser(newUser)
  // }

  // useEffect(() => {
  //   console.log("smartWallet has been changed: ", smartWallet)
  // }, [smartWallet])

  // useEffect(() => {
  //   console.log("EOA has been changed: ", EOA)
  // }, [EOA])

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
