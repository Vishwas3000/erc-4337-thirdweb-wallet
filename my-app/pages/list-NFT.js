import { useState, useContext, useEffect } from "react"
import { UserContext } from "../pages/_app"
import { contractAddress, nftAbi, nftMarketplaceAbi } from "../constants"
import NftBox from "../components/NftBox"

export default function ListNFT() {
  const { smartWallet, EOA } = useContext(UserContext)
  const [nfts, setNfts] = useState([])

  const handleGetNftOwnedByUser = async () => {
    console.log("smartWallet: ", smartWallet)
    if (!smartWallet) {
      const address = await EOA.getAddress()
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
      const extractedArray = res.map((item) => {
        return {
          id: item.id,
          nftAddress: item.nft_smart_contract_address,
          seller: smartWalletAddress,
        }
      })
      console.log("extracted nfts: ", extractedArray)
      setNfts(extractedArray)
    }
  }

  useEffect(() => {
    handleGetNftOwnedByUser()
  }, [])

  useEffect(() => {
    console.log("nfts: ", nfts)
  }, [nfts])

  return (
    <div>
      <div className=" flex flex-col w-1/5 space-y-4 p-5">
        <div className="grid grid-cols-3 gap-60">
          {nfts.map((nft) => (
            <NftBox
              nftAddress={nft.nftAddress}
              seller={nft.seller}
              tokenId={nft.id}
              key={`${nft.nftAddress}${nft.id}`}
            />
          ))}
        </div>
        <button className=" flex justify-center rounded-lg bg-blue-500 text-white py-2 w-20 hover:bg-blue-600">
          List NFT
        </button>
      </div>
    </div>
  )
}
