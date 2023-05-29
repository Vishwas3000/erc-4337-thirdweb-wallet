import "@/styles/globals.css"
import { Mumbai } from "@thirdweb-dev/chains"
import {
  ThirdwebProvider,
  smartWallet,
  localWallet,
  metamaskWallet,
  coinbaseWallet,
  paperWallet,
  ConnectWallet,
} from "@thirdweb-dev/react"
import Header from "../components/Header"

export default function App({ Component, pageProps }) {
  return (
    <div>
      <ThirdwebProvider
        autoConnect={false}
        activeChain={Mumbai}
        supportedWallets={[
          smartWallet({
            gasless: true,
            factoryAddress: "0x7Fd9dC9DecbE183B20d1639139E59322e06e305b",
            thirdwebApiKey:
              "bd965b1fbb9307a1b9dc5da1282ea82d768843fc9a847df50a8cd91842c7241b071168f228e1b67b5f4b820ae1ad6ec16b399b175408e2bc23ac383f4ecc6c82",
            chain: Mumbai,
            personalWallets: [
              metamaskWallet(),
              localWallet({ persist: true }),
              coinbaseWallet(),
              paperWallet({ clientId: "e3a8a73c-c3d4-4347-b92d-c0b8e9bae45c" }),
            ],
          }),
          localWallet({ persist: true }),
          metamaskWallet(),
        ]}
        sdkOptions={{
          gasless: {
            openzeppelin: {
              relayerUrl:
                "https://api.defender.openzeppelin.com/autotasks/3ee8aadd-bf88-4c2d-9430-4134b88280bb/runs/webhook/82f4c2fb-4f41-4394-9f44-d37c60fb1a34/J1wqcNRwwaFMGnS3kqMN4M",
            },
          },
        }}
      >
        <Header />
        <ConnectWallet />

        <Component {...pageProps} />
      </ThirdwebProvider>
    </div>
  )
}
