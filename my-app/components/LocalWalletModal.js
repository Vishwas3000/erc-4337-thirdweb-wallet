import { UserContext } from "@/pages/_app"
import { useContext, useEffect, useState } from "react"
import {
  LoadLocalWalletUtil,
  GenerateLocalWalletUtil,
} from "../utils/createLocalWalletUtil"
import createSmartWalletUtil from "@/utils/createSmartWalletUtil"

export default function LocalWalletModal({ closePopup }) {
  const { user, setEOA, setSmartWallet } = useContext(UserContext)
  const [password, setPassword] = useState("")
  const [personalWallet, setPersonalWallet] = useState()

  const handelGenerateSmartWallet = async (personalWallet) => {
    console.log("personal wallet: ", personalWallet)
    const newSmartWallet = await createSmartWalletUtil({
      presonalWallet: personalWallet,
    })

    setSmartWallet(newSmartWallet)

    const data = {
      wallet_address: await newSmartWallet.getAddress(),
      local_wallet_address: await personalWallet.getAddress(),
    }

    const req = await fetch("http://localhost:3000/smart-wallet/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    console.log("Upload smart account", req)
    const res = await req.json()
    console.log("result of server: ", res)
  }

  const handelLoadLocalWallet = async () => {
    const { jsonDataEncoded, privateKeyEncoded, wallet } =
      await LoadLocalWalletUtil({
        password,
      })

    console.log("Loading local wallet: ", wallet)

    setEOA(wallet)
    setPersonalWallet(wallet)

    // const data = {
    //   wallet_address: await wallet.getAddress(),
    //   user_mail_id: user,
    //   wallet_encrypted_data: jsonDataEncoded,
    // }
    // console.log("data: ", data)
    // const req = await fetch("http://localhost:3000/local-wallet/create", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(data),
    // })
    // console.log(req)
    // const res = await req.json()
    // console.log(res)

    // if (req.status === 201) {
    //   handelGenerateSmartWallet(wallet)
    // }
  }

  const handelGenerateLocalWallet = async () => {
    const { jsonDataEncoded, privateKeyEncoded, wallet } =
      await GenerateLocalWalletUtil({
        password,
      })

    console.log("Generating local wallet: ", wallet)

    setEOA(wallet)
    setPersonalWallet(wallet)

    const data = {
      wallet_address: await wallet.getAddress(),
      user_mail_id: user,
      wallet_encrypted_data: jsonDataEncoded,
    }
    console.log("data: ", data)
    const req = await fetch("http://localhost:3000/local-wallet/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    console.log(req)
    const res = await req.json()
    console.log(res)

    if (req.status === 201) {
      handelGenerateSmartWallet(wallet)
    }
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
        <div className=" flex flex-row justify-around">
          <button
            className="bg-white text-blue-500 py-2 px-4 rounded-lg"
            onClick={() => {
              closePopup()
              handelLoadLocalWallet()
            }}
          >
            Load Wallet
          </button>
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
    </div>
  )
}
