function truncateAddress(address, length = 5) {
  if (typeof address !== "string") {
    return ""
  }

  const truncatedFront = address.substring(0, length)
  const truncatedBack = address.substring(address.length - length)

  return `${truncatedFront}...${truncatedBack}`
}

export { truncateAddress }
