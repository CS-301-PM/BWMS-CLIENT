// ----------------------
// Action constants
// ----------------------
export const MAKE_REQUEST = "MAKE_REQUEST";
export const LIST_ALL_REQUESTS = "LIST_ALL_REQUESTS";
export const APPROVE_A_REQUEST = "APPROVE_A_REQUEST";
export const REJECT_A_REQUEST = "REJECT_A_REQUEST";
export const VIEW_SENT_REQUESTS = "VIEW_SENT_REQUESTS";

// ----------------------
// Types
// ----------------------
export interface Request {
  id: string;
  stockId: string;
  requesterId: string;
  quantity: number;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
  updatedAt?: string;
}

export interface RequestState {
  requests: Request[];
  sentRequests: Request[];
  loading: boolean;
  error?: string | null;
  selectedRequest?: Request | null;
}

export type RequestActionTypes =
  | { type: typeof MAKE_REQUEST; payload: Request }
  | { type: typeof LIST_ALL_REQUESTS; payload: Request[] }
  | { type: typeof APPROVE_A_REQUEST; payload: string } // requestId
  | { type: typeof REJECT_A_REQUEST; payload: string } // requestId
  | { type: typeof VIEW_SENT_REQUESTS; payload: Request[] };

// ----------------------
// Initial state
// ----------------------
export const initialState: RequestState = {
  requests: [],
  sentRequests: [],
  loading: false,
  error: null,
  selectedRequest: null,
};

// ----------------------
// Reducer
// ----------------------
export const requestReducer = (
  state: RequestState = initialState,
  action: RequestActionTypes
): RequestState => {
  switch (action.type) {
    case MAKE_REQUEST:
      return {
        ...state,
        requests: [...state.requests, action.payload],
        sentRequests: [...state.sentRequests, action.payload],
      };

    case LIST_ALL_REQUESTS:
      return { ...state, requests: action.payload };

    case APPROVE_A_REQUEST:
      return {
        ...state,
        requests: state.requests.map((req) =>
          req.id === action.payload ? { ...req, status: "approved" } : req
        ),
      };

    case REJECT_A_REQUEST:
      return {
        ...state,
        requests: state.requests.map((req) =>
          req.id === action.payload ? { ...req, status: "rejected" } : req
        ),
      };

    case VIEW_SENT_REQUESTS:
      return { ...state, sentRequests: action.payload };

    default:
      return state;
  }
};
