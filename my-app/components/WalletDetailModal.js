import { useState, useContext, useEffect } from "react"
import { UserContext } from "../pages/_app"
import { truncateAddress } from "../utils/helpers"
import Image from "next/image"

export default function WalletDetailModal({ closePopup }) {
  const { EOA, setEOA, setSmartWallet, setIsEOAConnected, setWalletType } =
    useContext(UserContext)
  const [displayAddress, setDisplayAddress] = useState("")

  useEffect(() => {
    if (EOA) {
      handelDisplayDetails()
    }
  }, [])
  const handelDisplayDetails = async () => {
    const address = await EOA.getAddress()
    setDisplayAddress(truncateAddress(address))
  }
  const handleCopyClick = () => {
    alert("Copied to clipboard")
    navigator.clipboard.writeText(displayAddress)
  }

  const handelExportWalletEncrypt = async () => {
    const password = sessionStorage.getItem("localWalletPassword")
    const encryptedWallet = await EOA.export({
      strategy: "encryptedJson",
      password: password,
    })
    const jsonData = encryptedWallet
    const blob = new Blob([jsonData], { type: "application/json" })
    const url = URL.createObjectURL(blob)

    const link = document.createElement("a")
    link.href = url
    link.download = "data.json"
    link.click()

    // Cleanup
    URL.revokeObjectURL(url)
  }

  const handleDisconnectWallet = () => {
    setIsEOAConnected(false)
    setEOA(null)
    setSmartWallet(null)
    setWalletType(null)
    sessionStorage.removeItem("localWalletPassword")
    closePopup()
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 bg-gray-500 backdrop-filter backdrop-blur-sm">
      <div className="w-96 h-autoflex flex-col bg-gradient-to-br from-blue-500 to-blue-700 backdrop-filter backdrop-blur-sm rounded-lg p-6 space-y-10">
        <div className=" flex flex-row justify-around">
          <button onClick={handleDisconnectWallet}>
            <Image
              src="/images/exit.png"
              alt="Exit Image"
              width={20}
              height={20}
            />
          </button>
          <div className=" flex justify-center font-bold text-2xl flex-grow">
            Wallet options
          </div>
          <button
            className="bg-transparent text-white rounded-md p-1 hover:bg-blue-800"
            onClick={closePopup}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className=" flex flex-row justify-around">
          <button
            className="border-2 border-blue-800 py-2 px-4 bg-transparent transition-colors duration-300 hover:bg-blue-800 rounded-lg text-white w-1/2 "
            onClick={handleCopyClick}
          >
            {displayAddress}
          </button>
          <button onClick={handelExportWalletEncrypt}>
            <Image
              src="/images/export.png"
              alt="Export Image"
              width={20}
              height={20}
            />
          </button>
        </div>
      </div>
    </div>
  )
}
