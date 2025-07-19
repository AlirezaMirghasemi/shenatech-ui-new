export enum Type {
  ARTICLE = "article",
  EVENT = "event",
  VIDEO = "video",
}
export enum Image {
  PROFILE = "profilePicture",
  POSTER = "poster",
}
export enum ImageType {
  PROFILE = "profile",
  POSTER = "poster",
  CONTENT = "content",
}
export class TypeTitles {
  static getTypeTitle(type: Type | Image | ImageType) {
    switch (type) {
      case Type.ARTICLE:
        return "مقاله";
      case Type.EVENT:
        return "رویداد";
      case Type.VIDEO:
        return "ویدیو";
      case Image.PROFILE || ImageType.PROFILE:
        return "عکس پروفایل";
      case Image.POSTER || ImageType.POSTER:
        return "پوستر";
      case ImageType.CONTENT:
        return "محتوا";
    }
  }
}
