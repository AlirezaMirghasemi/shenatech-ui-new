import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useCallback } from "react";
import { fetchRolesAsync } from "@/store/thunks/roleThunk";

export const useRole = () => {
  const dispatch = useAppDispatch();
  const {
    data: roles,
    loading,
    error,
  } = useAppSelector((state) => state.roles);
  const fetchRoles = useCallback(
    ()=>{
       dispatch(fetchRolesAsync());
  }, [dispatch]);
  return{
    roles,
    error,
    loading,
    actions:{
        fetchRoles
    }
  }
};
