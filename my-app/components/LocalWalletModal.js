import { UserContext } from "@/pages/_app"
import { useContext, useState } from "react"
import createLocalWalletUtil from "@/utils/createLocalWalletUtil"

export default function LocalWalletModal({ closePopup }) {
  const { setSmartWallet } = useContext(UserContext)
  const [password, setPassword] = useState("")

  const handelGenerateLocalWallet = async () => {
    setSmartWallet("localWallet")
    const { jsonDataEncoded, privateKeyEncoded } = await createLocalWalletUtil({
      password,
    })
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 bg-gray-500 backdrop-filter backdrop-blur-sm">
      <div className="w-96 h-70 flex flex-col bg-gradient-to-br from-blue-500 to-blue-700 backdrop-filter backdrop-blur-sm rounded-lg p-6 space-y-10">
        <div className=" flex justify-center font-bold text-2xl">
          Local Wallet
        </div>
        <div className=" flex flex-col space-y-3">
          <label className="">Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-lg px-4 py-2 border border-gray-300 focus:outline-none focus:border-blue-500 text-black"
          />
        </div>
        <button
          className="bg-white text-blue-500 py-2 px-4 rounded-lg"
          onClick={() => {
            closePopup()
            handelGenerateLocalWallet()
          }}
        >
          General Wallet
        </button>
      </div>
    </div>
  )
}
