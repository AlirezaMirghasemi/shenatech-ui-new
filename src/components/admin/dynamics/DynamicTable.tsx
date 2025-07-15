"use client";
import EmptyState from "@/components/common/EmptyState";
import LoadingSkeleton from "@/components/common/LoadingSkeleton";
import ValidatingError from "@/components/common/ValidatingError";
import { toggleAll, toggleRow } from "@/helpers/TableWithCheckBox";
import { IDynamicTable } from "@/interfaces/IDynamicTable";
import {
  Button,
  ButtonGroup,
  Checkbox,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  Tooltip,
} from "flowbite-react";
import { InputType } from "@/constants/data/InputType";
import DynamicTextInput from "./DynamicFormInputs/DynamicTextInput";
import {
  ChangeEventHandler,
  KeyboardEvent,
  KeyboardEventHandler,
  useEffect,
  useState,
} from "react";

export default function DynamicTable<T extends object>({
  dynamicTable,
  setPage,
}: {
  dynamicTable: IDynamicTable<T>;
  setPage?: (page: string) => void;
}) {
  const [interimSearchValue, setInterimSearchValue] = useState("");

  const handleSearch = (e: KeyboardEvent<HTMLInputElement>) => {
    if (dynamicTable.searchableTable) {
      setInterimSearchValue(e.currentTarget.value);
      if (e.key === "Enter") {
        dynamicTable.searchableTable.setSearchValue(e.currentTarget.value);
      }
    }
  };
  useEffect(() => {
    if (dynamicTable.searchableTable) {
      setInterimSearchValue(dynamicTable.searchableTable.searchValue);
    }
  }, [dynamicTable.searchableTable?.searchValue]);

  if (dynamicTable.loading) return <LoadingSkeleton />;
  if (dynamicTable.error) return <ValidatingError error={dynamicTable.error} />;
  return (
    <>
      <div className="flex flex-col px-5">
        <div className="-m-1.5 overflow-x-auto">
          <div className=" min-w-full inline-block align-middle">
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
                            className={action.className ? action.className : ""}
                            key={action.name}
                            onClick={action.handler}
                            disabled={action.disabled}
                            color={action.color ? action.color : "default"}
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
              {dynamicTable?.data.length < 1 &&
                !dynamicTable.searchableTable && (
                  <>
                    <EmptyState />
                  </>
                )}
              {dynamicTable.searchableTable && (
                <div className=" p-5">
                  <DynamicTextInput
                    id="table-search"
                    name="table-search"
                    type={InputType.TEXT}
                    placeholder="جست و جو..."
                    label="جست و جو..."
                    ref={dynamicTable.searchableTable.searchRef}
                    onChange={
                      handleSearch as unknown as ChangeEventHandler<HTMLInputElement>
                    }
                    onKeyDown={
                      handleSearch as unknown as KeyboardEventHandler<HTMLInputElement>
                    }
                    value={interimSearchValue}
                  />
                </div>
              )}
              {dynamicTable?.data.length < 1 &&
                dynamicTable.searchableTable && (
                  <>
                    <EmptyState />
                  </>
                )}
              {dynamicTable?.data.length > 0 && (
                <Table hoverable>
                  <TableHead>
                    <TableRow>
                      {dynamicTable.columns.map((column) => (
                        <TableHeadCell
                          key={column.accessor.toString()}
                          className={
                            column.HeadCellClassName
                              ? column.HeadCellClassName
                              : ""
                          }
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
                      {dynamicTable.checkboxTable && (
                        <TableHeadCell
                          className={dynamicTable.columns[0].className ?? ""}
                        >
                          <Checkbox
                            checked={
                              dynamicTable.checkboxTable.selectedIds.size > 0 &&
                              dynamicTable.checkboxTable.selectedIds.size ===
                                dynamicTable.data.length
                            }
                            indeterminate={
                              dynamicTable.checkboxTable.selectedIds.size > 0 &&
                              dynamicTable.checkboxTable.selectedIds.size <
                                dynamicTable.data.length
                            }
                            onChange={(e) => {
                              if (dynamicTable.data.length === 0) return;
                              if (
                                dynamicTable.checkboxTable &&
                                dynamicTable.checkboxTable?.setSelectedIds
                              ) {
                                toggleAll(
                                  e.target.checked,
                                  dynamicTable.checkboxTable.setSelectedIds,
                                  dynamicTable.data.map((row) => ({
                                    id: row[dynamicTable.rowKey] as number,
                                  }))
                                );
                              }
                            }}
                            aria-label="Select all"
                            className="mx-auto"
                          />
                        </TableHeadCell>
                      )}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dynamicTable.data.map((row) => (
                      <TableRow
                        key={String(row[dynamicTable.rowKey])}
                        className={`
    ${dynamicTable.className?.(row) ?? ""}
    ${
      dynamicTable.checkboxTable
        ? dynamicTable.checkboxTable.selectedIds?.has(
            row[dynamicTable.rowKey] as number
          )
          ? "!bg-accent/25"
          : ""
        : ""
    }
  `}
                      >
                        {dynamicTable.columns.map((column) => (
                          <TableCell
                            key={column.accessor.toString()}
                            className={column.className ? column.className : ""}
                          >
                            {column.cellRenderer
                              ? column.cellRenderer(row)
                              : String(row[column.accessor])}
                          </TableCell>
                        ))}
                        {dynamicTable.actions && (
                          <TableCell
                            className={dynamicTable.actionCellClassName ?? ""}
                          >
                            <ButtonGroup>
                              {dynamicTable.actions.map((action) =>
                                action.actionRenderer ? (
                                  <Tooltip
                                    content={action.caption}
                                    animation="duration-500"
                                    key={action.name}
                                  >
                                    {action.actionRenderer(row)}
                                  </Tooltip>
                                ) : (
                                  <Tooltip
                                    content={action.caption}
                                    animation="duration-500"
                                    key={action.name}
                                  >
                                    <Button
                                      key={action.name}
                                      onClick={() => action.handler?.(row)}
                                      color={
                                        action.color ? action.color : "default"
                                      }
                                      className={
                                        action.className
                                          ? action.className
                                          : "mx-1"
                                      }
                                      disabled={
                                        typeof action.disabled === "function"
                                          ? action.disabled(row)
                                          : action.disabled
                                      }
                                      hidden={
                                        typeof action.hidden === "function"
                                          ? action.hidden(row)
                                          : action.hidden
                                      }
                                    >
                                      {action.icon}
                                    </Button>
                                  </Tooltip>
                                )
                              )}
                            </ButtonGroup>
                          </TableCell>
                        )}
                        {dynamicTable.checkboxTable && (
                          <TableCell className="w-4 text-center">
                            <Checkbox
                              checked={dynamicTable.checkboxTable.selectedIds.has(
                                row[dynamicTable.rowKey] as number
                              )}
                              onChange={() => {
                                if (
                                  dynamicTable.checkboxTable &&
                                  dynamicTable.checkboxTable.setSelectedIds
                                ) {
                                  toggleRow(
                                    row[dynamicTable.rowKey] as number,
                                    dynamicTable.checkboxTable.setSelectedIds
                                  );
                                }
                              }}
                              aria-label={`Select row ${
                                row[dynamicTable.rowKey]
                              }`}
                              className="mx-auto"
                            />
                          </TableCell>
                        )}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
              {dynamicTable.pagination &&
                setPage &&
                dynamicTable.data.length > 0 &&
                dynamicTable.pagination.last_page > 1 && (
                  <div
                    className="flex overflow-x-auto sm:justify-center"
                    dir="ltr"
                  >
                    <Pagination
                      currentPage={
                        dynamicTable.pagination
                          .current_page as unknown as number
                      }
                      totalPages={dynamicTable.pagination.last_page}
                      onPageChange={(page) => {
                        setPage(
                          dynamicTable.pagination?.links.filter(
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
                )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
