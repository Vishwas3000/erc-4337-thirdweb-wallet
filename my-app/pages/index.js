import Image from "next/image"
import { Inter } from "next/font/google"
import { ConnectWallet, Web3Button, useAddress } from "@thirdweb-dev/react"
import { nftMarketplaceAbi, contractAddress } from "../constants"
import { useState } from "react"

const inter = Inter({ subsets: ["latin"] })

export default function Home() {
  const [tokenId, setTokenId] = useState(0)
  const NFTAddress = contractAddress["NFTMarketplace"]

  const address = useAddress()
  console.log("address: ", address)

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
