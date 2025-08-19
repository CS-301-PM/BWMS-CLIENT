// Action Types
export const RECORD_LOGS = "RECORD_LOGS";
export const GET_LOGS = "GET_LOGS";

// Log structure
export interface BlockchainLog {
  serial: string;
  itemName: string;
  timeApplied: string;
  hash: string;
  action: string;
  user: string;
  status: string;
  actions?: string; // optional if needed
}

// State type
interface BlockchainState {
  logs: BlockchainLog[];
}

// Initial state
const initialState: BlockchainState = {
  logs: [],
};

// Action types
type BlockchainActionTypes =
  | { type: typeof RECORD_LOGS; payload: BlockchainLog }
  | { type: typeof GET_LOGS; payload: BlockchainLog[] };

// Reducer
export const blockchainReducer = (
  state: BlockchainState = initialState,
  action: BlockchainActionTypes
): BlockchainState => {
  switch (action.type) {
    case RECORD_LOGS:
      return {
        ...state,
        logs: [...state.logs, action.payload],
      };

    case GET_LOGS:
      return {
        ...state,
        logs: action.payload,
      };

    default:
      return state;
  }
};
