import { Spinner } from "flowbite-react";

export default function LoadingField({
  isLoading=false,
  placeholder="",
}: {
  isLoading?: boolean;
  placeholder?: string;
}) {
  return (
    <>
      {isLoading ? (
        <>
          <Spinner size="sm" color="warning" className="ml-2" />
          <span>در حال بارگذاری...</span>
        </>
      ) : (
        placeholder
      )}
    </>
  );
}
