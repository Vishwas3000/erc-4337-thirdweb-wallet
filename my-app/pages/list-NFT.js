import { useState } from "react"
import { useAddress, Web3Button } from "@thirdweb-dev/react"
import { contractAddress, nftAbi, nftMarketplaceAbi } from "../constants"
import { ethers } from "ethers"

export default function ListNFT() {
  const [tokenId, setTokenId] = useState(0)
  const [listPrice, setListPrice] = useState(0)

  return (
    <div>
      <div className=" p-5">
        <label className="block mb-2 font-thin">Enter tokenId of the NFT</label>
        <input
          type="integer"
          placeholder="tokenId"
          onChange={(e) => {
            setTokenId(e.target.value)
          }}
          className="border border-gray-300 py-1 px-4 rounded-lg text-violet-950"
        ></input>
      </div>
      <div className=" flex flex-col w-1/5 space-y-5 p-5">
        <Web3Button
          contractAddress={contractAddress["NFT"]}
          contractAbi={nftAbi}
          action={async (contract) => {
            const data = await contract.call("approve", [
              contractAddress["NFTMarketplace"],
              tokenId,
            ])
            console.log("data: ", data)
          }}
          onSuccess={() => {
            console.log("Approved successfully")
          }}
        >
          Approve the nft
        </Web3Button>
        <div className="">
          <label className="block mb-2 font-thin">Enter listing price</label>
          <input
            type="integer"
            placeholder="price in eth"
            onChange={(e) => {
              setListPrice(e.target.value)
            }}
            className="border border-gray-300 py-1 px-4 rounded-lg text-violet-950"
          ></input>
        </div>
        <Web3Button
          contractAddress={contractAddress["NFTMarketplace"]}
          contractAbi={nftMarketplaceAbi}
          action={async (contract) => {
            const listPriceWei = ethers.utils.parseEther(listPrice)
            const data = await contract.call("listItem", [
              contractAddress["NFT"],
              tokenId,
              listPriceWei,
            ])
            console.log("data: ", data)
          }}
          onSuccess={() => {
            alert("Listed successfully")
          }}
        >
          List the nft
        </Web3Button>
      </div>
    </div>
  )
}
