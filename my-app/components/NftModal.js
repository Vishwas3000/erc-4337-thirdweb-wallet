import { useState, useEffect, useRef } from "react"
import { ApproveNftToUtil } from "@/utils/NftUtils"
import { ethers } from "ethers"
import {
  ListItemUtil,
  UpdateItemPriceUtil,
  UnListItemUtil,
} from "@/utils/NftMarketplaceUtils"
import { contractAddress, nftMarketplaceAbi } from "@/constants"

export default function NftModal({
  isListed,
  nftAddress,
  tokenId,
  smartWallet,
  closeModal,
  isUserOwner,
}) {
  const [price, setPrice] = useState(0)
  const isMounted = useRef(false)

  useEffect(() => {
    if (!isMounted.current) {
      handleListenEvent()
    }
    isMounted.current = true
  }, [])

  const handleListenEvent = async () => {
    const provider = new ethers.providers.JsonRpcProvider(
      process.env.NEXT_PUBLIC_MUMBAI_RPC_URL
    )

    const contractInst = new ethers.Contract(
      contractAddress["NFTMarketplace"],
      nftMarketplaceAbi,
      provider
    )

    const itemListedFilter = contractInst.filters.ItemListed()
    const itemBoughtFilter = contractInst.filters.ItemBought()
    const itemCancledFilter = contractInst.filters.ItemCancled()

    provider.on(itemListedFilter, (data) => {
      console.log("ItemUpdated event emitted: ", data)
      const transactionHash = data.transactionHash
      const nftSeller = ethers.utils.getAddress(`0x${data.topics[1].slice(26)}`)
      const nftAddress = ethers.utils.getAddress(
        `0x${data.topics[2].slice(26)}`
      )
      const tokenId = parseInt(data.topics[3], 16)

      const price = parseInt(data.data, 16)

      handleSendTransactionToServer(
        transactionHash,
        nftSeller,
        {
          tokenId: tokenId,
          NFTAddress: nftAddress,
          price: price,
        },
        "updateListing"
      )

      handleUpdateListingNftServer(true, price)
    })

    provider.on(itemBoughtFilter, (data) => {
      console.log("ItemBought event emitted: ", data)
      const transactionHash = data.transactionHash
      const nftBuyer = ethers.utils.getAddress(`0x${data.topics[1].slice(26)}`)
      const nftAddress = ethers.utils.getAddress(
        `0x${data.topics[2].slice(26)}`
      )
      const tokenId = parseInt(data.topics[3], 16)

      const price = parseInt(data.data, 16)

      handleSendTransactionToServer(
        transactionHash,
        nftBuyer,
        {
          tokenId: tokenId,
          NFTAddress: nftAddress,
          price: price,
        },
        "buyItem"
      )

      handleUpdateOwnerNftServer(nftBuyer)
    })

    provider.on(itemCancledFilter, (data) => {
      console.log("ItemCancled event emitted: ", data)
      const transactionHash = data.transactionHash
      const nftSeller = ethers.utils.getAddress(`0x${data.topics[1].slice(26)}`)
      const nftAddress = ethers.utils.getAddress(
        `0x${data.topics[2].slice(26)}`
      )
      const tokenId = parseInt(data.data, 16)

      handleSendTransactionToServer(
        transactionHash,
        nftSeller,
        {
          tokenId: tokenId,
          NFTAddress: nftAddress,
          isListed: false,
        },
        "cancelListing"
      )

      handleUpdateListingNftServer(false)
    })
  }

  const handleSendTransactionToServer = async (
    transactionHash,
    smartWalletAddress,
    transaction_data,
    functionName
  ) => {
    const data = {
      transaction_hash: transactionHash,
      smart_wallet_address: smartWalletAddress,
      function_called: functionName,
      transaction_data: transaction_data,
    }

    const req = await fetch("http://localhost:3000/transaction/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    const res = await req.json()
  }

  const handleUpdateListingNftServer = async (isListed, price = null) => {
    const data = {
      id: tokenId,
      is_listed: isListed,
      last_listing_price: price,
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

  const handleUpdateOwnerNftServer = async (newOwner) => {
    const data = {
      id: tokenId,
      owner: newOwner,
    }

    const req = await fetch("http://localhost:3000/nft/update/owner", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    const res = await req.json()
    console.log("res: ", res)
  }

  const handleClickApproveListNft = async () => {
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
      closeModal()
    } else if (tx2.status === 0) {
      alert("NFT listing failed")
      closeModal()
    }
  }

  const handleClickUpdateNftPrice = async () => {
    const tx = await UpdateItemPriceUtil(
      contractAddress["NFTMarketplace"],
      contractAddress["NFT"],
      tokenId,
      price,
      smartWallet
    )
    console.log("updated price: ", tx)
  }

  const handleClickRemoveNft = async () => {
    const tx = await UnListItemUtil(
      contractAddress["NFTMarketplace"],
      contractAddress["NFT"],
      tokenId,
      smartWallet
    )

    console.log("removed nft: ", tx)
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 bg-gray-500 backdrop-filter backdrop-blur-sm">
      <div className="w-96 h-60 flex flex-col bg-gradient-to-br from-blue-500 to-blue-700 backdrop-filter backdrop-blur-sm rounded-lg p-6 space-y-10">
        <div>
          {isUserOwner ? (
            isListed ? (
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
                  <button
                    className="bg-white text-blue-500 py-1 px-4 rounded-lg"
                    onClick={handleClickUpdateNftPrice}
                  >
                    Update Price
                  </button>

                  <button
                    className=" text-white bg-red-600 py-1 px-4 rounded-lg"
                    onClick={handleClickRemoveNft}
                  >
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
                    onClick={handleClickApproveListNft}
                  >
                    ListNFT
                  </button>
                </div>
              </div>
            )
          ) : (
            <div className=" space-y-10">
              <div className=" flex flex-row justify-between">
                <div className="text-white text-center text-xl font-bold flex-grow">
                  Buy Nft
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
              <div className=" flex flex-row space-x-5 justify-around">
                <button className="bg-white text-blue-500 py-1 px-4 rounded-lg">
                  Buy NFT
                </button>
                <button className=" bg-red-600 text-white py-1 px-4 rounded-lg">
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
