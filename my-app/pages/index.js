import Image from "next/image"
import { Inter } from "next/font/google"
import { Web3Button, useAddress } from "@thirdweb-dev/react"
import { nftMarketplaceAbi, contractAddress } from "../constants"
import { useState, useEffect, useContext } from "react"
import { UserContext } from "./_app"

export default function Home() {
  const [tokenId, setTokenId] = useState(0)
  const { user, EOA } = useContext(UserContext)

  return (
    <div className="flex flex-col justify-center p-5">
      <div className=" flex flex-col space-y-5">
        <div className="">
          <label className="block mb-2 font-thin text-sm">Enter token id</label>
          <input
            type="integer"
            placeholder="token ID"
            onChange={(e) => {
              setTokenId(e.target.value)
            }}
            className="border border-gray-300 py-1 px-4 rounded-lg text-violet-950"
          ></input>
        </div>

        <button
          className="rounded-lg bg-blue-500 text-white h-10 w-20 hover:bg-blue-600"
          onClick={() => {}}
        >
          Buy NFT
        </button>
      </div>
    </div>
  )
}
