import { Gender, GenderTitles } from "@/constants/data/Gender";
import { Image as ImageType } from "@/types/Image";
import { UserStatus, UserStatusTitles } from "@/constants/data/UserStatus";
import { User } from "@/types/User";
import { Alert, Badge } from "flowbite-react";
import Image from "next/image";
import { FaUser } from "react-icons/fa6";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import PersianDate from "persian-date";
export default function UserProfileBody({ user }: { user: User }) {
  return (
    <>
      <div className="py-4 md:py-8">
        <div className="mb-4 grid gap-4 sm:grid-cols-2 sm:gap-8 lg:gap-16">
          <div className="space-y-4">
            <div className="flex space-x-4">
              {user?.profile_image ? (
                <Image
                  src={`${process.env.NEXT_PUBLIC_FILE_URL}/${(user.profile_image as ImageType).path}`}
                  alt={user.full_name ?? ""}
                  className="rounded-full h-25 w-25"
                  width={100}
                  height={100}
                />
              ) : (
                <FaUser className="h-16 w-16 rounded-lg" />
              )}
              <div>
                {(() => {
                  switch (user?.status) {
                    case UserStatus.ACTIVE:
                      return (
                        <Badge color="success" size="xs">
                          {UserStatusTitles.getUserStatusTitle(user?.status)}
                        </Badge>
                      );
                    case UserStatus.DEACTIVATED:
                      return (
                        <Badge color="danger" size="xs">
                          {UserStatusTitles.getUserStatusTitle(user?.status)}
                        </Badge>
                      );
                    case UserStatus.SUSPENDED:
                      return (
                        <Badge color="warning" size="xs">
                          {UserStatusTitles.getUserStatusTitle(user?.status)}
                        </Badge>
                      );
                    case UserStatus.PENDING:
                      return (
                        <Badge color="info" size="xs">
                          {UserStatusTitles.getUserStatusTitle(user?.status)}
                        </Badge>
                      );
                    case UserStatus.DELETED:
                      return (
                        <Badge color="danger" size="xs">
                          {UserStatusTitles.getUserStatusTitle(user?.status)}
                        </Badge>
                      );
                    default:
                      return null;
                  }
                })()}
                <h2 className="font-bold">{user?.username}</h2>
              </div>
            </div>
            <dl>
              <dt>آدرس ایمیل</dt>
              <dd>
                {user.email_verified_at ? (
                  <Badge color="success" size="xs">
                    احراز شده
                  </Badge>
                ) : (
                  <Badge color="danger" size="xs">
                    احراز نشده
                  </Badge>
                )}
                <br />
                {user?.email}
              </dd>
            </dl>
            <dl>
              <dt>نام و نام خانوادگی</dt>
              <dd>{user?.full_name ?? "ثبت نشده"}</dd>
            </dl>
            <dl>
              {/* <dt>نقش ها</dt> */}
              <dt>نقش ها</dt>
              <dd className="flex items-center gap-1">
                <Alert color="info">
                  {user?.role_names &&
                    user?.role_names.map((role) => (
                      <Badge key={role} size="xs" color="success">
                        {role}
                      </Badge>
                    ))}
                </Alert>
              </dd>
            </dl>
          </div>
          <div className="space-y-4">
            <dl>
              <dt>شماره تلفن همراه</dt>
              <dd>
                {user.mobile &&
                  (user.email_verified_at ? (
                    <Badge color="success" size="xs">
                      {" "}
                      احراز شده{" "}
                    </Badge>
                  ) : (
                    <Badge color="danger" size="xs">
                      {" "}
                      احراز نشده{" "}
                    </Badge>
                  ))}
                <br />
                {user?.mobile ?? (
                  <Badge color="warning" size="xs">
                    ثبت نشده
                  </Badge>
                )}
              </dd>
            </dl>
            <dl>
              <dt>تاریخ ثبت نام</dt>
              <dd className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                {user?.created_at &&
                  new PersianDate(new Date(user.created_at)).format(
                    "HH:mm:ss - YYYY/MM/DD"
                  )}
              </dd>
            </dl>
            <dl>
              <dt>جنسیت</dt>
              <dd>
                {user?.gender == Gender.Male
                  ? GenderTitles.getGenderTitle(user?.gender)
                  : user?.gender == Gender.Female
                    ? GenderTitles.getGenderTitle(user?.gender)
                    : GenderTitles.getGenderTitle(Gender.NotSpecified)}
              </dd>
            </dl>
            <dl>
              <dt>بیوگرافی</dt>
              <dd>
                {user?.bio ? (
                  <Alert color="success">{user?.bio}</Alert>
                ) : (
                  <Badge color="warning">ثبت نشده</Badge>
                )}
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </>
  );
}
