export interface IDynamicPagination {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void; // هندلر تغییر صفحه
    onPageSizeChange?: (size: number) => void; // هندلر تغییر سایز صفحه (اختیاری)
  }
