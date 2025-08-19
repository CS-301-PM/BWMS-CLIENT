import { createContext, useContext } from "react";

// Define Blockchain Log type
export interface BlockchainLog {
  serial: string;
  itemName: string;
  timeApplied: string;
  hash: string;
  action: string;
  user: string;
  status: string;
  actions?: string;
}

// Define context type
interface BlockchainContextType {
  recordLogs: (log: BlockchainLog) => Promise<void>;
  getLogs: () => Promise<void>;
  logs: BlockchainLog[];
  latestLog: BlockchainLog | null;
  isLoading: boolean;
  error: string | null;
}

// Initial context values
const initialState: BlockchainContextType = {
  recordLogs: async () => Promise.resolve(),
  getLogs: async () => Promise.resolve(),
  logs: [],
  latestLog: null,
  isLoading: false,
  error: null,
};

// Create context
export const BlockchainContext =
  createContext<BlockchainContextType>(initialState);

// Custom hook
export const useBlockchainContext = (): BlockchainContextType => {
  const context = useContext(BlockchainContext);

  if (!context) {
    throw new Error(
      "useBlockchainContext must be used within a BlockchainContextProvider"
    );
  }

  return context;
};
