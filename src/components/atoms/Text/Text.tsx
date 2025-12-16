import { type FC, type ReactNode, type HTMLAttributes, type ElementType } from 'react';
import styles from './Text.module.css';

export type TextVariant = 'h1' | 'h2' | 'h3' | 'body' | 'small' | 'label' | 'mono';
export type TextWeight = 'normal' | 'medium' | 'bold';
export type TextColor = 'default' | 'muted' | 'dim' | 'primary' | 'error' | 'success';

export interface TextProps extends HTMLAttributes<HTMLElement> {
  variant?: TextVariant;
  weight?: TextWeight;
  color?: TextColor;
  as?: ElementType;
  children: ReactNode;
}

const defaultElements: Record<TextVariant, ElementType> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  body: 'p',
  small: 'span',
  label: 'label',
  mono: 'code',
};

export const Text: FC<TextProps> = ({
  variant = 'body',
  weight = 'normal',
  color = 'default',
  as,
  children,
  className = '',
  ...props
}) => {
  const Component = as || defaultElements[variant];

  const classNames = [
    styles.text,
    styles[variant],
    styles[`weight-${weight}`],
    styles[`color-${color}`],
    className,
  ].filter(Boolean).join(' ');

  return (
    <Component className={classNames} {...props}>
      {children}
    </Component>
  );
};
