import EmptyState from "@/components/common/EmptyState";
import LoadingSkeleton from "@/components/common/LoadingSkeleton";
import ValidatingError from "@/components/common/ValidatingError";
import { IDynamicTable } from "@/interfaces/IDynamicTable";
import {
  Button,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";

export default function DynamicTable<T extends object>({
  dynamicTable,
}: {
  dynamicTable: IDynamicTable<T>;
}) {
  if (dynamicTable.loading) return <LoadingSkeleton />;
  if (dynamicTable.error) return <ValidatingError error={dynamicTable.error} />;

  return (
    <>
      <div className=" max-w-[85rem] py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full inline-block align-middle">
              <div className=" border  rounded-xl shadow-2xs overflow-hidden ">
                {dynamicTable.header && (
                  <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b ">
                    <div>
                      <h2 className="text-xl font-semibold ">
                        {dynamicTable.header.title}
                      </h2>
                      {dynamicTable.header.description && (
                        <p>{dynamicTable.header.description}</p>
                      )}
                    </div>
                    {dynamicTable.header.actions && (
                      <div>
                        <div className="inline-flex gap-x-2">
                          {dynamicTable.header.actions.map((action) => (
                            <Button
                              className={
                                action.className ? action.className : ""
                              }
                              key={action.name}
                              onClick={action.handler}
                            >
                              {action.icon ? action.icon : null}
                              {action.caption}
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
                {(dynamicTable.data.length < 1) && (
                  <>
                    {console.log(dynamicTable.data.length)}
                    <EmptyState />
                  </>
                )}
                {dynamicTable.data.length > 0 && (
                  <Table hoverable>
                    <TableHead>
                      <TableRow>
                        {dynamicTable.columns.map((column) => (
                          <TableHeadCell
                            key={column.accessor.toString()}
                            className={column.className ? column.className : ""}
                            aria-label={
                              column.ariaLabel || column.header.toString()
                            }
                          >
                            {column.header}
                          </TableHeadCell>
                        ))}
                        {dynamicTable.actions && (
                          <TableHeadCell>عملیات</TableHeadCell>
                        )}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {dynamicTable.data.map((row) => (
                        <TableRow key={String(row[dynamicTable.rowKey])}>
                          {dynamicTable.columns.map((column) => (
                            <TableCell key={column.accessor.toString()}>
                              {column.cellRenderer
                                ? column.cellRenderer(row)
                                : String(row[column.accessor])}
                            </TableCell>
                          ))}
                          {dynamicTable.actions && (
                            <TableCell>
                              {dynamicTable.actions.map((action) => (
                                <Button
                                  key={action.name}
                                  onClick={() => action.handler?.(row)}
                                >
                                  {action.icon}
                                </Button>
                              ))}
                            </TableCell>
                          )}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
                {dynamicTable.pagination &&
                  dynamicTable.data.length > 0 &&
                  dynamicTable.pagination.totalPages > 1 && (
                    <div className="flex overflow-x-auto sm:justify-center">
                      <Pagination
                        currentPage={dynamicTable.pagination.currentPage}
                        totalPages={dynamicTable.pagination.totalPages}
                        onPageChange={dynamicTable.pagination.onPageChange}
                        showIcons
                        previousLabel="قبلی"
                        nextLabel="بعدی"
                      />
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
