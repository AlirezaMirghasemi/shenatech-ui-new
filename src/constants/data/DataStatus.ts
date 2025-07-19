export enum DataStatus {
  IDLE = "idle",
  LOADING = "loading",
  PENDING = "pending",
  SUCCEEDED = "succeeded",
  FAILED = "failed",
}
export class DataStatusTitles {
  static getDataStatusTitle(status: DataStatus): string {
    switch (status) {
      case DataStatus.IDLE:
        return "پیش فرض";
      case DataStatus.LOADING:
        return "در حال بارگذاری";
      case DataStatus.PENDING:
        return "در حال بررسی";
      case DataStatus.SUCCEEDED:
        return "موفق";
      case DataStatus.FAILED:
        return "رد شده";
      default:
        return "نامعلوم";
    }
  }
}
