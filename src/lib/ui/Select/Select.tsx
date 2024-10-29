import styles from "./Select.module.css";

type Props = {
  options: { id: string; name: string }[];
  value: string;
  onChange: (
    value: string,
    originalReactEvent: React.ChangeEvent<HTMLSelectElement>
  ) => void;
  label?: string;
  placeholder?: string;
  loading?: boolean;
};

export const Select = ({
  options,
  value,
  onChange,
  label,
  placeholder,
  loading,
}: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value, e);
  };

  return (
    <label>
      {label && <span className={styles.label}>{label}</span>}
      <select value={value} onChange={handleChange} className={styles.select}>
        {loading ? (
          <option>Loading...</option>
        ) : (
          <>
            <option value="">{placeholder}</option>
            {options.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </>
        )}
      </select>
    </label>
  );
};
