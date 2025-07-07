"use client";
import React, { useCallback, useEffect } from "react";
import Image from "next/image";
import { FaUser } from "react-icons/fa6";
import { useFormikContext } from "formik";
import { IDynamicImageInputProps } from "@/interfaces/IDynamicInputField";
import { FileInput } from "flowbite-react";

export default function DynamicImageInputFile({
  id,
  name,
  placeholder,
  loading,
  multiple,
  readOnly,
  className,
  value,
  onChange,
}: IDynamicImageInputProps) {
  const { setFieldValue, setFieldError, setFieldTouched } = useFormikContext();
  const [preview, setPreview] = React.useState<string | null>(null);
  const createPreview = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        setPreview(reader.result);
      }
    };
    reader.readAsDataURL(file);
  }, []);
  useEffect(() => {
    if (value instanceof File) {
      createPreview(value);
    } else if (value && typeof value === "object" && "path" in value) {
      setPreview(`${process.env.NEXT_PUBLIC_FILE_URL}/${value.path}`);
    } else {
      setPreview(null);
    }
  }, [value, createPreview]);
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0] || null;

    if (file) {
      setFieldValue(id, file);
      createPreview(file);
    } else {
      setFieldValue(id, null);
      setPreview(null);
    }

    setFieldTouched(id, true);
    setFieldError(id, undefined);

    if (onChange) {
      onChange(event);
    }
  };
  return (
    <>
      <div className="col-span-2 sm:col-span-1">
        <FileInput
          id={id}
          name={name}
          placeholder={placeholder}
          className={className}
          disabled={loading}
          accept="image/*"
          onChange={handleFileChange}
          multiple={multiple}
          readOnly={readOnly}
        />
      </div>
      {preview ? (
        <div className="col-span-2 sm:col-span-1">
          <Image
            src={preview}
            alt="Preview"
            width={300}
            height={300}
            className="rounded-full object-cover block w-30 h-30 mr-10"
          />
        </div>
      ) : (
        <div className="col-span-2 sm:col-span-1 w-30 h-30 bg-gray-200 rounded-full flex items-center justify-center  mr-10">
          <FaUser className="w-10 h-10 text-gray-400 block " />
        </div>
      )}
    </>
  );
}
