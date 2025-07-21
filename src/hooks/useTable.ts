// hooks/useTableSelection.ts
import { CommonStatus } from "@/constants/data/CommonStatus";
import { SortDirection } from "@/constants/data/SortDirection";
import { useCallback, useState } from "react";

export default function useTable<
  T extends { id: number; status: string | CommonStatus },
>() {
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [selectedRows, setSelectedRows] = useState<T[]>([]);
  const [sortColumn, setSortColumn] = useState<keyof T | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(
    SortDirection.ASC
  );
  const toggleRow = (id: number, row: T) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      console.log(next);
      return next;
    });
    setSelectedRows((prev) => {
      let next = [...prev];
      if (next.includes(row)) {
        next = next.filter((r) => r.id !== row.id);
      } else {
        next.push(row);
      }
      return next;
    });
  };

  const toggleAll = (rows: T[], checked: boolean) => {
  if (checked) {
    // انتخاب همه
    const newIds = new Set(rows.map(row => row.id));
    setSelectedIds(newIds);
    setSelectedRows([...rows]);
  } else {
    // لغو انتخاب همه
    setSelectedIds(new Set());
    setSelectedRows([]);
  }
};

  const clearSelection = () => {
    setSelectedIds(new Set());
    setSelectedRows([]);
  };
  const handleSort = useCallback(
    (column: keyof T) => {
      setSortColumn(column);
      setSortDirection((prev) =>
        prev === SortDirection.ASC && sortColumn === column
          ? SortDirection.DESC
          : SortDirection.ASC
      );
    },
    [sortColumn]
  );
  const isRowDeleted = useCallback((status: CommonStatus | string) => {
    return status === (CommonStatus.DELETED as string);
  }, []);

  const dataHasDeleted = useCallback(
    (status: CommonStatus | string, data: T[]) => {
      return data.filter((row) => isRowDeleted(row.status)).length > 0;
    },
    []
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
      selectedIds,
      selectedRows,
      setSelectedIds,
      setSelectedRows,
    },
    handleDeletedStatus: {
      isRowDeleted,
      dataHasDeleted,
    },
  };
}
