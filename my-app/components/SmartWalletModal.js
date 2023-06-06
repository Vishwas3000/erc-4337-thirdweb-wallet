import { useState, useContext } from "react"
import { UserContext } from "@/pages/_app"

export default function SmartWalletModal({ closePopup, localWalletModal }) {
  const { setEOA, setWalletType } = useContext(UserContext)

  const handleSmartWalletMetamask = () => {
    setWalletType("metamask")
    closePopup()
  }
  const handleSmartWalletLocalWallet = () => {
    setWalletType("localWallet")
    localWalletModal()
    closePopup()
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 bg-gray-500 backdrop-filter backdrop-blur-sm">
      <div className="w-96 h-60 flex flex-col bg-gradient-to-br from-blue-500 to-blue-700 backdrop-filter backdrop-blur-sm rounded-lg p-6 space-y-10">
        <div className=" flex justify-center font-bold text-2xl">
          Select EOA Wallet
        </div>
        <div className="flex flex-col space-y-5">
          <button
            className="bg-white text-blue-500 py-2 px-4 rounded-lg"
            onClick={() => {
              handleSmartWalletMetamask()
            }}
          >
            Metamask
          </button>
          <button
            className="bg-white text-blue-500 py-2 px-4 rounded-lg "
            onClick={() => {
              handleSmartWalletLocalWallet()
            }}
          >
            Local wallet
          </button>
        </div>
      </div>
    </div>
  )
}
