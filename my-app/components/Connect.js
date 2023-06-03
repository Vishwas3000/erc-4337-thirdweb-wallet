import { useState, useContext, useEffect } from "react"
import WalletModal from "./WalletModal"
import SmartWalletModal from "./SmartWalletModal"
import LocalWalletModal from "./LocalWalletModal"
import { UserContext } from "@/pages/_app"

export default function ConnectWallet() {
  const [displayWalletModal, setDisplayWalletModal] = useState(false)
  const [displaySmartWalletModal, setDisplaySmartWalletModal] = useState(false)
  const [displayLocalWalletModal, setDisplayLocalWalletModal] = useState(false)
  const [displayAddress, setDisplayAddress] = useState("")

  const [isEOAConnected, setIsEOAConnected] = useState(false)
  const { EOA } = useContext(UserContext)

  function truncateAddress(address, length = 5) {
    if (typeof address !== "string") {
      return ""
    }

    const truncatedFront = address.substring(0, length)
    const truncatedBack = address.substring(address.length - length)

    return `${truncatedFront}...${truncatedBack}`
  }

  useEffect(() => {
    console.log("EOA is connected: ", EOA)
    if (EOA) {
      setIsEOAConnected(true)
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
          displaySmartWalletModal={() => {
            setDisplaySmartWalletModal(true)
          }}
        />
      )}
      {displaySmartWalletModal && (
        <SmartWalletModal
          closePopup={() => setDisplaySmartWalletModal(false)}
          localWalletModal={() => {
            setDisplayLocalWalletModal(true)
          }}
        />
      )}
      {displayLocalWalletModal && (
        <LocalWalletModal
          closePopup={() => setDisplayLocalWalletModal(false)}
        />
      )}
      {!isEOAConnected && (
        <button
          className="rounded-lg bg-blue-500 text-white py-2 px-4 hover:bg-blue-600"
          onClick={() => {
            setDisplayWalletModal(true)
          }}
        >
          Connect Wallet
        </button>
      )}
      {isEOAConnected && (
        <button className="rounded-lg bg-blue-500 text-white py-4 px-8 hover:bg-blue-600">
          {displayAddress}
        </button>
      )}
    </div>
  )
}
