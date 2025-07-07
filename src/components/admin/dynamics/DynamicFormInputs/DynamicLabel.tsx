import { Label } from "flowbite-react";

export default function DynamicLabel({
  htmlFor,
  color,
  label,
}: {
  htmlFor: string;
  color: string;
  label: string;
}) {
  return (
    <>
      <Label
        htmlFor={htmlFor}
        className="block mb-2 text-sm font-medium"
        color={color}
      >
        {label}
      </Label>
    </>
  );
}
