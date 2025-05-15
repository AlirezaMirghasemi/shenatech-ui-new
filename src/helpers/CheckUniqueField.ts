export default function DynamicCheckUniqueField({
  fieldValue,
  fieldName,
  checkUniqueFunction,
}: {
  fieldValue: string;
  fieldName?: string;
  checkUniqueFunction: (fieldValue: string, fieldName?: string) => boolean | Promise<boolean>;
}) {
  return checkUniqueFunction(fieldValue, fieldName);
}
