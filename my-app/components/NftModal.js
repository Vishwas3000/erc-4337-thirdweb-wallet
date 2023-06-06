import { useState } from "react"
import { ApproveNftToUtil } from "@/utils/NftUtils"
import { ListItemUtil } from "@/utils/NftMarketplaceUtils"
import { contractAddress } from "@/constants"

export default function NftModal({
  isListed,
  nftAddress,
  tokenId,
  smartWallet,
  closeModal,
}) {
  const [price, setPrice] = useState(0)

  const handleUpdateNftServer = async (isListed) => {
    const data = {
      id: tokenId,
      is_listed: isListed,
    }

    const req = await fetch("http://localhost:3000/nft/update/listing", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    const res = await req.json()
    console.log("res: ", res)
  }

  const handleApproveListNft = async () => {
    // Approve marketplace to transfer nft

    const tx = await ApproveNftToUtil(
      nftAddress,
      contractAddress["NFTMarketplace"],
      tokenId,
      smartWallet
    )

    console.log("Approved nft : ", tx)

    // List nft on marketplace
    console.log("price", price)
    const tx2 = await ListItemUtil(
      contractAddress["NFTMarketplace"],
      nftAddress,
      tokenId,
      price,
      smartWallet
    )
    console.log("listed in marketplace: ", tx2)

    if (tx2.status === 1) {
      alert("NFT listed successfully")
      handleUpdateNftServer(true)
      closeModal()
    } else if (tx2.status === 0) {
      alert("NFT listing failed")
      closeModal()
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 bg-gray-500 backdrop-filter backdrop-blur-sm">
      <div className="w-96 h-60 flex flex-col bg-gradient-to-br from-blue-500 to-blue-700 backdrop-filter backdrop-blur-sm rounded-lg p-6 space-y-10">
        <div>
          {isListed ? (
            <div>
              <div className=" flex flex-row justify-between">
                <div className="text-white text-center text-xl font-bold flex-grow">
                  Update Nft
                </div>
                <button
                  className="bg-transparent text-white rounded-md p-1 hover:bg-blue-800"
                  onClick={closeModal}
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
              <div className=" p-4">
                <label className="block mb-2 font-thin text-sm">
                  Enter nft price
                </label>
                <input
                  type="integer"
                  placeholder="nft price"
                  onChange={(e) => {
                    setPrice(e.target.value)
                  }}
                  className="border border-gray-300 py-1 px-4 rounded-lg text-violet-950"
                ></input>
              </div>
              <div className=" flex flex-row justify-between px-4">
                <button className="bg-white text-blue-500 py-1 px-4 rounded-lg">
                  Update Price
                </button>

                <button className=" text-white bg-red-600 py-1 px-4 rounded-lg">
                  Remove Listing
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className=" flex flex-row justify-between">
                <div className="text-white text-center text-xl font-bold flex-grow">
                  List Nft
                </div>
                <button
                  className="bg-transparent text-white rounded-md p-1 hover:bg-blue-800"
                  onClick={closeModal}
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
              <div className=" p-4">
                <label className="block mb-2 font-thin text-sm">
                  Enter nft price
                </label>
                <input
                  type="integer"
                  placeholder="nft price"
                  onChange={(e) => {
                    setPrice(e.target.value)
                  }}
                  className="border border-gray-300 py-1 px-4 rounded-lg text-violet-950"
                ></input>
              </div>
              <div className=" px-4">
                <button
                  className="bg-white text-blue-500 py-1 px-4 rounded-lg"
                  onClick={handleApproveListNft}
                >
                  ListNFT
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
