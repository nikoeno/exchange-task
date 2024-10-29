// COPY-PASTE FROM https://github.com/nikoeno/auth-form/tree/main/src/shared/ui/Button

import { ButtonHTMLAttributes, ReactNode } from "react";
import cls from "classnames";

import styles from "./Button.module.css";

type Props = {
  type: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  className?: string;
  isDisabled?: boolean;
  loading?: boolean;
  children: ReactNode;
};

export const Button = ({
  type,
  children,
  className,
  isDisabled,
  loading,
}: Props) => {
  return (
    <button
      type={type}
      className={cls(className, styles.button)}
      disabled={isDisabled}
    >
      {loading ? "Loading..." : children}
    </button>
  );
};
