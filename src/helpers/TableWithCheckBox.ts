// بهبود توابع با استفاده از TypeScript و مدیریت بهتر state
export function toggleRow(
  id: number,
  setSelectedIds: React.Dispatch<React.SetStateAction<Set<number>>>
) {
  setSelectedIds(prev => {
    const next = new Set(prev);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    return next;
  });
}

export function toggleAll(
  checked: boolean,
  setSelectedIds: React.Dispatch<React.SetStateAction<Set<number>>>,
  rows: Array<{ id: number }>
) {
  setSelectedIds(prev => {
    const newSet: Set<number> = checked ? new Set(rows.map(row => row.id)) : new Set<number>();
    return newSet.size === prev.size && checked ? prev : newSet;
  });
}
