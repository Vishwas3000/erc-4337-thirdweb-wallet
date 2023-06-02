import { useState } from "react"
import WalletModal from "./WalletModal"

export default function ConnectWallet() {
  const [walletType, setWalletType] = useState("metamask")
  const [displayWalletModal, setDisplayWalletModal] = useState(false)
  return (
    <div className=" flex flex-row space-x-5">
      {displayWalletModal && (
        <WalletModal closePopup={() => setDisplayWalletModal(false)} />
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
