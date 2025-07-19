export enum Status {
  DRAFT = "draft",
  PENDING = "pending",
  APPROVED = "approved",
  REJECTED = "rejected",
  DELETED = "deleted",
}
export class StatusTitles {
  static getStatusTitle(status: Status): string {
    switch (status) {
      case Status.DRAFT:
        return "پیش نویس";
      case Status.PENDING:
        return "در حال بررسی";
      case Status.APPROVED:
        return "تایید شده";
      case Status.REJECTED:
        return "رد شده";
      case Status.DELETED:
        return "حذف شده";
      default:
        return "نامعلوم";
    }
  }
}
