import { Alert } from "flowbite-react";
import { FaBomb } from "react-icons/fa6";

export default function ValidatingError({ error }: { error: string }) {
  return (
    <Alert color="danger" icon={FaBomb} className="m-0 my-2 py-1 mb-2 px-2  w-max pl-5" >
      <p className="text-xs mr-2 ">{error}</p>
    </Alert>
  );
}
