import { createContext, useContext } from "react";
import { StockItem } from "../reducers/StockReducer";

export interface StockState {
  stocks: StockItem[];
  pending: StockItem[];
  approved: StockItem[];
  declined: StockItem[];
  error?: string | null;
  loading?: boolean;
}

type StockContextType = {
  state: StockState;
  getStocks: () => void;
  moveStock: (ids: string[], newLocation: string) => void;
  requestStock: (ids: string[]) => void;
  approveStock: (id: string) => void;
  deleteStock: (id: string) => void;
  rejectStock: (id: string) => void;
  addStock: (stock: StockItem) => void;
  updateStock: (stock: StockItem) => void;
  getPendingStocks: () => void;
  getApprovedStocks: () => void;
  getDeclinedStocks: () => void;
  reportStock: (id: string) => void;
  processStockRequests: ({
    stockId,
    process,
  }: {
    stockId: string;
    process: "start" | "ready" | "complete";
  }) => void;
};

const initialState: StockContextType = {
  state: {
    stocks: [],
    pending: [],
    approved: [],
    declined: [],
    error: null,
    loading: false,
  },
  getStocks: () => {},
  moveStock: () => {},
  requestStock: () => {},
  approveStock: () => {},
  deleteStock: () => {},
  rejectStock: () => {},
  addStock: () => {},
  updateStock: () => {},
  getPendingStocks: () => {},
  getApprovedStocks: () => {},
  getDeclinedStocks: () => {},
  reportStock: () => {},
  processStockRequests: () => {},
};

export const StockContext = createContext<StockContextType>(initialState);

export const useStockContext = (): StockContextType => {
  const context = useContext(StockContext);
  if (!context) {
    throw new Error(
      "useStockContext must be used within a StockContextProvider"
    );
  }
  return context;
};
