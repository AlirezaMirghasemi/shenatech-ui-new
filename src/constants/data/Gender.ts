export enum Gender {
  NotSpecified = "NotSpecified",
  Male = "male",
  Female = "female",
}
export class GenderTitles {
  static getGenderTitle(gender: Gender): string {
    switch (gender) {
      case Gender.NotSpecified:
        return "نامشخص";
      case Gender.Male:
        return "مرد";
      case Gender.Female:
        return "زن";
    }
  }
}
