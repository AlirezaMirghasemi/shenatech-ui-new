import { Spinner } from "flowbite-react";

export default function LoadingSkeleton() {
  return (
    <>
      <div className="flex flex-wrap items-center gap-2">
      <Spinner  size="xl" />
      </div>
    </>
  );
}
