// بهبود توابع با استفاده از TypeScript و مدیریت بهتر state
export function toggleRow<T extends { id: number }>({
  id,
  row,
  setSelectedIds,
  setSelectedRows,
}: {
  id: number;
  row: T;
  setSelectedIds: React.Dispatch<React.SetStateAction<Set<number>>>;
  setSelectedRows: React.Dispatch<React.SetStateAction<T[]>>;
}) {
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
}

export function toggleAll<T extends { id: number }>({
  checked,
  setSelectedIds,
  rows,
  setSelectedRows,
}: {
  checked: boolean;
  setSelectedIds: React.Dispatch<React.SetStateAction<Set<number>>>;
  rows: T[];
  setSelectedRows: React.Dispatch<React.SetStateAction<T[]>>;
}) {
  setSelectedIds((prev) => {
    const newSet: Set<number> = checked
      ? new Set(rows.map((row) => row.id))
      : new Set<number>();
    return newSet.size === prev.size && checked ? prev : newSet;
  });
  setSelectedRows((prev) => {
    const NewSelectedRows = checked ? rows : [];
    return NewSelectedRows.length === prev.length && checked
      ? prev
      : NewSelectedRows;
  });
}
