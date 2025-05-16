import { useAuth } from "@/hooks/useAuth";
import { Button, Modal, ModalBody, ModalHeader, Spinner } from "flowbite-react";
import { FaHandshake } from "react-icons/fa6";

export default function LogoutModal({
  logoutModalMode,
  setLogoutModalMode,
  logout,
}: {
  logoutModalMode: boolean;
  setLogoutModalMode: (mode: boolean) => void;
  logout: () => void;
}) {
  const { isLoading,user } = useAuth();
  return (
    <>
      <Modal
        show={logoutModalMode}
        size="md"
        onClose={() => setLogoutModalMode(false)}
        popup
      >
        <ModalHeader />
        <ModalBody>
          <div className="text-center">
            <FaHandshake className="mx-auto mb-4 h-14 w-14" />
            <h3 className="mb-5 text-lg font-normal ">
                {user?.first_name} عزیز آیا از خروج خود اطمینان دارید؟
            </h3>
            <div className="flex justify-center gap-4">
              <Button onClick={logout} color="warning" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Spinner size="sm" />
                  </>
                ) : (
                  "بله مطمئن هستم"
                )}
              </Button>
              <Button
                onClick={() => setLogoutModalMode(false)}
                color="success"
                disabled={isLoading}
              >
                نه ، به پنل برگرد.
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}
