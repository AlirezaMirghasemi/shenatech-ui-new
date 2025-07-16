import { PaginatedResponse } from "@/types/Api";
import { Pagination } from "flowbite-react";

export default function DynamicTablePagination<T extends object>({dynamicTablePagination, setPage}: {
    dynamicTablePagination:PaginatedResponse<T>;
    setPage: (page: string) => void;
}) {
  return (
    <>
      <div className="flex overflow-x-auto sm:justify-center" dir="ltr">
        <Pagination
          currentPage={
            dynamicTablePagination.current_page as unknown as number
          }
          totalPages={dynamicTablePagination.last_page}
          onPageChange={(page) => {
            setPage(
              dynamicTablePagination?.links.filter(
                (link) => link.label == page.toString()
              )[0].label as string
            );
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
