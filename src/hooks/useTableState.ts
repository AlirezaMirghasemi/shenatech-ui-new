import { ModalData, ModalType } from "@/constants/data/ModalType";
import { useState, useCallback } from "react";

export const useTableState =<T extends object> () => {
  const [modals, setModals] = useState({
    create: false,
    edit: false,
    edits: false,
    delete: false,
    deletes: false,
    detail: false,
    restore: false,
    restores: false,
    assign: false,
    info: false,

  });

  const [modalData, setModalData] = useState<ModalData<T>>();

  const openModal = useCallback((modal: ModalType, data:ModalData<T>) => {
    if (data) {
      setModals((prev) => ({
        ...prev,
        [modal]: true,
      }));
      setModalData(data);
    }
  }, []);

  const closeModal = useCallback((modal: ModalType) => {
    setModals((prev) => ({
      ...prev,
      [modal]: false,
    }));
    setModalData(undefined);
  }, []);

  return {
    modals,
    modalData,
    openModal,
    closeModal,
  };
};
