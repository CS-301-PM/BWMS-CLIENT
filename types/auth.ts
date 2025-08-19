export type UserRole =
  | "admin"
  | "manager"
  | "staff_central_store"
  | "staff_department"
  | "supplier";

export interface FetchedUser {
  id?: string;
  role: UserRole;
  firstName: string;
  lastName: string;
  email: string;
  employeeId: string;
  department: string;
  blockchainId: string;
  status?: "active" | "inactive";
}

export type AuthUserState = {
  user: FetchedUser | null;
  users: FetchedUser[] | null;
  departments: string[] | null;
  hasAdmin: boolean;
};

export type UserSignIn = {
  employeeId: string;
  email: string;
};

export type UserSignUp = {} & UserSignIn & {
    firstName: string;
    lastName: string;
    role: UserRole;
  };

type ErrorBody = {
  message: string;
  type: string;
  value: string;
};

export type ErrorResponse = {
  errors: {
    [
      key: string | "employeeId" | "firstName" | "lastName" | "email" | "role"
    ]: ErrorBody;
  };
};
