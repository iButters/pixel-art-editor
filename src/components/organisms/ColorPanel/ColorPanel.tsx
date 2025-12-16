import { type FC } from 'react';
import { useEditorStore } from '../../../store';
import { ColorPicker, PaletteSelector } from '../../molecules';
import { ColorSwatch, Text, IconButton, Tooltip } from '../../atoms';
import styles from './ColorPanel.module.css';

export const ColorPanel: FC = () => {
  const {
    primaryColor,
    secondaryColor,
    setPrimaryColor,
    setSecondaryColor,
    swapColors,
    palette,
    paletteName,
    setPalette,
  } = useEditorStore();

  return (
    <div className={styles.panel}>
      <div className={styles.section}>
        <Text variant="label" className={styles.sectionTitle}>
          Colors
        </Text>
        <div className={styles.colorPickers}>
          <ColorPicker
            color={primaryColor}
            onChange={setPrimaryColor}
            label="Primary"
          />
          <div className={styles.swapContainer}>
            <Tooltip content="Swap Colors (X)">
              <IconButton
                icon="symmetryBoth"
                size="sm"
                variant="ghost"
                onClick={swapColors}
                aria-label="Swap colors"
              />
            </Tooltip>
          </div>
          <ColorPicker
            color={secondaryColor}
            onChange={setSecondaryColor}
            label="Secondary"
          />
        </div>
      </div>

      <div className={styles.divider} />

      <div className={styles.section}>
        <PaletteSelector currentPalette={paletteName} onSelect={setPalette} />
      </div>

      <div className={styles.divider} />

      <div className={styles.section}>
        <Text variant="label" className={styles.sectionTitle}>
          Palette Colors
        </Text>
        <div className={styles.paletteGrid}>
          {palette.map((color, index) => (
            <Tooltip key={`${color}-${index}`} content={color.toUpperCase()}>
              <ColorSwatch
                color={color}
                size="md"
                active={color === primaryColor}
                onClick={() => setPrimaryColor(color)}
                onContextMenu={(e) => {
                  e.preventDefault();
                  setSecondaryColor(color);
                }}
              />
            </Tooltip>
          ))}
        </div>
      </div>
    </div>
  );
};
