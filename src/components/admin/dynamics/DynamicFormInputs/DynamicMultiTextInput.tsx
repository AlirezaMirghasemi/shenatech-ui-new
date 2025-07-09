"use client";
import { IDynamicMultiTextInputProps } from "@/interfaces/IDynamicInputField";
import { customSelectStyles } from "@/theme/SelectInputTheme";
import { KeyboardEventHandler, useState } from "react";
import { MultiValue } from "react-select";
import CreatableSelect from "react-select/creatable";

export default function DynamicMultiTextInput({
  id,
  name,
  placeholder,
  disabled,
  className,
  value = [],
  loading,
  onChange,
  onBlur,
}: IDynamicMultiTextInputProps) {
  const createOption = (label: string) => ({
    label,
    value: label,
  });
  interface option {
    value: string;
  }
  const [inputValue, setInputValue] = useState("");
  const selectedValues = value.map((option) => createOption(option));

  const handleKeyDown: KeyboardEventHandler = (event) => {
    if (!inputValue) return;
    switch (event.key) {
      case "Enter":
      case "Tab":
        console.log("inputValue", value);
        onChange([...value, inputValue]);
        setInputValue("");
        event.preventDefault();
    }
  };
  return (
    <>
      <CreatableSelect
        components={{ DropdownIndicator: null }}
        inputId={id}
        instanceId={id}
        name={name}
        inputValue={inputValue}
        isClearable
        isMulti
        menuIsOpen={false}
        onChange={(newValue: MultiValue<unknown>) =>
          onChange(newValue.map((value) => (value as option).value))
        }
        onInputChange={(newValue) => setInputValue(newValue)}
        onKeyDown={handleKeyDown}
        onBlur={onBlur}
        placeholder={placeholder}
        loadingMessage={() => "در حال بارگذاری..."}
        styles={customSelectStyles}
        isLoading={loading}
        value={selectedValues}
        isDisabled={disabled}
        className={className}
      />
    </>
  );
}
