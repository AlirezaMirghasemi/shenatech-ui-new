import { User } from "@/types/User";
import { Button, Popover } from "flowbite-react";
import ChangeUserStatusForm from "./ChangeUserStatusForm";
import { useState } from "react";
import { IButtonProps } from "@/interfaces/IButtonProps ";

// src/components/admin/user/ChangeUserStatusPopover.tsx
export default function ChangeUserStatusPopover({
  user,
  buttonProps,
}: {
  user: User;
  buttonProps: IButtonProps<User>;
}) {
  const [isOpen, setIsOpen] = useState(false);
//TODO:FIX IT!
  return (
    <Popover
      placement="bottom"
      arrow={false}
      content={
        <div className="z-[9999] min-w-[150px] p-2 bg-white rounded-lg shadow-lg dark:bg-gray-800">
          <ChangeUserStatusForm user={user} onClose={() => setIsOpen(false)} />
        </div>
      }
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <Button
        color={buttonProps.color || "default"}
        className={`${buttonProps.className || "m-1 rounded-lg"} transition-colors`}
        disabled={
          typeof buttonProps.disabled === "function"
            ? buttonProps.disabled(user)
            : buttonProps.disabled
        }
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
      >
        {buttonProps.icon}
      </Button>
    </Popover>
  );
}
