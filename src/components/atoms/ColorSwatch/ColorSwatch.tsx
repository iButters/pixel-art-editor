import { type FC, type ButtonHTMLAttributes } from 'react';
import styles from './ColorSwatch.module.css';

export type ColorSwatchSize = 'sm' | 'md' | 'lg';

export interface ColorSwatchProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'> {
  color: string;
  size?: ColorSwatchSize;
  active?: boolean;
  showBorder?: boolean;
}

export const ColorSwatch: FC<ColorSwatchProps> = ({
  color,
  size = 'md',
  active = false,
  showBorder = true,
  className = '',
  ...props
}) => {
  const classNames = [
    styles.swatch,
    styles[size],
    active && styles.active,
    showBorder && styles.bordered,
    className,
  ].filter(Boolean).join(' ');

  // Check if color is transparent or very light
  const isLight = isLightColor(color);

  return (
    <button
      className={classNames}
      style={{ backgroundColor: color }}
      data-light={isLight}
      aria-label={`Color ${color}`}
      {...props}
    >
      {active && (
        <span className={styles.checkmark} style={{ color: isLight ? '#000' : '#fff' }}>
          ✓
        </span>
      )}
    </button>
  );
};

// Helper to determine if a color is light
function isLightColor(color: string): boolean {
  // Handle hex colors
  if (color.startsWith('#')) {
    const hex = color.slice(1);
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5;
  }
  return false;
}
