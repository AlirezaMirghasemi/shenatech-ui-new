// src/constants/data/Modal.ts

// 1. تعریف ساختار اصلی به عنوان منبع حقیقت
const modalConfig = {
  commonModal: {
    create: false,
    edit: false,
    edits: false,
    restore: false,
    restores: false,
    detail: false,
    details: false,
    info: false,
    delete: false,
    deletes: false,
  },
  userModal: {
    changeStatus: false,
  },
  roleModal: {
    assignPermission: false,
    assignUser: false,
  },
  roleUserModal: {
    assignRole: false,
    assignRoles: false,
  },
  userRoleModal:{
    assignRole: false,
    assignRoles: false
  }

} as const;

// 2. تولید تایپ ModalStateType
export type ModalStateType = {
  [K in keyof typeof modalConfig]: {
    [P in keyof (typeof modalConfig)[K]]: boolean;
  };
};

// 3. ایجاد نمونه اولیه ModalState
export const ModalState: ModalStateType = { ...modalConfig };

// 4. تایپ و مقدار برای ModalType
export const ModalType = Object.fromEntries(
  Object.entries(modalConfig).map(([groupKey, actions]) => {
    const groupType = `${groupKey}Type` as const;
    const actionsObj = Object.fromEntries(
      Object.keys(actions).map((actionKey) => {
        // استفاده از نام اصلی اکشن (camelCase)
        return [actionKey, `${groupKey}_${actionKey}`];
      })
    );
    return [groupType, actionsObj];
  })
) as {
  [K in keyof typeof modalConfig as `${K}Type`]: {
    [P in keyof (typeof modalConfig)[K] & string]: `${K}_${P}`;
  };
};

// 5. تایپ عمومی برای ModalTypeValue
export type ModalTypeValue = {
  [K in keyof typeof ModalType]: (typeof ModalType)[K][keyof (typeof ModalType)[K]];
}[keyof typeof ModalType];

// 6. تایپ داده‌های مدال
// 8. تایپ داده‌های مدال
export interface ModalData<T extends object,p extends object = object> {
  selectedIds?: Set<number>;
  selectedRows?: T[];
  data?: T;
  [key: string]: unknown;
  parentId?: number;
  parentData?:p;
}
