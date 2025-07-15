"use client";
import LoadingField from "@/components/common/LoadingField";
import { IDynamicSelectInputProps } from "@/interfaces/IDynamicInputField";
import { customSelectStyles } from "@/theme/SelectInputTheme";
import { useField, useFormikContext } from "formik";
import { useEffect, useMemo } from "react";
import Select from "react-select";

export default function DynamicSelectInput({
  id,
  name,
  placeholder,
  disabled,
  data,
  className,
  multiple = false,
  defaultValue,
  loading = false,
  isSearchable = false,

}: IDynamicSelectInputProps) {
  const [field] = useField(id);
  type SelectOption = { label: string; value: string | number };
  const { setFieldValue } = useFormikContext();
  const selectedOption = useMemo(() => {
    if (multiple) {
      return data?.filter((option) =>
        (field.value || []).includes(option.value)
      );
    }
    return data?.find((option) => option.value === field.value) || null;
  }, [field.value, data, multiple]);
  const handleSelectChange = (option: SelectOption | SelectOption[] | null) => {
    if (multiple) {
      const values = Array.isArray(option)
        ? option.map((opt) => opt.value)
        : [];
      setFieldValue(field.name, values);
    } else {
      const value = (option as SelectOption)?.value ?? null;
      setFieldValue(field.name, value);
    }
  };

  // مقداردهی اولیه برای Select
  useEffect(() => {
    if (defaultValue) {
      setFieldValue(field.name, defaultValue);
    }
  }, [defaultValue, field.name, setFieldValue]);

  return (
    <>
      <Select
        value={selectedOption ?? field.value}
        onChange={handleSelectChange}
        options={data}
        isSearchable={isSearchable}
        name={name}
        id={id}
        placeholder={
          <LoadingField placeholder={placeholder} isLoading={loading} />
        }
        noOptionsMessage={() => "محتوایی برای نمایش وجود ندارد"}
        isMulti={multiple}
        loadingMessage={() => "در حال بارگذاری..."}
        isDisabled={disabled || loading}
        menuPosition="absolute"
        styles={customSelectStyles}
        classNamePrefix="react-select"
        className={className ?? ""}
      />
    </>
  );
}
