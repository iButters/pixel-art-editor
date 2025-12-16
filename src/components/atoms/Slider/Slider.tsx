import { type FC, type InputHTMLAttributes } from 'react';
import styles from './Slider.module.css';

export interface SliderProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> {
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
  label?: string;
  showValue?: boolean;
}

export const Slider: FC<SliderProps> = ({
  value,
  min,
  max,
  step = 1,
  onChange,
  label,
  showValue = true,
  className = '',
  id,
  ...props
}) => {
  const sliderId = id || `slider-${label?.toLowerCase().replace(/\s/g, '-')}`;
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className={`${styles.container} ${className}`}>
      {(label || showValue) && (
        <div className={styles.header}>
          {label && (
            <label htmlFor={sliderId} className={styles.label}>
              {label}
            </label>
          )}
          {showValue && <span className={styles.value}>{value}</span>}
        </div>
      )}
      <div className={styles.track}>
        <div
          className={styles.fill}
          style={{ width: `${percentage}%` }}
        />
        <input
          type="range"
          id={sliderId}
          className={styles.input}
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={(e) => onChange(Number(e.target.value))}
          {...props}
        />
      </div>
    </div>
  );
};
