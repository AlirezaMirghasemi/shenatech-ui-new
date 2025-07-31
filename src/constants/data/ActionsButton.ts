// src/constants/data/ActionsButton.ts
import { ModalType } from "@/constants/data/Modal";

// 1. تولید ActionType از ModalType
export const ActionType = Object.fromEntries(
  Object.entries(ModalType).map(([groupKey, actions]) => {
    const actionGroup = groupKey.replace('Type', 'Action') as keyof typeof ActionType;
    return [actionGroup, actions];
  })
) as {
  [K in keyof typeof ModalType as K extends `${infer P}Type` ? `${P}Action` : never]:
    (typeof ModalType)[K]
};

// 2. تایپ عمومی ActionTypeValue
export type ActionTypeValue = {
  [K in keyof typeof ActionType]: (typeof ActionType)[K][keyof (typeof ActionType)[K]]
}[keyof typeof ActionType];
