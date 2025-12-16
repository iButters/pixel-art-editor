import { type FC, useState, useRef, useEffect } from 'react';
import { ColorSwatch, Text } from '../../atoms';
import styles from './ColorPicker.module.css';

export interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
  label?: string;
}

export const ColorPicker: FC<ColorPickerProps> = ({
  color,
  onChange,
  label,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <div className={styles.container} ref={containerRef}>
      {label && (
        <Text variant="label" className={styles.label}>
          {label}
        </Text>
      )}
      <div className={styles.picker}>
        <ColorSwatch
          color={color}
          size="lg"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
        />
        <input
          ref={inputRef}
          type="color"
          value={color}
          onChange={(e) => onChange(e.target.value)}
          className={styles.input}
          tabIndex={-1}
        />
        <Text variant="mono" className={styles.hex}>
          {color.toUpperCase()}
        </Text>
      </div>
      {isOpen && (
        <div className={styles.popover}>
          <input
            type="color"
            value={color}
            onChange={(e) => onChange(e.target.value)}
            className={styles.nativeInput}
          />
        </div>
      )}
    </div>
  );
};
