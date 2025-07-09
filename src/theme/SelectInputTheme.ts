import { StylesConfig } from "react-select";

export const customSelectStyles: StylesConfig = {
  control: (base, { isFocused, isDisabled }) => ({
    ...base,
    minHeight: "42px",
    borderColor: isDisabled
      ? "var(--colors-border-disabled)"
      : isFocused
      ? "var(--colors-border-focus)"
      : "var(--colors-border-default)",
    boxShadow: isFocused && !isDisabled
      ? "0 0 0 2px var(--colors-ring-default)"
      : "none",
    "&:hover": {
      borderColor: isDisabled
        ? "var(--colors-border-disabled)"
        : isFocused
        ? "var(--colors-border-focus)"
        : "var(--colors-border-interactive)",
    },
    backgroundColor: isDisabled
      ? "var(--colors-bg-disabled)"
      : "var(--colors-bg-surface)",
    borderRadius: "0.5rem",
    padding: "0.125rem",
    transition: "all var(--transition-duration) var(--transition-timing)",
    cursor: isDisabled ? "not-allowed" : "pointer",
    fontFamily: "var(--font-family-sans)",
  }),
  option: (base, { isSelected, isFocused, isDisabled }) => ({
    ...base,
    backgroundColor: isDisabled
      ? "transparent"
      : isSelected
        ? "var(--colors-primary)"
        : isFocused
          ? "var(--colors-bg-hover)"
          : "transparent",
    color: isDisabled
      ? "var(--colors-text-disabled)" // رنگ جدید برای حالت غیرفعال
      : isSelected
        ? "var(--colors-text-on-primary)"
        : "var(--colors-text-default)",
    "&:active": {
      backgroundColor: !isDisabled
        ? "var(--colors-primary-active)"
        : "transparent",
    },
    "&:hover": {
      backgroundColor: !isDisabled
        ? (isSelected
            ? "var(--colors-primary-hover)"
            : "var(--colors-bg-hover)")
        : "transparent",
      color: !isDisabled && isSelected
        ? "var(--colors-text-on-primary)"
        : "var(--colors-text-default)",
    },
    transition: "all var(--transition-duration) var(--transition-timing)",
    cursor: isDisabled ? "not-allowed" : "pointer",
    opacity: isDisabled ? 1 : 1, // حذف opacity اضافی
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: "var(--colors-bg-surface)",
    borderRadius: "0.5rem",
    boxShadow: "var(--shadow-md)",
    overflow: "hidden",
    zIndex: 20,
    border: "1px solid var(--colors-border-default)",
  }),
  menuList: (base) => ({
    ...base,
    backgroundColor: "var(--colors-bg-surface)",
    padding: 0,
    "&::-webkit-scrollbar": {
      width: "8px",
    },
    "&::-webkit-scrollbar-track": {
      background: "var(--colors-bg-alt)",
    },
    "&::-webkit-scrollbar-thumb": {
      background: "var(--colors-border-interactive)",
      borderRadius: "4px",
      "&:hover": {
        background: "var(--colors-bg-active)",
      },
    },
  }),
  multiValue: (base, { isDisabled }) => ({
    ...base,
    backgroundColor: isDisabled
      ? "var(--colors-bg-disabled)"
      : "var(--colors-primary)",
    borderRadius: "0.375rem",
    transition: "all var(--transition-duration) var(--transition-timing)",
    "&:hover": {
      backgroundColor: isDisabled
        ? "var(--colors-bg-disabled)"
        : "var(--colors-primary-hover)",
    },
  }),
  multiValueLabel: (base, { isDisabled }) => ({
    ...base,
    color: isDisabled
      ? "var(--colors-text-disabled)"
      : "var(--colors-text-on-primary)",
    padding: "2px 6px",
    fontWeight: isDisabled ? 400 : 500,
  }),
  multiValueRemove: (base, { isDisabled }) => ({
    ...base,
    color: isDisabled
      ? "var(--colors-text-disabled)"
      : "var(--colors-text-on-primary)",
    borderRadius: "0 0.375rem 0.375rem 0",
    "&:hover": {
      backgroundColor: isDisabled
        ? "transparent"
        : "var(--colors-primary-active)",
      color: isDisabled
        ? "var(--colors-text-disabled)"
        : "var(--colors-text-on-primary)",
    },
    transition: "all var(--transition-duration) var(--transition-timing)",
    cursor: isDisabled ? "not-allowed" : "pointer",
  }),
  input: (base, { isDisabled }) => ({
    ...base,
    color: isDisabled
      ? "var(--colors-text-disabled)"
      : "var(--colors-text-default)",
    fontFamily: "var(--font-family-sans)",
    opacity: isDisabled ? 1 : 1,
  }),
  placeholder: (base, { isDisabled }) => ({
    ...base,
    color: isDisabled
      ? "var(--colors-text-disabled)"
      : "var(--colors-text-placeholder)",
    fontSize: "0.875rem",
  }),
  singleValue: (base, { isDisabled }) => ({
    ...base,
    color: isDisabled
      ? "var(--colors-text-disabled)" // استفاده از رنگ جدید
      : "var(--colors-text-default)",
    fontWeight: isDisabled ? 500 : "normal", // وزن بیشتر برای خوانایی بهتر
    transition: "opacity var(--transition-duration) var(--transition-timing)",
    opacity: 1, // حذف opacity اضافی
  }),
  indicatorSeparator: (base, { isDisabled }) => ({
    ...base,
    backgroundColor: isDisabled
      ? "var(--colors-border-disabled)"
      : "var(--colors-border-default)",
  }),
  dropdownIndicator: (base, { isFocused, isDisabled }) => ({
    ...base,
    color: isDisabled
      ? "var(--colors-text-disabled)" // رنگ جدید برای آیکون غیرفعال
      : isFocused
      ? "var(--colors-text-default)"
      : "var(--colors-text-muted)",
    "&:hover": {
      color: isDisabled
        ? "var(--colors-text-disabled)"
        : "var(--colors-text-default)",
    },
    transition: "all var(--transition-duration) var(--transition-timing)",
    padding: "4px 8px",
  }),
  clearIndicator: (base, isDisabled ) => ({
    ...base,
    color: isDisabled
      ? "var(--colors-text-disabled)"
      : "var(--colors-text-muted)",
    "&:hover": {
      color: isDisabled
        ? "var(--colors-text-disabled)"
        : "var(--colors-danger)",
    },
    transition: "all var(--transition-duration) var(--transition-timing)",
    cursor: isDisabled ? "not-allowed" : "pointer",
  }),
  valueContainer: (base) => ({
    ...base,
    padding: "2px 8px",
  }),
  groupHeading: (base) => ({
    ...base,
    color: "var(--colors-text-secondary)",
    fontWeight: "bold",
    fontSize: "0.85rem",
    textTransform: "uppercase",
    borderBottom: "1px solid var(--colors-border-surface)",
    paddingBottom: "4px",
    marginBottom: "4px",
  }),
  noOptionsMessage: (base) => ({
    ...base,
    color: "var(--colors-text-muted)",
    padding: "12px 16px",
  }),
  loadingMessage: (base) => ({
    ...base,
    color: "var(--colors-text-muted)",
    padding: "12px 16px",
  }),
};
