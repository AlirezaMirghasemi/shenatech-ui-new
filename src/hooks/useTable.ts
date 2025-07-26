import { CommonStatus } from "@/constants/data/CommonStatus";
import { SortDirection } from "@/constants/data/SortDirection";
import { useCallback, useState } from "react";

export default function useTable<
  T extends { id: number; status: string | CommonStatus },
>() {
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [selectedRows, setSelectedRows] = useState<T[]>([]);
  const [data, setData] = useState<T>({} as T);
  const [sortColumn, setSortColumn] = useState<keyof T | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(
    SortDirection.ASC
  );

  const toggleRow = useCallback((id: number, row: T) => {
    setData({} as T);
    setSelectedIds((prev) => {
      const next = new Set(prev);
      const result = next.has(id) ? next.delete(id) : next.add(id);
      return result ? next : prev;
    });
    setSelectedRows((prev) => {
      const exists = prev.some((r) => r.id === id);
      return exists ? prev.filter((r) => r.id !== id) : [...prev, row];
    });
  }, []);

  const toggleAll = useCallback((rows: T[], checked: boolean) => {
    clearRowData();
    if (checked) {
      setSelectedIds(new Set(rows.map((row) => row.id)));
      setSelectedRows([...rows]);
    } else {
      setSelectedIds(new Set());
      setSelectedRows([]);
    }
    setData({} as T);
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedIds(new Set());
    setSelectedRows([]);
    setData({} as T);
  }, []);
//   const setRowData = useCallback((data: T) => {
//     console.log(selectedIds.size)
//     setData(data ?? ({} as T));
//     setSelectedIds(data ? new Set([data.id]) : new Set());
//     setSelectedRows(data ? [data] : []);
//   }, []);
  const clearRowData = useCallback(() => {
    setData({} as T);
    setSelectedIds(new Set());
    setSelectedRows([]);
  }, []);
  const handleSort = useCallback(
    (column: keyof T) => {
      const newDirection =
        sortColumn === column && sortDirection === SortDirection.ASC
          ? SortDirection.DESC
          : SortDirection.ASC;

      setSortColumn(column);
      setSortDirection(newDirection);
    },
    [sortColumn, sortDirection]
  );

  const isRowDeleted = useCallback((status: CommonStatus | string) => {
    return status === CommonStatus.DELETED;
  }, []);

  const dataHasDeleted = useCallback(
    (data: T[]) => data.some((row) => isRowDeleted(row.status)),
    [isRowDeleted]
  );

  return {
    handleSort: {
      sortColumn,
      sortDirection,
      handleSort,
    },
    handleSelect: {
      toggleRow,
      toggleAll,
      clearSelection,
      setSelectedIds,
      selectedIds,
      selectedRows,
      setSelectedRows,
      data,
      setData,
      clearRowData,
    },
    handleDeletedStatus: {
      isRowDeleted,
      dataHasDeleted,
    },
  };
}
