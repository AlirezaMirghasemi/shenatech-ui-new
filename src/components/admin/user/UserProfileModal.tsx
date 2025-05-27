import { User } from "@/types/User";
import {
  Alert,
  Avatar,
  Badge,
  Modal,
  ModalBody,
  ModalHeader,
} from "flowbite-react";
import { FaUser } from "react-icons/fa6";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import PersianDate from "persian-date";
import { Gender } from "@/constants/data/Gender";
import { UserStatus } from "@/constants/data/UserStatus";
export default function UserProfileModal({
  user,
  onClose,
  userProfileModal,
}: {
  user: User;
  onClose: () => void;
  userProfileModal: boolean;
}) {
  return (
    <>
      <Modal show={userProfileModal} onClose={onClose} size="3xl" popup>
        <ModalHeader />
        <ModalBody>
          <div className="py-4 md:py-8">
            <div className="mb-4 grid gap-4 sm:grid-cols-2 sm:gap-8 lg:gap-16">
              <div className="space-y-4">
                <div className="flex space-x-4">
                  {user?.profile_image ? (
                    <Avatar
                      img={user.profile_image.path}
                      alt={user.full_name ?? ""}
                    />
                  ) : (
                    <FaUser className="h-16 w-16 rounded-lg" />
                  )}
                  <div>
                    {(() => {
                      switch (user?.status) {
                        case UserStatus.ACTIVE:
                          return <Badge color="success">فعال</Badge>;
                        case UserStatus.DEACTIVATED:
                          return <Badge color="danger">غیرفعال</Badge>;
                        case UserStatus.SUSPENDED:
                          return <Badge color="warning">معلق</Badge>;
                        case UserStatus.PENDING:
                          return <Badge color="info">در حال بررسی</Badge>;
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
                      <Badge color="success">احراز شده</Badge>
                    ) : (
                      <Badge color="danger">احراز نشده</Badge>
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
                  <dt>نقش ها</dt>
                  <dd className="flex items-center gap-1">
                    <Alert color="info">
                      {user?.roles &&
                        user?.roles.map((role) => (
                          <span key={role.id} className="mr-1">
                            {role.name}
                          </span>
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
                        <Badge color="success"> احراز شده </Badge>
                      ) : (
                        <Badge color="danger"> احراز نشده </Badge>
                      ))}
                    {user?.mobile ?? <Badge color="warning">ثبت نشده</Badge>}
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
                      ? "مرد"
                      : user?.gender == Gender.Female
                      ? "زن"
                      : "نامشخص"}
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
        </ModalBody>
      </Modal>
    </>
  );
}
