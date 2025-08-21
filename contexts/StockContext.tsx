// StockContext.tsx
import { useReducer, ReactNode } from "react";
import {
  stockReducer,
  StockState,
  GET_STOCKS,
  MOVE_STOCK,
  REQUEST_STOCK,
  APPROVE_STOCK,
  DELETE_STOCK,
  REJECT_STOCK,
  ADD_STOCK,
  UPDATE_STOCK,
  GET_PENDING_STOCKS,
  GET_APPROVED_STOCKS,
  GET_DECLINED_STOCKS,
  StockItem,
} from "../reducers/StockReducer";
import { StockContext } from "../hooks/useStockContext";

export type StockContextType = {
  state: StockState;
  getStocks: () => Promise<void>;
  moveStock: (stockIds: string[], newLocation: string) => Promise<void>;
  requestStock: (stockId: string) => Promise<void>;
  approveStock: (stockId: string) => Promise<void>;
  deleteStock: (stockId: string) => Promise<void>;
  rejectStock: (stockId: string) => Promise<void>;
  addStock: (stock: StockItem) => Promise<void>;
  updateStock: (stock: StockItem) => Promise<void>;
  getPendingStocks: () => Promise<void>;
  getApprovedStocks: () => Promise<void>;
  getDeclinedStocks: () => Promise<void>;
  reportStock: (id: string) => Promise<void>;
  processStockRequests: ({
    stockId,
    process,
  }: {
    stockId: string;
    process: "start" | "ready" | "complete";
  }) => Promise<void>;
};

const initialState: StockState = {
  stocks: [],
  pending: [],
  approved: [],
  declined: [],
  error: null,
  loading: false,
};

export const StockContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(stockReducer, initialState);

  const API = (endpoint: string) =>
    `${(import.meta as any).env.VITE_SERVER}/api/stocks/${endpoint}`;

  const getStocks = async () => {
    try {
      //   const res = await fetch(API(""));
      //   const data: Stock[] = await res.json();

      const stocksSample: StockItem[] = [
        {
          id: "1",
          serialNumber: "STK-001",
          itemName: "Office Supplies - A4 Paper",
          category: "Office Supplies",
          quantity: 150,
          unit: "reams",
          unitValue: 2.5,
          totalValue: 375.0,
          location: "Warehouse A-1",
          supplier: "Office Depot",
          lastUpdated: new Date("2024-03-15"),
          level: "damaged",
          reorderLevel: 50,
          maxLevel: 200,
        },
        {
          id: "2",
          serialNumber: "STK-002",
          itemName: "Computer Equipment - Laptops",
          category: "IT Equipment",
          quantity: 8,
          unit: "units",
          unitValue: 1500.0,
          totalValue: 12000.0,
          location: "IT Storage",
          supplier: "Tech Solutions",
          lastUpdated: new Date("2024-03-14"),
          level: "low-stock",
          reorderLevel: 10,
          maxLevel: 25,
        },
        {
          id: "3",
          serialNumber: "STK-003",
          itemName: "Medical Supplies - First Aid Kits",
          category: "Medical",
          quantity: 0,
          unit: "kits",
          unitValue: 20.0,
          totalValue: 0.0,
          location: "Medical Storage",
          supplier: "MedSupply Co",
          lastUpdated: new Date("2024-03-13"),
          level: "out-of-stock",
          reorderLevel: 15,
          maxLevel: 50,
        },
        {
          id: "4",
          serialNumber: "STK-004",
          itemName: "Furniture - Office Chairs",
          category: "Furniture",
          quantity: 25,
          unit: "units",
          unitValue: 150.0,
          totalValue: 3750.0,
          location: "Warehouse B-2",
          supplier: "Furniture Plus",
          lastUpdated: new Date("2024-03-12"),
          level: "in-stock",
          reorderLevel: 10,
          maxLevel: 30,
        },
      ];

      dispatch({ type: GET_STOCKS, payload: stocksSample });
    } catch (error: any) {
      console.error(error);
    }
  };

  const moveStock = async (stockIds: string[], newLocation: string) => {
    try {
      const res = await fetch(API("move"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stockIds, newLocation }),
      });
      const data: StockItem[] = await res.json();
      dispatch({ type: MOVE_STOCK, payload: data });
    } catch (error) {
      console.error(error);
    }
  };

  const requestStock = async (stockIds: string[]) => {
    try {
      await fetch(API("request"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stockIds }),
      });
      dispatch({ type: REQUEST_STOCK });
    } catch (error) {
      console.error(error);
    }
  };

  const approveStock = async (stockId: string) => {
    try {
      await fetch(API("approve"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stockId }),
      });
      dispatch({ type: APPROVE_STOCK, payload: stockId });
    } catch (error) {
      console.error(error);
    }
  };

  const deleteStock = async (stockId: string) => {
    try {
      await fetch(API("delete"), { method: "DELETE" });
      dispatch({ type: DELETE_STOCK, payload: stockId });
    } catch (error) {
      console.error(error);
    }
  };

  const rejectStock = async (stockId: string) => {
    try {
      await fetch(API("reject"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stockId }),
      });
      dispatch({ type: REJECT_STOCK, payload: stockId });
    } catch (error) {
      console.error(error);
    }
  };

  const addStock = async (stock: StockItem) => {
    try {
      const res = await fetch(API("add"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(stock),
      });
      const data: StockItem = await res.json();
      dispatch({ type: ADD_STOCK, payload: data });
    } catch (error) {
      console.error(error);
    }
  };

  const updateStock = async (updatedStock: StockItem) => {
    try {
      const res = await fetch(API("update"), {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedStock),
      });
      //   const data: StockItem = await res.json();
      dispatch({ type: UPDATE_STOCK, payload: updatedStock });
    } catch (error) {
      console.error(error);
    }
  };

  const getPendingStocks = async () => {
    try {
      const res = await fetch(API("pending"));
      const data: StockItem[] = await res.json();
      dispatch({ type: GET_PENDING_STOCKS, payload: data });
    } catch (error) {
      console.error(error);
    }
  };

  const getApprovedStocks = async () => {
    try {
      const res = await fetch(API("approved"));
      const data: StockItem[] = await res.json();
      dispatch({ type: GET_APPROVED_STOCKS, payload: data });
    } catch (error) {
      console.error(error);
    }
  };

  const getDeclinedStocks = async () => {
    try {
      const res = await fetch(API("declined"));
      const data: StockItem[] = await res.json();
      dispatch({ type: GET_DECLINED_STOCKS, payload: data });
    } catch (error) {
      console.error(error);
    }
  };

  const reportStock = async (id: string) => {
    try {
      await fetch(API("report"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      dispatch({ type: "REPORT_STOCKS", payload: id });
    } catch (error) {
      console.error(error);
    }
  };

  const processStockRequests = async ({
    stockId,
    process,
  }: {
    stockId: string;
    process: "start" | "ready" | "complete";
  }) => {
    try {
      await fetch(API("process"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stockId, process }),
      });
      dispatch({
        type: "PROCESS_STOCK_REQUESTS",
        payload: { stockId, process },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <StockContext.Provider
      value={{
        state,
        getStocks,
        moveStock,
        requestStock,
        approveStock,
        deleteStock,
        rejectStock,
        addStock,
        updateStock,
        getPendingStocks,
        getApprovedStocks,
        getDeclinedStocks,
        reportStock,
        processStockRequests,
      }}
    >
      {children}
    </StockContext.Provider>
  );
};
