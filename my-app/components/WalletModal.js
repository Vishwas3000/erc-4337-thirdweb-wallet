import { useContext } from "react"
import { UserContext } from "@/pages/_app"
import ClosePopup from "./closePopup"
import { ethers } from "ethers"

export default function WalletModal({ closePopup, displaySmartWalletModal }) {
  const { setEOAWalletType } = useContext(UserContext)

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 bg-gray-500 backdrop-filter backdrop-blur-sm">
      <div className="w-96 flex flex-col bg-gradient-to-br from-blue-500 to-blue-700 backdrop-filter backdrop-blur-sm rounded-lg p-6 space-y-10">
        <div className=" flex flex-row justify-around">
          <div className=" flex justify-center font-bold text-2xl flex-grow">
            Select Wallet
          </div>
          <ClosePopup closePopup={closePopup} />
        </div>
        <div className="flex flex-col space-y-5">
          {/* <button
            className="bg-white text-blue-500 py-2 px-4 rounded-lg"
            onClick={() => {
              setEOAWalletType("metamask")
              handleDisplayMetamask()
              closePopup()
            }}
          >
            Metamask
          </button> */}
          <button
            className="bg-white text-blue-500 py-2 px-4 rounded-lg"
            onClick={() => {
              setEOAWalletType("smartWallet")
              displaySmartWalletModal()
              closePopup()
            }}
          >
            Smart Wallet
          </button>
        </div>
      </div>
    </div>
  )
}
