"use client";
import { InputType } from "@/constants/data/InputType";
import { ISearchableTable } from "@/interfaces/IDynamicTable";
import {
  ChangeEventHandler,
  KeyboardEvent,
  KeyboardEventHandler,
  useEffect,
  useState,
} from "react";
import DynamicTextInput from "../dynamicFormInputs/DynamicTextInput";
import { HiSearch } from "react-icons/hi";


export default function DynamicTableSearchable({
  dynamicTableSearchable,
}: {
  dynamicTableSearchable: ISearchableTable;
}) {
  const [interimSearchValue, setInterimSearchValue] = useState("");

  const handleSearch = (e: KeyboardEvent<HTMLInputElement>) => {
    setInterimSearchValue(e.currentTarget.value);
    if (e.key === "Enter") {
      dynamicTableSearchable.setSearchValue(e.currentTarget.value);
    }
  };
  useEffect(() => {
    setInterimSearchValue(dynamicTableSearchable.searchValue);
  }, [dynamicTableSearchable.searchValue]);
  return (
    <>
      <div className=" p-5">
        <div className="relative max-w-md">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <HiSearch className="w-5 h-5 text-text-muted" />
          </div>
          <DynamicTextInput
            id="table-search"
            name="table-search"
            type={InputType.TEXT}
            placeholder="جست و جو..."
            label="جست و جو..."
            ref={dynamicTableSearchable.searchRef}
            onChange={
              handleSearch as unknown as ChangeEventHandler<HTMLInputElement>
            }
            onKeyDown={
              handleSearch as unknown as KeyboardEventHandler<HTMLInputElement>
            }
            value={interimSearchValue}
          />
        </div>
      </div>
    </>
  );
}
