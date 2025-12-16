import { type FC, type ButtonHTMLAttributes } from 'react';
import { PixelIcon, type IconName, type IconSize } from '../PixelIcon/PixelIcon';
import styles from './IconButton.module.css';

export type IconButtonSize = 'sm' | 'md' | 'lg';

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: IconName;
  size?: IconButtonSize;
  active?: boolean;
  variant?: 'default' | 'ghost';
  'aria-label': string;
}

const iconSizeMap: Record<IconButtonSize, IconSize> = {
  sm: 'sm',
  md: 'md',
  lg: 'lg',
};

export const IconButton: FC<IconButtonProps> = ({
  icon,
  size = 'md',
  active = false,
  variant = 'default',
  className = '',
  disabled,
  ...props
}) => {
  const classNames = [
    styles.iconButton,
    styles[size],
    styles[variant],
    active && styles.active,
    className,
  ].filter(Boolean).join(' ');

  return (
    <button
      className={classNames}
      disabled={disabled}
      {...props}
    >
      <PixelIcon name={icon} size={iconSizeMap[size]} />
    </button>
  );
};
