import { User } from "@/types/User";
import { DataStatus } from "../data/DataStatus";
import { ApiError } from "@/types/Api";

export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    loading: DataStatus;
    error: ApiError | null;
  }
