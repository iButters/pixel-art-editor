import { type FC, useState, useRef, useEffect } from 'react';
import { Button, ColorSwatch, Text } from '../../atoms';
import { retroPalettes, type PaletteName } from '../../../tokens';
import styles from './PaletteSelector.module.css';

export interface PaletteSelectorProps {
  currentPalette: PaletteName;
  onSelect: (name: PaletteName) => void;
}

export const PaletteSelector: FC<PaletteSelectorProps> = ({
  currentPalette,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const palettes = Object.entries(retroPalettes) as [PaletteName, typeof retroPalettes.gameboy][];

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
      <Text variant="label" className={styles.label}>
        Palette
      </Text>
      <Button
        variant="secondary"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className={styles.trigger}
        aria-expanded={isOpen}
      >
        {retroPalettes[currentPalette].name}
        <span className={styles.arrow}>{isOpen ? '▲' : '▼'}</span>
      </Button>

      {isOpen && (
        <div className={styles.dropdown}>
          {palettes.map(([key, palette]) => (
            <button
              key={key}
              className={`${styles.option} ${key === currentPalette ? styles.active : ''}`}
              onClick={() => {
                onSelect(key);
                setIsOpen(false);
              }}
            >
              <span className={styles.name}>{palette.name}</span>
              <div className={styles.preview}>
                {palette.colors.slice(0, 4).map((color, i) => (
                  <ColorSwatch key={i} color={color} size="sm" showBorder={false} />
                ))}
                {palette.colors.length > 4 && (
                  <span className={styles.more}>+{palette.colors.length - 4}</span>
                )}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
