import { useEffect, useState } from "react"
import { useAddress, Web3Button } from "@thirdweb-dev/react"
// import { Button, Upload, Input, useNotification } from "web3uikit"
// import { MintNftUtil, GetTokenCounterUtil } from "../utils/NftUtils"
// import { useMoralis, useWeb3Contract } from "react-moralis"
import { contractAddress, BLOCK_WAIT_TIME, nftAbi } from "../constants"
import axios from "axios"

const metadataTemplate = {
  name: "",
  description: "",
  image: "",
}

export default function MintNFT() {
  //   const { isWeb3Enabled, account, chainId } = useMoralis()
  //   const { runContractFunction } = useWeb3Contract()
  //   const dispatch = useNotification()

  const address = useAddress()

  const [image, setImage] = useState(null)
  const [nftName, setNftName] = useState("")
  const [nftDescription, setNftDescription] = useState("")
  const [isMinting, setIsMinting] = useState(false)
  const [currentTokenCount, setCurrentTokenCount] = useState(0)

  const nftAddress = contractAddress["NFT"]
  console.log("nftAddress: ", nftAddress)

  //   useEffect(() => {
  //     GetTokenId()
  //   }, [isWeb3Enabled, chainId, isMinting])

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

  //   const GetTokenId = async () => {
  //     const tokenCount = await GetTokenCounterUtil(
  //       nftAddress,
  //       runContractFunction
  //     )
  //     setCurrentTokenCount(tokenCount)
  //   }

  const onIpfsSuccess = async (data) => {
    console.log("IPFS success")
    console.log(data)

    alert("Your NFT has been uploaded to IPFS successfully")
  }

  const onIpfsFail = async () => {
    console.log("IPFS failed")

    alert("Your NFT has not been uploaded to IPFS")
  }

  //   const onMintSuccess = async (tx) => {
  //     tx.wait(BLOCK_WAIT_TIME)
  //     console.log("Minted successfully")
  //     dispatch({
  //       type: "success",
  //       title: "Minted successfully",
  //       position: "topR",
  //       message: `Your NFT successfully minted ID: ${currentTokenCount}`,
  //     })
  //     setIsMinting(false)
  //   }
  const onMintSuccess = async () => {
    console.log("Minted successfully")
    alert("Minted successfully")
    setIsMinting(false)
  }

  //   const onMintFailed = async (tx) => {
  //     console.log("Minting failed")
  //     dispatch({
  //       type: "error",
  //       title: "Minting failed",
  //       position: "topR",
  //       message: "Your NFT has not been minted",
  //     })
  //     setIsMinting(false)
  //   }
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
        <Web3Button
          contractAddress={contractAddress["NFT"]}
          contractAbi={nftAbi}
          action={async (contract) => {
            console.log(" :", contract)
            // const tokenUri = await handleMintToken()
            const tokenUri =
              "ipfs://bafkreics2jesmdzv6seaq7chfsxvfujfvorgflygglwhuleqivsdwnilcy"
            const data = await contract.call("mintNFT", [tokenUri])
            console.log("data: ", data)
          }}
          onSuccess={async () => {
            alert("Claim successful!")
          }}
          isDisabled={isMinting}
        >
          Mint!
        </Web3Button>
      </div>
    </div>
  )
}
