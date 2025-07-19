// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import PersianDate from "persian-date";
export function ConvertDateToShamsi({ date }: { date: string }) {
  return  new PersianDate(new Date(date)).format(
    "HH:mm:ss - YYYY/MM/DD"
  );
}
