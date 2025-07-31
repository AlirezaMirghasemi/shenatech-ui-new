// src/hooks/useTableState.ts
import { useState, useCallback } from "react";
import { ModalData, ModalState, ModalTypeValue } from "@/constants/data/Modal";

export const useTableState = <T extends object>() => {
  // استفاده مستقیم از ModalState ایمپورت شده
  const [modals, setModals] = useState(ModalState);
  const [modalData, setModalData] = useState<ModalData<T>>();

  const openModal = useCallback((modal: ModalTypeValue, data: ModalData<T>) => {
    const [group, modalName] = modal.split('_') as [keyof typeof ModalState, string];

    setModals(prev => ({
      ...prev,
      [group]: {
        ...prev[group],
        [modalName]: true,
      }
    }));

    setModalData(data);
  }, []);

  const closeModal = useCallback((modal: ModalTypeValue) => {
    const [group, modalName] = modal.split('_') as [keyof typeof ModalState, keyof string];

    setModals(prev => ({
      ...prev,
      [group]: {
        ...prev[group],
        [modalName]: false,
      }
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
