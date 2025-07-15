"use client";
import ValidatingError from "@/components/common/ValidatingError";
import { IDynamicMultiTextInputProps } from "@/interfaces/IDynamicInputField";
import { customSelectStyles } from "@/theme/SelectInputTheme";
import { useFormikContext } from "formik";
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
  onChange = () => {},
  onBlur,
  validateItem,
  spaceAllowed = true,
}: IDynamicMultiTextInputProps) {
  const { setFieldError, setFieldTouched, setFieldValue } = useFormikContext();
  const [inputValue, setInputValue] = useState("");
  const [localError, setLocalError] = useState(() => {
    return { fieldName: "", error: "" };
  });
  const createOption = (label: string) => ({
    label,
    value: label,
  });

  interface Option {
    value: string;
  }
  const selectedValues = value.map((option) => createOption(option));

  const handleChange: (newValue: MultiValue<unknown>) => void = (newValue) => {
    const values = newValue.map((v) => (v as Option).value);
    onChange(values);
    setFieldValue(name, values);
  };

  const handleBlur = () => {
    onBlur();
    setFieldTouched(id, true);
  };
  const handleKeyDown: KeyboardEventHandler = async (event) => {
    if (!inputValue) return;
    if (!spaceAllowed) setInputValue(inputValue.replaceAll(/\s/g, ""));
    switch (event.key) {
      case "Enter":
      case "Tab":
        setFieldError(name, undefined);
        setLocalError({ fieldName: name, error: "" });
        event.preventDefault();
        setFieldTouched(name, true);
        if (value.includes(inputValue)) {
          setFieldError(id, "این مقدار قبلا وارد شده است");
          setLocalError({
            fieldName: name,
            error: "این مقدار قبلا وارد شده است",
          });

          return;
        }
        if (validateItem) {
          const error = await validateItem(inputValue);
          if (error) {
            setFieldError(id, error);
            return;
          }
        }
        const newValues = [...value, inputValue];
        setFieldValue(name, newValues);
        setInputValue("");
        setFieldError(name, undefined);
        setLocalError({ fieldName: name, error: "" });

        break;
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
        onChange={handleChange}
        onInputChange={(newValue) => {
          setInputValue(newValue);
          setFieldError(id, undefined);
        }}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        placeholder={placeholder}
        loadingMessage={() => "در حال بارگذاری..."}
        styles={customSelectStyles}
        isLoading={loading}
        value={selectedValues}
        isDisabled={disabled}
        className={className}
      />
      {localError.error && <ValidatingError error={localError.error} />}
    </>
  );
}
