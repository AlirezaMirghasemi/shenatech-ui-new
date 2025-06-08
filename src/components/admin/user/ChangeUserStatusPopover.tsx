import { IDynamicTableAction } from "@/interfaces/IDynamicTable";
import { User } from "@/types/User";
import { Button, Popover } from "flowbite-react";
import ChangeUserStatusForm from "./ChangeUserStatusForm";

export default function ChangeUserStatusPopover({
  user,
  buttonProps,
  disabled
}: {
  user: User;
  buttonProps: IDynamicTableAction<User>;
  disabled?: boolean;
}) {
  return (
    <>
      <Popover
        placement="bottom"
        arrow
        content={
          <>
            <ChangeUserStatusForm user={user} />
          </>
        }

        trigger="click"
      >
        <Button
          key={buttonProps.name}
          color={buttonProps.color ? buttonProps.color : "default"}
          className={buttonProps.className ? buttonProps.className : ""}
          disabled={disabled ?? false}
        >
          {buttonProps.icon}
        </Button>
      </Popover>
    </>
  );
}
