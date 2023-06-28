import { contractAddress } from "../constants"
import { useState, useEffect, useContext } from "react"
import { UserContext } from "./_app"
import NftBox from "@/components/NftBox"

export default function Home() {
  const [tokenId, setTokenId] = useState(0)
  const { user, EOA } = useContext(UserContext)

  const [nfts, setNfts] = useState([])

  const NFTMarketplaceAddress = contractAddress["NFTMarketplace"]

  const handleDisplayNfts = async () => {
    const req = await fetch(`http://13.234.122.138:3000/nft`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    const res = await req.json()
    console.log("res: ", res)

    if (req.status === 200) {
      const extractedArray = res.map((item) => {
        return {
          id: item.id,
          nftAddress: item.nft_smart_contract_address,
          seller: item.owner_smart_wallet.wallet_address,
          isListed: item.is_listed,
        }
      })
      setNfts(extractedArray)
    }
  }

  useEffect(() => {
    handleDisplayNfts()
  }, [])

  return (
    <div>
      <div className=" flex flex-col w-1/5 space-y-4 p-5">
        <div className="grid grid-cols-6 gap-60">
          {nfts.map((nft) => (
            <NftBox
              nftAddress={nft.nftAddress}
              seller={nft.seller}
              tokenId={nft.id}
              key={`${nft.nftAddress}${nft.id}`}
              isListed={nft.isListed}
              nftMarketplaceAddress={NFTMarketplaceAddress}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
