import { StylesConfig } from "react-select";

export const customSelectStyles: StylesConfig = {
  control: (base, { isFocused, isDisabled }) => ({
    ...base,
    minHeight: "42px",
    borderColor: isFocused
      ? "var(--colors-border-focus)"
      : "var(--colors-border-default)",
    boxShadow: isFocused
      ? "0 0 0 2px var(--colors-ring-default)"
      : "none",
    "&:hover": {
      borderColor: "var(--colors-border-hover)",
    },
    backgroundColor: isDisabled
      ? "var(--colors-bg-disabled)"
      : "var(--colors-bg-surface)",
    borderRadius: "0.5rem",
    padding: "0.125rem",
    transition: "all var(--transition-duration) var(--transition-timing)",
    opacity: isDisabled ? "var(--opacity-disabled)" : 1,
    cursor: isDisabled ? "not-allowed" : "default",
  }),
  option: (base, { isSelected, isFocused }) => {
    let backgroundColor = "var(--colors-bg-surface)";

    if (isSelected) {
      backgroundColor = "var(--colors-bg-accent)";
    } else if (isFocused) {
      backgroundColor = "var(--colors-bg-hover)";
    }

    return {
      ...base,
      backgroundColor,
      color: "var(--colors-text-default)",
      "&:active": {
        backgroundColor: "var(--colors-bg-active)",
      },
      "&:hover": {
        backgroundColor: !isSelected
          ? "var(--colors-bg-hover)"
          : "var(--colors-bg-accent-hover)",
        transform: "translateX(2px)",
      },
      transition: "all var(--transition-duration) var(--transition-timing)",
      cursor: "pointer",
      position: "relative",
      overflow: "hidden",
    };
  },
  menu: (base) => ({
    ...base,
    backgroundColor: "var(--colors-bg-surface)",
    borderRadius: "0.5rem",
    boxShadow: "var(--shadow-md)",
    overflow: "hidden",
    zIndex: 10,
  }),
  menuList: (base) => ({
    ...base,
    padding: 0,
    "&::-webkit-scrollbar": {
      width: "8px",
    },
    "&::-webkit-scrollbar-track": {
      background: "var(--colors-bg-surface)",
    },
    "&::-webkit-scrollbar-thumb": {
      background: "var(--colors-bg-interactive)",
      borderRadius: "4px",
    },
  }),
  multiValue: (base) => ({
    ...base,
    backgroundColor: "var(--colors-bg-accent)",
    borderRadius: "0.375rem",
    transition: "all var(--transition-duration) var(--transition-timing)",
    "&:hover": {
      backgroundColor: "var(--colors-bg-accent-hover)",
    },
  }),
  multiValueLabel: (base) => ({
    ...base,
    color: "var(--colors-text-default)",
    padding: "2px 6px",
    fontWeight: 500,
  }),
  multiValueRemove: (base, { isFocused }) => ({
    ...base,
    color: "var(--colors-text-muted)",
    borderRadius: "0 0.375rem 0.375rem 0",
    "&:hover": {
      backgroundColor: "var(--colors-danger)",
      color: "var(--colors-text-on-dark)",
    },
    backgroundColor: isFocused ? "var(--colors-bg-accent-hover)" : "transparent",
    transition: "all var(--transition-duration) var(--transition-timing)",
  }),
  input: (base) => ({
    ...base,
    color: "var(--colors-text-default)",
    fontFamily: "var(--font-family-sans)",
  }),
  placeholder: (base) => ({
    ...base,
    color: "var(--colors-text-placeholder)",
    fontSize: "0.875rem",
  }),
  singleValue: (base, { isDisabled }) => ({
    ...base,
    color: isDisabled
      ? "var(--colors-text-muted)"
      : "var(--colors-text-default)",
    transition: "opacity var(--transition-duration) var(--transition-timing)",
    opacity: isDisabled ? "var(--opacity-disabled)" : 1,
  }),
  indicatorSeparator: (base, { isDisabled }) => ({
    ...base,
    backgroundColor: isDisabled
      ? "var(--colors-border-disabled)"
      : "var(--colors-border-default)",
    opacity: isDisabled ? "var(--opacity-disabled)" : 1,
  }),
  dropdownIndicator: (base, { isFocused, isDisabled }) => ({
    ...base,
    color: isDisabled
      ? "var(--colors-text-muted)"
      : isFocused
        ? "var(--colors-text-default)"
        : "var(--colors-text-muted)",
    "&:hover": {
      color: "var(--colors-text-default)",
    },
    transition: "all var(--transition-duration) var(--transition-timing)",
    padding: "4px 8px",
  }),
  clearIndicator: (base) => ({
    ...base,
    color: "var(--colors-text-muted)",
    "&:hover": {
      color: "var(--colors-danger)",
    },
    transition: "all var(--transition-duration) var(--transition-timing)",
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
