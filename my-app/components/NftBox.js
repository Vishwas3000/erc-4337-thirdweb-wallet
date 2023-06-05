import { useState, useContext, useEffect } from "react"
import { UserContext } from "@/pages/_app"
import { GetTokenUriUtil } from "../utils/NftUtils"
import Image from "next/image"

export default function NftBox({ nftAddress, tokenId, seller }) {
  const { smartWallet } = useContext(UserContext)

  const [imageUrl, setImageUrl] = useState("")
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [displaySeller, setDisplaySeller] = useState("")
  const [isOwnerUser, setIsOwnerUser] = useState(false)

  const hideModal = () => showModal(false)

  useEffect(() => {
    updateNftUI()
    updateDetails()
  }, [])

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

  function truncateAddress(address, length = 5) {
    if (typeof address !== "string") {
      return ""
    }

    const truncatedFront = address.substring(0, length)
    const truncatedBack = address.substring(address.length - length)

    return `${truncatedFront}...${truncatedBack}`
  }

  async function updateNftUI() {
    const tokenUri = await GetTokenUriUtil(nftAddress, tokenId, smartWallet)
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

  async function buyItem() {
    // Implement buyItem function
  }

  const handelCardClick = async () => {
    isOwnerUser ? setShowModal(true) : buyItem()
  }

  return (
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
          <h3 className="font-bold text-base">Owned by: {displaySeller}</h3>
          <p className="text-base">{name}</p>
          <p className="text-xs">{description}</p>
        </div>
      </button>
    </div>
  )
}
