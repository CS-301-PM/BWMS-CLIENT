import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { BrowserProvider, JsonRpcSigner, ethers } from 'ethers'
import { useToast } from '../hooks/use-toast'

interface BlockchainContextType {
  provider: BrowserProvider | null
  signer: JsonRpcSigner | null
  account: string | null
  chainId: number | null
  isConnected: boolean
  isConnecting: boolean
  connectWallet: () => Promise<void>
  disconnectWallet: () => void
}

const BlockchainContext = createContext<BlockchainContextType | undefined>(undefined)

export const useBlockchain = () => {
  const context = useContext(BlockchainContext)
  if (context === undefined) {
    throw new Error('useBlockchain must be used within a BlockchainProvider')
  }
  return context
}

interface BlockchainProviderProps {
  children: ReactNode
}

export const BlockchainProvider: React.FC<BlockchainProviderProps> = ({ children }) => {
  const [provider, setProvider] = useState<BrowserProvider | null>(null)
  const [signer, setSigner] = useState<JsonRpcSigner | null>(null)
  const [account, setAccount] = useState<string | null>(null)
  const [chainId, setChainId] = useState<number | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const { toast } = useToast()

  // Check if MetaMask is installed
  const isMetaMaskInstalled = () => {
    return typeof window !== 'undefined' && !!window.ethereum
  }

  // Handle account and chain changes
  useEffect(() => {
    if (!isMetaMaskInstalled()) return

    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length === 0) {
        disconnectWallet()
        toast({
          title: 'Account disconnected',
          description: 'Your wallet has been disconnected.',
        })
      } else if (accounts[0] !== account) {
        setAccount(accounts[0])
        toast({
          title: 'Account changed',
          description: `Connected to account: ${accounts[0].slice(0, 8)}...`,
        })
      }
    }

    const handleChainChanged = (newChainId: string) => {
      const chainId = parseInt(newChainId, 16)
      setChainId(chainId)
      window.location.reload() // Recommended by MetaMask docs
    }

    window.ethereum?.on('accountsChanged', handleAccountsChanged)
    window.ethereum?.on('chainChanged', handleChainChanged)

    return () => {
      window.ethereum?.removeListener('accountsChanged', handleAccountsChanged)
      window.ethereum?.removeListener('chainChanged', handleChainChanged)
    }
  }, [account, toast])

  const connectWallet = async () => {
    if (!isMetaMaskInstalled()) {
      toast({
        title: 'MetaMask not found',
        description: 'Please install MetaMask to use blockchain features.',
        variant: 'destructive',
      })
      return
    }

    try {
      setIsConnecting(true)
      
      // Request account access
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      })

      if (accounts.length === 0) {
        throw new Error('No accounts found')
      }

      // Create provider and signer
      const newProvider = new BrowserProvider(window.ethereum)
      const newSigner = await newProvider.getSigner()
      const network = await newProvider.getNetwork()

      setProvider(newProvider)
      setSigner(newSigner)
      setAccount(accounts[0])
      setChainId(Number(network.chainId))
      setIsConnected(true)

      toast({
        title: 'Wallet connected',
        description: `Successfully connected to MetaMask.`,
      })
    } catch (error: any) {
      console.error('Failed to connect wallet:', error)
      toast({
        title: 'Connection failed',
        description: error.message || 'Failed to connect to MetaMask',
        variant: 'destructive',
      })
    } finally {
      setIsConnecting(false)
    }
  }

  const disconnectWallet = () => {
    setProvider(null)
    setSigner(null)
    setAccount(null)
    setChainId(null)
    setIsConnected(false)
  }

  // Auto-connect if previously connected
  useEffect(() => {
    const checkConnection = async () => {
      if (!isMetaMaskInstalled()) return

      try {
        const accounts = await window.ethereum.request({
          method: 'eth_accounts',
        })

        if (accounts.length > 0) {
          // We have accounts, set up provider and signer
          const newProvider = new BrowserProvider(window.ethereum)
          const newSigner = await newProvider.getSigner()
          const network = await newProvider.getNetwork()

          setProvider(newProvider)
          setSigner(newSigner)
          setAccount(accounts[0])
          setChainId(Number(network.chainId))
          setIsConnected(true)
        }
      } catch (error) {
        console.error('Failed to check wallet connection:', error)
      }
    }

    checkConnection()
  }, [])

  const value: BlockchainContextType = {
    provider,
    signer,
    account,
    chainId,
    isConnected,
    isConnecting,
    connectWallet,
    disconnectWallet,
  }

  return <BlockchainContext.Provider value={value}>{children}</BlockchainContext.Provider>
}

// Extend Window interface to include ethereum
declare global {
  interface Window {
    ethereum?: any
  }
}