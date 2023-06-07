import { UserContext } from "@/pages/_app"
import { useContext, useState, useEffect } from "react"
import {
  LoadLocalWalletUtil,
  GenerateLocalWalletUtil,
} from "../utils/createLocalWalletUtil"
import { createSmartWalletUtil } from "@/utils/createSmartWalletUtil"
import ClosePopup from "./closePopup"
import { LocalWallet } from "@thirdweb-dev/wallets"

export default function LocalWalletModal({ closePopup }) {
  const { user, setEOA, setSmartWallet, setIsEOAConnected } =
    useContext(UserContext)
  const [password, setPassword] = useState("")
  const [file, setFile] = useState()

  const handelGenerateSmartWallet = async (personalWallet) => {
    const newSmartWallet = await createSmartWalletUtil({ personalWallet })
    setSmartWallet(newSmartWallet)
  }

  const handelLoadLocalWallet = async () => {
    const { jsonDataEncoded, privateKeyEncoded, wallet } =
      await LoadLocalWalletUtil({
        password,
      })

    console.log("Loading local wallet: ", wallet)

    setEOA(wallet)
    setIsEOAConnected(true)

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

    sessionStorage.setItem("localWalletPassword", password)
    handelGenerateSmartWallet(wallet)
  }

  const handelGenerateLocalWallet = async () => {
    const { jsonDataEncoded, privateKeyEncoded, wallet } =
      await GenerateLocalWalletUtil({
        password,
      })

    console.log("Generating local wallet: ", wallet)

    setEOA(wallet)
    setIsEOAConnected(true)

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
      sessionStorage.setItem("localWalletPassword", password)
      handelGenerateSmartWallet(wallet)
    }
  }

  const handleImportWallet = async () => {
    if (file) {
      const reader = new FileReader()

      reader.onload = async (e) => {
        const contents = e.target.result
        const jsonData = JSON.parse(contents)

        // Do something with the JSON data
        console.log(jsonData)

        const localWallet = new LocalWallet()

        await localWallet.import({
          encryptedJson: JSON.stringify(jsonData),
          password: password,
        })
        setEOA(localWallet)
        setIsEOAConnected(true)

        handelGenerateSmartWallet(localWallet)
      }

      reader.readAsText(file)
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 bg-gray-500 backdrop-filter backdrop-blur-sm">
      <div className="w-96 h-70 flex flex-col bg-gradient-to-br from-blue-500 to-blue-700 backdrop-filter backdrop-blur-sm rounded-lg p-6 space-y-10">
        <div className=" flex flex-row justify-around">
          <div className=" flex justify-center font-bold text-2xl flex-grow">
            Local Wallet
          </div>
          <ClosePopup closePopup={closePopup} />
        </div>
        <div className=" flex flex-col space-y-2">
          <label className="">Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-lg px-4 py-2 border border-gray-300 focus:outline-none focus:border-blue-500 text-black"
          />
        </div>
        <div className=" flex flex-col space-y-2">
          <label className="">Import EncryptWallet</label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
          ></input>
        </div>
        <div className=" grid grid-cols-2 gap-4">
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
          <button
            className=" text-white bg-green-600 py-2 px-4 rounded-lg"
            onClick={() => {
              handleImportWallet()
              closePopup()
            }}
          >
            Import wallet
          </button>
        </div>
      </div>
    </div>
  )
}
