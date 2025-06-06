import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaUser } from "react-icons/fa6";
import DynamicInputField from "@/components/admin/dynamics/DynamicInputField";
import { InputType } from "@/constants/data/InputType";
import { DataStatus } from "@/constants/data/DataStatus";
import { useFormikContext } from "formik";
import { IDynamicFormInputFile } from "@/interfaces/IDynamicFormInputFile";
const DynamicFormInputFile = <T extends Record<string, unknown>>({
  loading,
  uniqueLoading,
  fileInputFieldName,
  dynamicInputFieldProps,
}: IDynamicFormInputFile<T>) => {
  const [preview, setPreview] = React.useState<string | null>(null);
  const {
    values,
    setFieldValue,
    validateField,
    setFieldError,
    setFieldTouched,
  } = useFormikContext<T>();
  // استفاده از state محلی جهت نگهداری اطلاعات عکس قبلی
  const [previewOldImage, setPreviewOldImage] = useState<string | null>(null);
  const fieldName = fileInputFieldName as string;

  useEffect(() => {
    // اگر initialValues.imageId خالی نباشد، عکس قبلی را بارگیری کن
    const fetchImage = async () => {
      const fieldValue = values[fileInputFieldName];

      if (
        fieldValue &&
        typeof fieldValue === "object" &&
        "path" in fieldValue
      ) {
        await setPreviewOldImage(
          `${process.env.NEXT_PUBLIC_FILE_URL}/${fieldValue.path as string}`
        );
      } else {
        setPreviewOldImage(null);

      }
    };
    fetchImage();
  }, [fileInputFieldName, values]);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFieldTouched(fieldName, true, true);
    setFieldError(fieldName, undefined);
    const file = event.target.files?.[0] ?? "";
    if (file) {
      await setFieldValue(fieldName, file);
      await setFieldError(fieldName, undefined);
      await validateField(fieldName);
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setPreview(reader.result);
        }
      };
      reader.readAsDataURL(file);
    } else {
      await setFieldValue(fieldName, null);
      await setFieldError(fieldName, undefined);
      await setPreview(null);
      await setFieldTouched(fieldName, false);
    }
  };

  return (
    <>
      <div className="col-span-2 sm:col-span-1">
        <DynamicInputField
          id={dynamicInputFieldProps.id}
          name={dynamicInputFieldProps.name}
          placeholder={dynamicInputFieldProps.placeholder}
          label={dynamicInputFieldProps.label}
          type={InputType.FILE}
          className="mb-1"
          disabled={
            loading == DataStatus.PENDING || uniqueLoading == DataStatus.PENDING
          }
          fileInputProps={{
            accept: "image/*",
            onChange: handleFileChange,
          }}
        />
      </div>
      {previewOldImage ? (
        <div className="col-span-2 sm:col-span-1">
          <Image
            src={previewOldImage}
            alt="Preview"
            width={300}
            height={300}
            className="rounded-full object-cover block w-30 h-30 mr-10"
          />
        </div>
      ) : preview ? (
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
};

export default DynamicFormInputFile;
