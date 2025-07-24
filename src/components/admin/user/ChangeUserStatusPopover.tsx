import { User } from "@/types/User";
import { Button, Popover } from "flowbite-react";
import ChangeUserStatusForm from "./ChangeUserStatusForm";

export default function ChangeUserStatusPopover({
  user,
  buttonProps,
}: {
  user: User;
  buttonProps: any;
  //TODO:: fixit
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
          className={buttonProps.className ? buttonProps.className : "m-1"}
          disabled={
            typeof buttonProps.disabled === "function"
              ? buttonProps.disabled(user)
              : buttonProps.disabled
          }
          hidden={
            typeof buttonProps.hidden === "function"
              ? buttonProps.hidden(user)
              : buttonProps.hidden
          }
        >
          {buttonProps.icon}
        </Button>
      </Popover>
    </>
  );
}
