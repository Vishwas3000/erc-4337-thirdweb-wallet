import { useState, useContext, useEffect, useRef } from "react"
import { UserContext } from "../pages/_app"
import { contractAddress, nftMarketplaceAbi } from "../constants"
import NftBox from "../components/NftBox"
import { ethers } from "ethers"

export default function ListNFT() {
  const { smartWallet, EOA } = useContext(UserContext)
  const [nfts, setNfts] = useState([])

  const isMounted = useRef(false)

  const handleGetNftOwnedByUser = async () => {
    console.log("smartWallet: ", smartWallet)
    if (smartWallet === undefined) {
      const address = await smartWallet.getAddress()
      const req = await fetch(
        `http://localhost:3000/smart-wallet/nfts/${address}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      console.log("req: ", req)
      const res = await req.json()
      console.log("smartWallets: ", res)
      setNfts(res)
    } else {
      const smartWalletAddress = await smartWallet.getAddress()

      console.log("smartWalletAddress: ", smartWalletAddress)
      const req = await fetch(
        `http://localhost:3000/nft/${smartWalletAddress}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      const res = await req.json()
      console.log("res: ", res)
      const extractedArray = res.map((item) => {
        return {
          id: item.id,
          nftAddress: item.nft_smart_contract_address,
          seller: smartWalletAddress,
          isListed: item.is_listed,
        }
      })
      console.log("extracted nfts: ", extractedArray)
      setNfts(extractedArray)
    }
  }

  useEffect(() => {
    if (EOA == undefined) {
      alert("Please connect your wallet")
    } else {
      handleGetNftOwnedByUser()
      if (!isMounted.current) {
        console.log("isMounted: ", isMounted.current)
        console.log("listning to events")
        handleListenEvent()

        isMounted.current = true
      }
    }
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
      handleUdateFilter(data)
    })

    const handleUdateFilter = async (data) => {
      console.log("ItemUpdated event emitted: ", data)
      const transactionHash = data.transactionHash
      const nftSeller = ethers.utils.getAddress(`0x${data.topics[1].slice(26)}`)
      const nftAddress = ethers.utils.getAddress(
        `0x${data.topics[2].slice(26)}`
      )
      const tokenId = parseInt(data.topics[3], 16)

      const price = parseInt(data.data, 16)
      const transactionData = {
        tokenId: tokenId,
        NFTAddress: nftAddress,
        price: price,
      }

      console.log("transactionData: ", transactionData)

      handleSendTransactionToServer(
        transactionHash,
        nftSeller,
        transactionData,
        "updateListing"
      )

      handleUpdateListingNftServer(true, tokenId, price)
    }

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

      handleUpdateListingNftServer(false, tokenId)
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
      transaction_data: JSON.stringify(transaction_data),
    }

    const req = await fetch("http://localhost:3000/transaction/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    const res = await req.json()
    console.log("res: ", res)
  }

  const handleUpdateListingNftServer = async (
    isListed,
    tokenId,
    price = null
  ) => {
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

  useEffect(() => {
    console.log("nfts: ", nfts)
  }, [nfts])

  return (
    <div>
      <div className=" flex flex-col w-1/5 space-y-4 p-5">
        <div className="grid gap-60 grid-cols-4">
          {nfts.map((nft) => (
            <NftBox
              nftAddress={nft.nftAddress}
              seller={nft.seller}
              tokenId={nft.id}
              key={`${nft.nftAddress}${nft.id}`}
              isListed={nft.isListed}
              nftMarketplaceAddress={contractAddress["NFTMarketplace"]}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
