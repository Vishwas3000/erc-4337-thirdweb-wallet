import Link from "next/link"
import { ConnectWallet } from "@thirdweb-dev/react"

export default function Header() {
  return (
    <nav className="border-b-4 border-solid p-5 flex flex-row justify-between items-center">
      <h1 className="py-4 px-4 font-bold text-3xl">NFT Marketplace</h1>
      <div className="flex flex-row items-center">
        <Link href="/" className="mr-4 p-6">
          Buy
        </Link>
        <Link href="/mint-NFT" className="mr-4 p-6">
          Mint
        </Link>
        <Link href="/list-NFT" className="mr-4 p-6">
          List NFT
        </Link>
        <Link href="/owned-NFT" className="mr-4 p-6">
          Owned NFT
        </Link>
        <Link href="/created-NFT" className="mr-4 p-6">
          Created NFT
        </Link>
      </div>
    </nav>
  )
}
