// COPY-PASTE FROM https://github.com/nikoeno/auth-form/tree/main/src/shared/ui/Input

import {
  ChangeEvent,
  FocusEventHandler,
  InputHTMLAttributes,
  MutableRefObject,
  useEffect,
  useRef,
} from "react";
import cls from "classnames";

import styles from "./Input.module.css";

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  label?: string;
  focusOnMount?: boolean;
  autoComplete?: string;
  className?: string;
  required?: boolean;
  isError?: boolean;
  inputRef?: MutableRefObject<HTMLInputElement | undefined>;
  onFocus?: FocusEventHandler<HTMLInputElement>;
}

export const Input = ({
  placeholder,
  name,
  value,
  onChange,
  type,
  focusOnMount = false,
  autoComplete,
  className,
  required,
  pattern,
  inputRef,
  isError,
  onFocus,
  label,
}: Props) => {
  const ref = useRef<HTMLInputElement>(null);
  const wasFocused = useRef(false);

  useEffect(() => {
    if (inputRef && ref.current) {
      inputRef.current = ref.current;
    }

    if (ref.current && focusOnMount && !wasFocused.current) {
      ref.current.focus();
      wasFocused.current = true;
    }
  }, [ref.current]);

  return (
    <label className={cls(className, styles.label)}>
      <span className={styles.labelText}>{label}</span>
      <input
        className={cls(styles.input, { [styles.inputError]: isError })}
        ref={ref}
        type={type}
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          onChange(e.target.value)
        }
        placeholder={placeholder}
        name={name}
        autoComplete={autoComplete}
        required={required}
        pattern={pattern}
        onFocus={onFocus}
      />
    </label>
  );
};
