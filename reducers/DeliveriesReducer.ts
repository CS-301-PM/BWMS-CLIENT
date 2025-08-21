export const ADD_DELIVERIES = "ADD_DELIVERIES";
export const REMOVE_DELIVERIES = "REMOVE_DELIVERIES";
export const UPDATE_DELIVERIES = "UPDATE_DELIVERIES";
export const CONFIRM_DELIVERIES = "CONFIRM_DELIVERIES";
export const SHIP_DELIVERIES = "SHIP_DELIVERIES";
export const GET_DELIVERIES = "GET_DELIVERIES";
export const GET_DELIVERED = "GET_DELIVERED";
export const GET_DELAYED = "GET_DELAYED";
export const GET_IN_TRANSIT = "GET_IN_TRANSIT";
export const GET_TOTAL_VALUES = "GET_TOTAL_VALUES";

export interface DeliveriesState {
  deliveries: any[];
  delivered: any[];
  delayed: any[];
  inTransit: any[];
  totalValues: number;
  error?: string | null;
  loading?: boolean;
}

type DeliveriesAction =
  | { type: typeof ADD_DELIVERIES; payload: any }
  | { type: typeof REMOVE_DELIVERIES; payload: string }
  | { type: typeof UPDATE_DELIVERIES; payload: any }
  | { type: typeof CONFIRM_DELIVERIES; payload: string }
  | { type: typeof SHIP_DELIVERIES; payload: string }
  | { type: typeof GET_DELIVERIES; payload: any[] }
  | { type: typeof GET_DELIVERED; payload: any[] }
  | { type: typeof GET_DELAYED; payload: any[] }
  | { type: typeof GET_IN_TRANSIT; payload: any[] }
  | { type: typeof GET_TOTAL_VALUES; payload: number };

export const deliveriesReducer = (
  state: DeliveriesState,
  action: DeliveriesAction
): DeliveriesState => {
  switch (action.type) {
    case GET_DELIVERIES:
      return { ...state, deliveries: action.payload };

    case GET_DELIVERED:
      return { ...state, delivered: action.payload };

    case GET_DELAYED:
      return { ...state, delayed: action.payload };

    case GET_IN_TRANSIT:
      return { ...state, inTransit: action.payload };

    case GET_TOTAL_VALUES:
      return { ...state, totalValues: action.payload };

    case ADD_DELIVERIES:
      return { ...state, deliveries: [...state.deliveries, action.payload] };

    case REMOVE_DELIVERIES:
      return {
        ...state,
        deliveries: state.deliveries.filter(
          (item) => item.id !== action.payload
        ),
      };

    case UPDATE_DELIVERIES:
      return {
        ...state,
        deliveries: state.deliveries.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
      };

    case CONFIRM_DELIVERIES:
      return {
        ...state,
        deliveries: state.deliveries.map((item) =>
          item.id === action.payload ? { ...item, status: "confirmed" } : item
        ),
      };

    case SHIP_DELIVERIES:
      return {
        ...state,
        deliveries: state.deliveries.map((item) =>
          item.id === action.payload ? { ...item, status: "shipped" } : item
        ),
      };

    default:
      return state;
  }
};
