import { type FC, useRef, useEffect } from 'react';
import { Badge, IconButton, Tooltip } from '../../atoms';
import type { Frame, CanvasSize } from '../../../types';
import styles from './FramePreview.module.css';

export interface FramePreviewProps {
  frame: Frame;
  index: number;
  canvasSize: CanvasSize;
  active: boolean;
  onSelect: () => void;
  onDelete: () => void;
  onDuplicate: () => void;
  canDelete: boolean;
}

export const FramePreview: FC<FramePreviewProps> = ({
  frame,
  index,
  canvasSize,
  active,
  onSelect,
  onDelete,
  onDuplicate,
  canDelete,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const previewSize = 48;

  // Render preview
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const scale = previewSize / canvasSize;

    // Clear
    ctx.clearRect(0, 0, previewSize, previewSize);

    // Draw checkerboard background for transparency
    const checkSize = 4;
    for (let x = 0; x < previewSize; x += checkSize) {
      for (let y = 0; y < previewSize; y += checkSize) {
        ctx.fillStyle = ((x + y) / checkSize) % 2 === 0 ? '#333' : '#444';
        ctx.fillRect(x, y, checkSize, checkSize);
      }
    }

    // Draw pixels
    frame.pixels.forEach((color, key) => {
      const [x, y] = key.split(',').map(Number);
      ctx.fillStyle = color;
      ctx.fillRect(
        Math.floor(x * scale),
        Math.floor(y * scale),
        Math.ceil(scale),
        Math.ceil(scale)
      );
    });
  }, [frame, canvasSize]);

  return (
    <div className={`${styles.container} ${active ? styles.active : ''}`}>
      <button className={styles.preview} onClick={onSelect} aria-pressed={active}>
        <canvas
          ref={canvasRef}
          width={previewSize}
          height={previewSize}
          className={styles.canvas}
        />
        <Badge variant={active ? 'primary' : 'default'} size="sm" className={styles.badge}>
          {index + 1}
        </Badge>
      </button>
      <div className={styles.actions}>
        <Tooltip content="Duplicate" position="top">
          <IconButton
            icon="copy"
            size="sm"
            variant="ghost"
            onClick={onDuplicate}
            aria-label="Duplicate frame"
          />
        </Tooltip>
        <Tooltip content="Delete" position="top">
          <IconButton
            icon="trash"
            size="sm"
            variant="ghost"
            onClick={onDelete}
            disabled={!canDelete}
            aria-label="Delete frame"
          />
        </Tooltip>
      </div>
    </div>
  );
};
