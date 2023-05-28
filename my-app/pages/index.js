import Image from "next/image"
import { Inter } from "next/font/google"
import { ConnectWallet, Web3Button, useAddress } from "@thirdweb-dev/react"

const inter = Inter({ subsets: ["latin"] })

export default function Home() {
  const NFTAddress = "0xaC96B67B3BAf4ADD16e11318019Fd4101F547983"

  const address = useAddress()
  console.log("address: ", address)

  return (
    <div className="flex flex-col justify-center w-1/6">
      <ConnectWallet />
      <Web3Button
        contractAddress={NFTAddress}
        action={(contract) => contract.erc1155.claim(0, 1)}
        onSuccess={async () => {
          alert("Claim successful!")
        }}
        style={{ width: "100%", marginTop: "10px" }}
      >
        Claim!
      </Web3Button>
    </div>
  )
}
