import { ISidebarButtonGroup } from "@/interfaces/IDynamicSidebarButtonGroup";
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
      href: "/admin/dashboard",
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
          href: "/admin/dashboard/events",
        },
        {
          icon: FaNewspaper,
          name: "articles",
          title: "مقالات",
          href: "/admin/dashboard/articles",
        },
        {
          icon: FaFilm,
          name: "videos",
          title: "فیلم ها",
          href: "/admin/dashboard/videos",
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
              href: "/admin/dashboard/tags",
            },
            {
              icon: FaGear,
              name: "slugs",
              title: "اسلاگ ها",
              href: "/admin/dashboard/slugs",
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
          href: "/admin/dashboard/users",
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
              href: "/admin/dashboard/roles",
            },
            {
              icon: FaKey,
              name: "permissions",
              title: "مجوز ها",
              href: "/admin/dashboard/permissions",
            },
          ],
        },
      ],
    },
    {
      icon: FaComments,
      name: "comments",
      title: "نظرات",
      href: "/admin/dashboard/comments",
    },
  ],
};
