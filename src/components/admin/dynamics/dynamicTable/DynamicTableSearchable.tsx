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
    </>
  );
}
