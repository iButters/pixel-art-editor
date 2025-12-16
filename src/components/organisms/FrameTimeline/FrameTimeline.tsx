import { type FC, useEffect, useRef } from 'react';
import { useEditorStore } from '../../../store';
import { FramePreview } from '../../molecules';
import { Button, IconButton, Slider, Text, Tooltip } from '../../atoms';
import styles from './FrameTimeline.module.css';

export const FrameTimeline: FC = () => {
  const {
    frames,
    activeFrameId,
    canvasSize,
    isPlaying,
    fps,
    selectFrame,
    addFrame,
    deleteFrame,
    duplicateFrame,
    play,
    pause,
    setFps,
    nextFrame,
  } = useEditorStore();

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Animation playback
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        nextFrame();
      }, 1000 / fps);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, fps, nextFrame]);

  return (
    <div className={styles.timeline}>
      <div className={styles.header}>
        <Text variant="label">Animation</Text>
        <div className={styles.controls}>
          <Tooltip content={isPlaying ? 'Pause' : 'Play'}>
            <IconButton
              icon={isPlaying ? 'pause' : 'play'}
              onClick={isPlaying ? pause : play}
              active={isPlaying}
              aria-label={isPlaying ? 'Pause animation' : 'Play animation'}
            />
          </Tooltip>
          <div className={styles.fpsControl}>
            <Slider
              value={fps}
              min={1}
              max={30}
              onChange={setFps}
              label="FPS"
            />
          </div>
        </div>
      </div>

      <div className={styles.framesContainer}>
        <div className={styles.frames}>
          {frames.map((frame, index) => (
            <FramePreview
              key={frame.id}
              frame={frame}
              index={index}
              canvasSize={canvasSize}
              active={frame.id === activeFrameId}
              onSelect={() => selectFrame(frame.id)}
              onDelete={() => deleteFrame(frame.id)}
              onDuplicate={() => duplicateFrame(frame.id)}
              canDelete={frames.length > 1}
            />
          ))}
        </div>

        <Tooltip content="Add Frame">
          <Button
            variant="secondary"
            size="sm"
            onClick={addFrame}
            className={styles.addButton}
          >
            + Add
          </Button>
        </Tooltip>
      </div>
    </div>
  );
};
