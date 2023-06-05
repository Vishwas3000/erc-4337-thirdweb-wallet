const { ThirdwebSDK } = require("@thirdweb-dev/react")

async function GetTokenUriUtil(nftAddress, tokenId, smartWallet) {
  const sdk = await ThirdwebSDK.fromWallet(smartWallet)
  const contract = await sdk.getContract(nftAddress)
  const tokenUri = await contract.call("tokenURI", [tokenId])

  return tokenUri
}

export { GetTokenUriUtil }
