import { useState } from "react"
import WalletModal from "./WalletModal"
import SmartWalletModal from "./SmartWalletModal"
import LocalWalletModal from "./LocalWalletModal"

export default function ConnectWallet() {
  const [displayWalletModal, setDisplayWalletModal] = useState(false)
  const [displaySmartWalletModal, setDisplaySmartWalletModal] = useState(false)
  const [displayLocalWalletModal, setDisplayLocalWalletModal] = useState(false)
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
      <button
        onClick={() => {
          setDisplayWalletModal(true)
        }}
      >
        Connect Wallet
      </button>
    </div>
  )
}
