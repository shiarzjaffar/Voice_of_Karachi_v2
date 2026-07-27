import { createElement, isValidElement } from "react";
import styles from "./IconActionButton.module.css";

export default function IconActionButton({
  icon,
  title,
  variant = "primary",
  onClick,
  disabled = false,
}) {
  const renderedIcon = isValidElement(icon)
    ? icon
    : createElement(icon, { size: 18 });

  return (
    <button
      type="button"
      className={`${styles.button} ${styles[variant]}`}
      onClick={onClick}
      disabled={disabled}
      title={title}
      aria-label={title}
    >
      {renderedIcon}
    </button>
  );
}