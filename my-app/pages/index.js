import Image from "next/image"
import { Inter } from "next/font/google"
import { Web3Button, useAddress } from "@thirdweb-dev/react"
import { nftMarketplaceAbi, contractAddress } from "../constants"
import { useState, useEffect, useContext } from "react"
import { UserContext } from "./_app"

export default function Home() {
  const [tokenId, setTokenId] = useState(0)
  const { user } = useContext(UserContext)
  const NFTAddress = contractAddress["NFTMarketplace"]

  const address = useAddress()
  console.log("address: ", address)
  console.log("user: ", user)

  const handleAddWallet = async () => {
    console.log("adding wallet to backend")
    const data = {
      wallet_address: address,
      wallet_name: "some Wallet",
      user_mail_id: user,
    }

    const req = await fetch("http://localhost:3000/wallet/create", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })

    console.log(req)
    const res = await req.json()
    console.log(res)
    if (res.status == 201) {
      alert("Wallet Added")
      return { respond: req.status, message: "success" }
    } else {
      return { respond: req.status, message: res.message }
    }
  }

  useEffect(() => {
    if (address) handleAddWallet()
  }, [address, user])

  return (
    <div className="flex flex-col justify-center w-1/6 p-5">
      <div className="">
        <label className="block mb-2 font-thin">Enter token id</label>
        <input
          type="integer"
          placeholder="token ID"
          onChange={(e) => {
            setTokenId(e.target.value)
          }}
          className="border border-gray-300 py-1 px-4 rounded-lg text-violet-950"
        ></input>
      </div>
      <Web3Button
        contractAddress={NFTAddress}
        contractAbi={nftMarketplaceAbi}
        action={async (contract) => {
          console.log("contract: ", contract)
          const data = await contract.call("buyItem", [
            contractAddress["NFT"],
            tokenId,
          ])
          console.log("data: ", data)
        }}
        onSuccess={async () => {
          alert("Claim successful!")
        }}
        style={{ width: "100%", marginTop: "10px" }}
      >
        Buy nft
      </Web3Button>
    </div>
  )
}
