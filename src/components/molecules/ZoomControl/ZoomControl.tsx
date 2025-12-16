import { type FC } from 'react';
import { IconButton, Text, Tooltip } from '../../atoms';
import styles from './ZoomControl.module.css';

export interface ZoomControlProps {
  zoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  min?: number;
  max?: number;
}

export const ZoomControl: FC<ZoomControlProps> = ({
  zoom,
  onZoomIn,
  onZoomOut,
  min = 1,
  max = 32,
}) => {
  const percentage = Math.round(zoom * 100);

  return (
    <div className={styles.container}>
      <Tooltip content="Zoom Out (-)">
        <IconButton
          icon="minus"
          size="sm"
          onClick={onZoomOut}
          disabled={zoom <= min}
          aria-label="Zoom out"
        />
      </Tooltip>
      <Text variant="mono" className={styles.value}>
        {percentage}%
      </Text>
      <Tooltip content="Zoom In (+)">
        <IconButton
          icon="plus"
          size="sm"
          onClick={onZoomIn}
          disabled={zoom >= max}
          aria-label="Zoom in"
        />
      </Tooltip>
    </div>
  );
};
