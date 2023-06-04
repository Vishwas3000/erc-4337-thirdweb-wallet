import { useContext, useState, useEffect, useRef } from "react"
import { CreateMintNftTransaction } from "@/utils/createTransaction"
import { UserContext } from "./_app"
import { ethers } from "ethers"

import axios from "axios"
import { contractAddress, nftAbi } from "@/constants"

const metadataTemplate = {
  name: "",
  description: "",
  image: "",
}

export default function MintNFT() {
  const [image, setImage] = useState(null)
  const [nftName, setNftName] = useState("")
  const [nftDescription, setNftDescription] = useState("")
  const [isMinting, setIsMinting] = useState(false)

  const isMounted = useRef(false)

  const { smartWallet } = useContext(UserContext)

  const handleListenEvent = async () => {
    const provider = new ethers.providers.JsonRpcProvider(
      process.env.NEXT_PUBLIC_MUMBAI_RPC_URL
    )

    const contractInst = new ethers.Contract(
      contractAddress["NFT"],
      nftAbi,
      provider
    )

    const filter = contractInst.filters.NFTMinted()
    provider.on(filter, (data) => {
      console.log("NFTMinted event emitted: ", data)
      const transactionHash = data.transactionHash
      const createdSmartWalletAddress = ethers.utils.getAddress(
        `0x${data.topics[1].slice(26)}`
      )
      const tokenId = parseInt(data.topics[2], 16)

      handleSendTransactionToServer(
        transactionHash,
        createdSmartWalletAddress,
        { tokenId: tokenId },
        "mintNFT"
      )
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

  useEffect(() => {
    if (!isMounted.current) {
      handleListenEvent()
    }
    isMounted.current = true
  }, [])

  const rename = (name) => {
    let temp = name
    temp = temp.split(".")
    temp[temp.length - 1] = ""
    return temp[0]
  }

  const pinFileToIPFS = async (file) => {
    let data

    const formData = new FormData()
    formData.append("file", file)

    const metadata = JSON.stringify({
      name: rename(file.name),
    })
    formData.append("pinataMetadata", metadata)

    const options = JSON.stringify({
      cidVersion: 0,
    })
    formData.append("pinataOptions", options)

    try {
      const response = await fetch(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        {
          method: "POST",
          headers: {
            pinata_api_key: process.env.NEXT_PUBLIC_PINATA_API_KEY,
            pinata_secret_api_key: process.env.NEXT_PUBLIC_PINATA_API_SECRET,
          },
          body: formData,
        }
      )

      data = await response.json()
      console.log(data)
      // Response example:
      // {
      //   IpfsHash: "QmZ4f4Z4mXYi53YkjQ9tvBvyBXcCPyjkrT1dC1q3qf4AS4",
      //   PinSize: 2239,
      //   Timestamp: "2022-10-17T00:18:26.033Z"
      // }
    } catch (error) {
      console.log(error)
    }
    return data
  }

  const uploadTokenUri = async () => {
    let tokenUriMetadata = { ...metadataTemplate }

    // "pinataOptions": {
    //     "cidVersion": 1
    //   },
    //   "pinataMetadata": {
    //     "name": "testing",
    //     "keyvalues": {
    //       "customKey": "customValue",
    //       "customKey2": "customValue2"
    //     }
    //   },
    //   "pinataContent": {
    //     "somekey": "somevalue"
    //   }

    const ipfsImageData = await pinFileToIPFS(image)
    let tokenUri

    tokenUriMetadata.name = nftName
    tokenUriMetadata.description = nftDescription
    tokenUriMetadata.image = `https://ipfs.io/ipfs/${ipfsImageData.IpfsHash}`

    let metadataToUpload = {
      pinataOptions: {
        cidVersion: 1,
      },

      pinataMetadata: {
        name: nftName,
      },
      pinataContent: {
        tokenUriMetadata,
      },
    }

    console.log("metadata: ", metadataToUpload)

    console.log(`Uploading ${tokenUriMetadata.name} metadata to IPFS`)

    const config = {
      method: "post",
      url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
      headers: {
        "Content-Type": "application/json",
        pinata_api_key: process.env.NEXT_PUBLIC_PINATA_API_KEY,
        pinata_secret_api_key: process.env.NEXT_PUBLIC_PINATA_API_SECRET,
      },
      data: metadataToUpload,
    }
    try {
      const response = await axios(config)
      tokenUri = response.data.IpfsHash
      onIpfsSuccess(response.data)
    } catch (error) {
      console.log(error)
      onIpfsFail()
    }
    return tokenUri
  }

  const handleMintToken = async () => {
    setIsMinting(true)
    let tokenUri = await uploadTokenUri()
    tokenUri = `ipfs://${tokenUri}`
    console.log("tokenUri: ", tokenUri)

    return tokenUri
  }

  const onIpfsSuccess = async (data) => {
    console.log("IPFS success")
    console.log(data)

    alert("Your NFT has been uploaded to IPFS successfully")
  }

  const onIpfsFail = async () => {
    console.log("IPFS failed")

    alert("Your NFT has not been uploaded to IPFS")
  }

  const onMintSuccess = async () => {
    console.log("Minted successfully")
    alert("Minted successfully")
    setIsMinting(false)
  }

  const onMintFailed = async () => {
    console.log("Minting failed")
    alert("Minting failed")
    setIsMinting(false)
  }
  const handleImageUpload = (event) => {
    const file = event.target.files[0]
    // Process the uploaded file here
    console.log(file)
    setImage(file)
  }

  return (
    <div className=" flex flex-col p-11 space-x-5 space-y-5">
      <div className="font-bold text-2xl">MintNFT</div>

      <div className=" flex justify-start place-content-start w-1/3">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="border border-gray-300 py-2 px-4 rounded-lg "
        />
      </div>
      <div className=" flex flex-col justify-start space-y-5">
        <label className="block mb-2 font-medium">Enter name of the NFT</label>
        <input
          type="text"
          className="border border-gray-300 py-2 px-4 rounded-lg text-violet-950"
          placeholder="Type here..."
          value={nftName}
          onChange={(event) => {
            setNftName(event.target.value)
          }}
        />

        <label className="block mb-2 font-medium">
          Enter description of the NFT
        </label>
        <input
          type="text"
          className="border border-gray-300 py-2 px-4 rounded-lg text-violet-950"
          placeholder="Type here..."
          value={nftDescription}
          onChange={(event) => {
            setNftDescription(event.target.value)
          }}
        />
      </div>
      <div className=" py-10">
        <button
          className="rounded-lg bg-blue-500 text-white py-2 px-8 hover:bg-blue-600"
          disabled={isMinting}
          onClick={async () => {
            setIsMinting(true)
            console.log("passing smart wallet: ", smartWallet)
            // const tokenUri = await handleMintToken()
            const tokenUri =
              "ipfs://bafkreibyaufkzgpgu7ybwixq3iewx7ng3catq7svmrue4qbxn4paq2ke5i"
            const { status } = await CreateMintNftTransaction({
              tokenUri,
              smartWallet,
            })
            if (status === 201) {
              alert("Minted successfully")
            }
            setIsMinting(false)
          }}
        >
          Mint
        </button>
      </div>
    </div>
  )
}
