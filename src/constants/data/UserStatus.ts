export enum UserStatus {
  ACTIVE = "active",
  DEACTIVATED = "deactivated",
  SUSPENDED = "suspended",
  PENDING = "pending",
  DELETED = "deleted",
}
export class UserStatusTitles {
  static getUserStatusTitle(status: UserStatus): string {
    switch (status) {
      case UserStatus.ACTIVE:
        return "فعال";
      case UserStatus.DEACTIVATED:
        return "غیر فعال";
      case UserStatus.SUSPENDED:
        return "معلق";
      case UserStatus.PENDING:
        return "در حال بررسی";
      case UserStatus.DELETED:
        return "حذف شده";
      default:
        return "نامعلوم";
    }
  }
}
