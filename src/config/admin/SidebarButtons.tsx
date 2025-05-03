import { ISidebarButtonGroup } from "@/interfaces/ISidebarButtons";
import {
  FaUserTie,
  FaArrowTrendUp,
  FaCalendarDay,
  FaEnvelopesBulk,
  FaFilm,
  FaGear,
  FaHashtag,
  FaNewspaper,
  FaToolbox,
  FaWaterLadder,
  FaUser,
  FaLock,
  FaKey,
  FaComments,
  FaScrewdriverWrench,
} from "react-icons/fa6";

export const SidebarButtons: ISidebarButtonGroup = {
  icon: FaToolbox,
  name: "AdminPanel",
  title: "میز کاربری",
  groupName: "AdminPanelSide",
  children: [
    {
      icon: FaWaterLadder,
      name: "reports",
      title: "شناتک در یک نگاه",
      href: "/admin",
    },
    {
      icon: FaEnvelopesBulk,
      name: "ContentAdmin",
      title: "مدیریت محتوا",
      groupName: "ContentAdminSide",
      children: [
        {
          icon: FaCalendarDay,
          name: "events",
          title: "رویداد ها",
          href: "/admin/events",
        },
        {
          icon: FaNewspaper,
          name: "articles",
          title: "مقالات",
          href: "/admin/articles",
        },
        {
          icon: FaFilm,
          name: "videos",
          title: "فیلم ها",
          href: "/admin/videos",
        },
        {
          icon: FaArrowTrendUp,
          groupName: "seoSide",
          name: "seo",
          title: "مدیریت بازدید",
          children: [
            {
              icon: FaHashtag,
              name: "tags",
              title: "هشتگ ها",
              href: "/admin/tags",
            },
            {
              icon: FaGear,
              name: "slugs",
              title: "اسلاگ ها",
              href: "/admin/slugs",
            },
          ],
        },
      ],
    },
    {
      icon: FaUserTie,
      name: "UserAdmin",
      title: "مدیریت کاربران",
      groupName: "UserAdminSide",
      children: [
        {
          icon: FaUser,
          name: "users",
          title: "کاربران",
          href: "/admin/users",
        },
        {
          icon: FaLock,
          groupName: "accessSide",
          name: "access",
          title: "مدیریت دسترسی",
          children: [
            {
              icon: FaScrewdriverWrench,
              name: "roles",
              title: "نقش ها",
              href: "/admin/roles",
            },
            {
              icon: FaKey,
              name: "permissions",
              title: "مجوز ها",
              href: "/admin/permissions",
            },
          ],
        },
      ],
    },
    {
      icon: FaComments,
      name: "comments",
      title: "نظرات",
      href: "/admin/comments",
    },
  ],
};
