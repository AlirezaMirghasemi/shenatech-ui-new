import { PaginatedResponse } from "@/types/Api";
import { Pagination } from "flowbite-react";

export default function DynamicTablePagination<T extends object>({
  dynamicTablePagination,
  setPage,
}: {
  dynamicTablePagination: PaginatedResponse<T>;
  setPage: (page: string) => void;
}) {

  return (
    <>
      <div className="flex overflow-x-auto sm:justify-center" dir="ltr">
        <Pagination
          currentPage={Number(dynamicTablePagination.meta.current_page) || 1}
          totalPages={dynamicTablePagination.meta.last_page}
          onPageChange={(page) => {
            setPage(page.toString());
          }}
          showIcons
          nextLabel="بعدی"
          previousLabel="قبلی"
          layout="pagination"
        />
      </div>
    </>
  );
}
