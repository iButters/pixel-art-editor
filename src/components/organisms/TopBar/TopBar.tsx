import { type FC, useState } from 'react';
import { useEditorStore } from '../../../store';
import { ZoomControl } from '../../molecules';
import { Button, IconButton, Toggle, Tooltip, Text } from '../../atoms';
import type { CanvasSize } from '../../../types';
import styles from './TopBar.module.css';

const canvasSizes: CanvasSize[] = [16, 32, 64];

export const TopBar: FC = () => {
  const {
    canvasSize,
    setCanvasSize,
    zoom,
    setZoom,
    showGrid,
    toggleGrid,
    theme,
    toggleTheme,
    undo,
    redo,
    canUndo,
    canRedo,
    clearCanvas,
  } = useEditorStore();

  const [showExportMenu, setShowExportMenu] = useState(false);

  const handleZoomIn = () => setZoom(Math.min(32, zoom * 2));
  const handleZoomOut = () => setZoom(Math.max(1, zoom / 2));

  const handleExportPNG = (scale: number) => {
    const { frames, activeFrameId } = useEditorStore.getState();
    const frame = frames.find((f) => f.id === activeFrameId);
    if (!frame) return;

    const exportCanvas = document.createElement('canvas');
    const size = canvasSize * scale;
    exportCanvas.width = size;
    exportCanvas.height = size;
    const ctx = exportCanvas.getContext('2d');
    if (!ctx) return;

    // Draw pixels
    frame.pixels.forEach((color, key) => {
      const [x, y] = key.split(',').map(Number);
      ctx.fillStyle = color;
      ctx.fillRect(x * scale, y * scale, scale, scale);
    });

    // Download
    const link = document.createElement('a');
    link.download = `pixel-art-${canvasSize}x${canvasSize}-${scale}x.png`;
    link.href = exportCanvas.toDataURL('image/png');
    link.click();

    setShowExportMenu(false);
  };

  const handleExportGIF = async () => {
    // For now, just download all frames as PNGs
    // A proper GIF export would require a library like gif.js
    alert('GIF export coming soon! For now, frames are exported as PNGs.');
    setShowExportMenu(false);
  };

  return (
    <div className={styles.topBar}>
      <div className={styles.left}>
        <div className={styles.section}>
          <Text variant="label" className={styles.label}>
            Canvas
          </Text>
          <div className={styles.sizeButtons}>
            {canvasSizes.map((size) => (
              <Button
                key={size}
                variant={canvasSize === size ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setCanvasSize(size)}
              >
                {size}
              </Button>
            ))}
          </div>
        </div>

        <div className={styles.divider} />

        <ZoomControl zoom={zoom} onZoomIn={handleZoomIn} onZoomOut={handleZoomOut} />
      </div>

      <div className={styles.center}>
        <Tooltip content="Undo (Ctrl+Z)">
          <IconButton
            icon="undo"
            onClick={undo}
            disabled={!canUndo()}
            aria-label="Undo"
          />
        </Tooltip>
        <Tooltip content="Redo (Ctrl+Y)">
          <IconButton
            icon="redo"
            onClick={redo}
            disabled={!canRedo()}
            aria-label="Redo"
          />
        </Tooltip>

        <div className={styles.divider} />

        <Tooltip content="Clear Canvas">
          <IconButton
            icon="trash"
            onClick={clearCanvas}
            aria-label="Clear canvas"
          />
        </Tooltip>
      </div>

      <div className={styles.right}>
        <Toggle
          checked={showGrid}
          onChange={toggleGrid}
          label="Grid"
        />

        <div className={styles.divider} />

        <Tooltip content={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}>
          <IconButton
            icon={theme === 'dark' ? 'sun' : 'moon'}
            onClick={toggleTheme}
            aria-label="Toggle theme"
          />
        </Tooltip>

        <div className={styles.divider} />

        <div className={styles.exportContainer}>
          <Button
            variant="primary"
            size="sm"
            onClick={() => setShowExportMenu(!showExportMenu)}
          >
            Export
          </Button>

          {showExportMenu && (
            <div className={styles.exportMenu}>
              <Text variant="label" className={styles.exportLabel}>
                Export PNG
              </Text>
              <div className={styles.exportOptions}>
                {[1, 2, 4, 8, 16].map((scale) => (
                  <Button
                    key={scale}
                    variant="secondary"
                    size="sm"
                    onClick={() => handleExportPNG(scale)}
                  >
                    {scale}x ({canvasSize * scale}px)
                  </Button>
                ))}
              </div>
              <div className={styles.exportDivider} />
              <Button variant="secondary" size="sm" onClick={handleExportGIF}>
                Export GIF
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
