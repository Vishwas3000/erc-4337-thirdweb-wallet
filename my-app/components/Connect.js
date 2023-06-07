import { useState, useContext, useEffect } from "react"
import WalletModal from "./WalletModal"
import SmartWalletModal from "./SmartWalletModal"
import LocalWalletModal from "./LocalWalletModal"
import MetamaskEOAWalletConnect from "./MetamaskEOAWalletModal"
import { UserContext } from "@/pages/_app"
import WalletDetailModal from "./WalletDetailModal"
import { truncateAddress } from "@/utils/helpers"

export default function ConnectWallet() {
  const {
    EOA,
    isEOAConnected,
    setEOA,
    setIsEOAConnected,
    user,
    setSmartWallet,
  } = useContext(UserContext)

  const [displayWalletModal, setDisplayWalletModal] = useState(false)
  const [displaySmartWalletModal, setDisplaySmartWalletModal] = useState(false)
  const [displayLocalWalletModal, setDisplayLocalWalletModal] = useState(false)
  const [displayWalletDetailModal, setDisplayWalletDetailModal] =
    useState(false)
  const [displayAddress, setDisplayAddress] = useState("")

  useEffect(() => {
    if (EOA) {
      handleDisplayDetails()
    }
  }, [EOA])

  const handleDisplayDetails = async () => {
    const address = await EOA.getAddress()
    setDisplayAddress(truncateAddress(address))
  }

  return (
    <div className=" flex flex-row space-x-5">
      {displayWalletModal && (
        <WalletModal
          closePopup={() => setDisplayWalletModal(false)}
          displaySmartWalletModal={() => setDisplaySmartWalletModal(true)}
        />
      )}
      {displaySmartWalletModal && (
        <SmartWalletModal
          closePopup={() => setDisplaySmartWalletModal(false)}
          localWalletModal={() => setDisplayLocalWalletModal(true)}
          smartWalletModal={() =>
            MetamaskEOAWalletConnect(
              setEOA,
              setIsEOAConnected,
              user,
              setSmartWallet
            )
          }
        />
      )}
      {displayLocalWalletModal && (
        <LocalWalletModal
          closePopup={() => setDisplayLocalWalletModal(false)}
        />
      )}
      {displayWalletDetailModal && (
        <WalletDetailModal
          displayAddress={displayAddress}
          closePopup={() => setDisplayWalletDetailModal(false)}
        />
      )}
      {!isEOAConnected && (
        <button
          className="rounded-lg bg-blue-500 text-white py-2 px-4 hover:bg-blue-600"
          onClick={() => setDisplayWalletModal(true)}
        >
          Connect Wallet
        </button>
      )}
      {isEOAConnected && (
        <button
          className="rounded-lg bg-blue-500 text-white py-4 px-8 hover:bg-blue-600"
          onClick={() => setDisplayWalletDetailModal(true)}
        >
          {displayAddress}
        </button>
      )}
    </div>
  )
}
