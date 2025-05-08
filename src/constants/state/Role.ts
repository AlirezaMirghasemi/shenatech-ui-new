import { Role } from "@/types/Role";
import { DataStatus } from "../data/DataStatus";
import { ApiError } from "@/types/Api";

export interface RoleState {
    data: Role[] | [];
    loading: DataStatus;
    error: ApiError | null;
  }
