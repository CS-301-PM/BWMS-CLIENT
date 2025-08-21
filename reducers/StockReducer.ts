export const GET_STOCKS = "GET_STOCKS";
export const MOVE_STOCK = "MOVE_STOCK";
export const REQUEST_STOCK = "REQUEST_STOCK";
export const DELETE_STOCK = "DELETE_STOCK";
export const REJECT_STOCK = "REJECT_STOCK";
export const ADD_STOCK = "ADD_STOCK";
export const UPDATE_STOCK = "UPDATE_STOCK";
export const GET_PENDING_STOCKS = "GET_PENDING_STOCKS";
export const GET_APPROVED_STOCKS = "GET_APPROVED_STOCKS";
export const GET_DECLINED_STOCKS = "GET_DECLINED_STOCKS";
export const APPROVE_STOCK = "APPROVE_STOCK";
export const REPORT_STOCKS = "REPORT_STOCKS";
export const PROCESS_STOCK_REQUESTS = "PROCESS_STOCK_REQUESTS";

export interface StockItem {
  id: string;
  serialNumber: string;
  itemName: string;
  category: string;
  quantity: number;
  unit?: string;
  unitValue?: number;
  totalValue?: number;
  location: string;
  supplier: string;
  lastUpdated: Date;
  level?: "in-stock" | "low-stock" | "out-of-stock" | "damaged";
  status?: "pending" | "approved" | "declined";
  reorderLevel: number;
  maxLevel: number;
}

export interface Stock {
  id?: string;
  name: string;
  quantity: number;
  status: "pending" | "approved" | "declined";
  location?: string;
}

export interface StockState {
  stocks: StockItem[];
  pending: StockItem[];
  approved: StockItem[];
  declined: StockItem[];
  error?: string | null;
  loading?: boolean;
}

type StockAction =
  | { type: typeof GET_STOCKS; payload: StockItem[] }
  | { type: typeof MOVE_STOCK; payload: StockItem[] }
  | { type: typeof REQUEST_STOCK }
  | { type: typeof DELETE_STOCK; payload: string }
  | { type: typeof REJECT_STOCK; payload: string }
  | { type: typeof ADD_STOCK; payload: StockItem }
  | { type: typeof UPDATE_STOCK; payload: StockItem }
  | { type: typeof GET_PENDING_STOCKS; payload: StockItem[] }
  | { type: typeof GET_APPROVED_STOCKS; payload: StockItem[] }
  | { type: typeof GET_DECLINED_STOCKS; payload: StockItem[] }
  | { type: typeof APPROVE_STOCK; payload: string }
  | { type: typeof REPORT_STOCKS; payload: string }
  | {
      type: typeof PROCESS_STOCK_REQUESTS;
      payload: { stockId: string; process: "start" | "ready" | "complete" };
    };

export const stockReducer = (
  state: StockState,
  action: StockAction
): StockState => {
  switch (action.type) {
    case GET_STOCKS:
      return { ...state, stocks: action.payload };

    case MOVE_STOCK:
      return { ...state, stocks: action.payload };

    case REQUEST_STOCK:
      return { ...state };

    case DELETE_STOCK:
      return {
        ...state,
        stocks: state.stocks.filter((stock) => stock.id !== action.payload),
        pending: state.pending.filter((stock) => stock.id !== action.payload),
        approved: state.approved.filter((stock) => stock.id !== action.payload),
        declined: state.declined.filter((stock) => stock.id !== action.payload),
      };

    case REJECT_STOCK:
      return { ...state };

    case APPROVE_STOCK:
      return { ...state };

    case ADD_STOCK:
      return {
        ...state,
        stocks: [...state.stocks, action.payload],
        pending:
          action.payload.status === "pending"
            ? [...state.pending, action.payload]
            : state.pending,
        approved:
          action.payload.status === "approved"
            ? [...state.approved, action.payload]
            : state.approved,
        declined:
          action.payload.status === "declined"
            ? [...state.declined, action.payload]
            : state.declined,
      };

    case UPDATE_STOCK:
      return {
        ...state,
        stocks: state.stocks.map((stock) =>
          stock.id === action.payload.id ? action.payload : stock
        ),
        pending: state.pending.filter((s) => s.id !== action.payload.id),
        approved: state.approved.filter((s) => s.id !== action.payload.id),
        declined: state.declined.filter((s) => s.id !== action.payload.id),
        // reinsert into the correct array
        ...(action.payload.status === "pending" && {
          pending: [...state.pending, action.payload],
        }),
        ...(action.payload.status === "approved" && {
          approved: [...state.approved, action.payload],
        }),
        ...(action.payload.status === "declined" && {
          declined: [...state.declined, action.payload],
        }),
      };

    case GET_PENDING_STOCKS:
      return { ...state, pending: action.payload };

    case GET_APPROVED_STOCKS:
      return { ...state, approved: action.payload };

    case GET_DECLINED_STOCKS:
      return { ...state, declined: action.payload };

    case REPORT_STOCKS:
      return { ...state };

    case PROCESS_STOCK_REQUESTS:
      return { ...state };

    default:
      return state;
  }
};
