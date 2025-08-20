import { ethers } from 'ethers'

export const formatAddress = (address: string): string => {
  if (!address) return ''
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

export const formatTransactionHash = (hash: string): string => {
  if (!hash) return ''
  return `${hash.slice(0, 8)}...${hash.slice(-6)}`
}

export const isValidEthereumAddress = (address: string): boolean => {
  return ethers.isAddress(address)
}

export const isValidTransactionHash = (hash: string): boolean => {
  return /^0x([A-Fa-f0-9]{64})$/.test(hash)
}

export const getNetworkName = (chainId: number): string => {
  const networks: Record<number, string> = {
    1: 'Ethereum Mainnet',
    5: 'Goerli Testnet',
    11155111: 'Sepolia Testnet',
    137: 'Polygon Mainnet',
    80001: 'Mumbai Testnet',
    31337: 'Localhost',
  }
  return networks[chainId] || `Chain ${chainId}`
}

export const parseBlockchainError = (error: any): string => {
  if (error?.code === 'ACTION_REJECTED') {
    return 'Transaction was rejected by user'
  }
  
  if (error?.code === 'INSUFFICIENT_FUNDS') {
    return 'Insufficient funds for transaction'
  }
  
  if (error?.code === 'NETWORK_ERROR') {
    return 'Network error occurred. Please check your connection.'
  }
  
  if (error?.message?.includes('user rejected signing')) {
    return 'User rejected the signing request'
  }
  
  return error?.message || 'An unknown blockchain error occurred'
}

export const waitForTransaction = async (
  provider: ethers.Provider,
  txHash: string,
  confirmations: number = 1
): Promise<ethers.TransactionReceipt> => {
  const receipt = await provider.waitForTransaction(txHash, confirmations)
  if (!receipt) {
    throw new Error('Transaction receipt not found')
  }
  return receipt
}