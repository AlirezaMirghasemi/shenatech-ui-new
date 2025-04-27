import { FaBomb } from "react-icons/fa6";

export default function ValidatingError({ error }: { error: string }) {
  return (
    <div className="flex flex-row items-center py-0 my-2">
      <FaBomb className="text-red-600 mt-0 pl-1" />
      <p className="text-sm text-red-600 mt-0">{error}</p>
    </div>
  );
}
