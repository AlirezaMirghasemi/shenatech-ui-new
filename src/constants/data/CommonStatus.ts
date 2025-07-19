export enum CommonStatus {
  ACTIVE = "active",
  DELETED = "deleted",
}
export class CommonStatusTitles {
  static getCommonStatusTitle(status: CommonStatus): string {
    switch (status) {
      case CommonStatus.ACTIVE:
        return "فعال";
      case CommonStatus.DELETED:
        return "حذف شده";
      default:
        return "نامعلوم";
    }
  }
}
