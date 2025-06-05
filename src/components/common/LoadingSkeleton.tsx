import { Alert, Spinner } from "flowbite-react";

export default function LoadingSkeleton() {
  return (
    <>
      <Alert color="info" className="flex flex-row items-center">
        <Spinner size="xl" color="warning" className="ml-3" />
        لطفا صبر پیشه کنید ... .
      </Alert>
    </>
  );
}
