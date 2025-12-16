import { type FC, type InputHTMLAttributes } from 'react';
import styles from './Toggle.module.css';

export interface ToggleProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
}

export const Toggle: FC<ToggleProps> = ({
  checked,
  onChange,
  label,
  className = '',
  id,
  disabled,
  ...props
}) => {
  const toggleId = id || `toggle-${label?.toLowerCase().replace(/\s/g, '-')}`;

  return (
    <label
      htmlFor={toggleId}
      className={`${styles.container} ${disabled ? styles.disabled : ''} ${className}`}
    >
      <input
        type="checkbox"
        id={toggleId}
        className={styles.input}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
        {...props}
      />
      <div className={styles.track}>
        <div className={styles.thumb} />
      </div>
      {label && <span className={styles.label}>{label}</span>}
    </label>
  );
};
