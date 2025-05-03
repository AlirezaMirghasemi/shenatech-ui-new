import {  FaThumbtack } from "react-icons/fa6";

export default function AdminDashboardButton({
  handleOpen,
}: {
  handleOpen: () => void;
}) {
  return (
    <>
          <div className="flex p-2  opacity-65 rounded-md hover:text-secondary-hover/30 hover:bg-primary/30">
            <p className="text-sm  flex mr-2 cursor-pointer " onClick={handleOpen}>
            <FaThumbtack
              className=" flex text-xl ml-2 "
            />
                میز مدیریت</p>
          </div>
    </>
  );
}
