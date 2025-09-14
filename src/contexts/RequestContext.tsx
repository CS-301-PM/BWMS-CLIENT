import { createContext, useReducer, ReactNode } from "react";
import {
  requestReducer,
  initialState,
  Request,
  RequestState,
} from "../reducers/RequestsReducer";

// ----------------------
// Context Type
// ----------------------
export type RequestManagementContextType = {
  state: RequestState;
  makeRequest: (req: Request) => void;
  listAllRequests: (reqs: Request[]) => void;
  approveRequest: (id: string) => void;
  rejectRequest: (id: string) => void;
  viewSentRequests: (reqs: Request[]) => void;
};

// ----------------------
// Context
// ----------------------
export const RequestManagementContext = createContext<
  RequestManagementContextType | undefined
>(undefined);

// ----------------------
// Provider
// ----------------------
export const RequestManagementProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [state, dispatch] = useReducer(requestReducer, initialState);

  const makeRequest = (req: Request) =>
    dispatch({ type: "MAKE_REQUEST", payload: req });

  const listAllRequests = (reqs: Request[]) =>
    dispatch({ type: "LIST_ALL_REQUESTS", payload: reqs });

  const approveRequest = (id: string) =>
    dispatch({ type: "APPROVE_A_REQUEST", payload: id });

  const rejectRequest = (id: string) =>
    dispatch({ type: "REJECT_A_REQUEST", payload: id });

  const viewSentRequests = (reqs: Request[]) =>
    dispatch({ type: "VIEW_SENT_REQUESTS", payload: reqs });

  return (
    <RequestManagementContext.Provider
      value={{
        state,
        makeRequest,
        listAllRequests,
        approveRequest,
        rejectRequest,
        viewSentRequests,
      }}
    >
      {children}
    </RequestManagementContext.Provider>
  );
};
