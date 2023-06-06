import { useState, useContext, useEffect } from "react"
import { UserContext } from "@/pages/_app"
import { GetTokenUriUtil } from "../utils/NftUtils"
import Image from "next/image"
import NftModal from "./NftModal"
import { GetListingUtil } from "@/utils/NftMarketplaceUtils"
import { ethers } from "ethers"

export default function NftBox({
  nftAddress,
  tokenId,
  seller,
  price,
  nftMarketplaceAddress,
  isListed,
}) {
  const { smartWallet } = useContext(UserContext)

  const [imageUrl, setImageUrl] = useState("")
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [displaySeller, setDisplaySeller] = useState("")
  const [isOwnerUser, setIsOwnerUser] = useState(false)
  const [priceData, setPriceData] = useState()

  const hideModal = () => showModal(false)

  useEffect(() => {
    updateNftUI()
    getNftPrice()
  }, [])

  useEffect(() => {
    if (smartWallet) updateDetails()
  }, [smartWallet])

  const updateDetails = async () => {
    const smartWalletAddress = await smartWallet.getAddress()

    const isOwnerUser = seller === smartWalletAddress || seller === undefined

    if (isOwnerUser) {
      setIsOwnerUser(true)
      setDisplaySeller("You")
    } else {
      setIsOwnerUser(false)
      setDisplaySeller(truncateAddress(seller))
    }
  }

  const getNftPrice = async () => {
    console.log("nftMarketplaceAddress: ", nftMarketplaceAddress)
    console.log("nftAddress: ", nftAddress)
    console.log("tokenId: ", tokenId)
    const data = await GetListingUtil(
      nftMarketplaceAddress,
      nftAddress,
      tokenId
    )
    console.log("price data: ", ethers.utils.formatEther(data.price))
    setPriceData(ethers.utils.formatEther(data.price))
  }

  function truncateAddress(address, length = 5) {
    if (typeof address !== "string") {
      return ""
    }

    const truncatedFront = address.substring(0, length)
    const truncatedBack = address.substring(address.length - length)

    return `${truncatedFront}...${truncatedBack}`
  }

  async function updateNftUI() {
    const tokenUri = await GetTokenUriUtil(nftAddress, tokenId)
    if (tokenUri) {
      const requestURL = tokenUri.replace(
        "ipfs://",
        "https://cloudflare-ipfs.com/ipfs/"
      )
      const tokenUriResponse = await (await fetch(requestURL)).json()
      const imageUri = tokenUriResponse.tokenUriMetadata.image

      const imageUriUrl = imageUri.replace(
        "https://ipfs.io/ipfs/",
        "https://cloudflare-ipfs.com/ipfs/"
      )
      setImageUrl(imageUriUrl)
      setName(tokenUriResponse.tokenUriMetadata.name)
      setDescription(tokenUriResponse.tokenUriMetadata.description)
    }
  }

  const handelCardClick = async () => {
    setShowModal(true)
  }

  return (
    <div>
      <div>
        {showModal && (
          <NftModal
            isListed={isListed}
            smartWallet={smartWallet}
            nftAddress={nftAddress}
            tokenId={tokenId}
            closeModal={() => setShowModal(false)}
            isUserOwner={isOwnerUser}
          />
        )}
      </div>
      <div>
        <button
          className="flex flex-col bg-gradient-to-br from-blue-100 to-blue-200 rounded-md p-4 w-52 h-72 items-center space-x-1 hover:bg-gradient-to-br hover:from-blue-200 hover:to-blue-300"
          onClick={handelCardClick}
        >
          <div className="rounded-lg overflow-hidden">
            <Image
              loader={() => imageUrl}
              src={imageUrl}
              alt="Image Description"
              width={200}
              height={200}
            />
          </div>
          <div className="flex flex-col text-left py-1 text-slate-900 space-y-2">
            <h3 className="font-bold text-lg">Owned by: {displaySeller}</h3>
            <p className="text-base">{name}</p>
            <p className="text-xs">{description}</p>
            {isOwnerUser ? (
              isListed ? (
                <p className="text-xs italic">{priceData}</p>
              ) : (
                <p className="text-xs italic">unlisted</p>
              )
            ) : (
              <p className=" text-sm">Price: {priceData}</p>
            )}
          </div>
        </button>
      </div>
    </div>
  )
}
