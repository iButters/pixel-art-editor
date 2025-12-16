import { useMemo } from 'react';
import { useEditorStore } from './editorStore';
import type { Frame, Tool, SymmetryMode, CanvasSize } from '../types';
import type { PaletteName } from '../tokens';

// Helper to create pixel key
const pixelKey = (x: number, y: number) => `${x},${y}`;

// ============================================
// Simple State Selectors
// ============================================

/** Select the active frame from the frames array */
export const selectActiveFrame = (state: ReturnType<typeof useEditorStore.getState>) =>
  state.frames.find((f) => f.id === state.activeFrameId);

/** Select canvas information */
export const selectCanvasInfo = (state: ReturnType<typeof useEditorStore.getState>) => ({
  size: state.canvasSize,
  zoom: state.zoom,
  showGrid: state.showGrid,
});

/** Select tool information */
export const selectToolInfo = (state: ReturnType<typeof useEditorStore.getState>) => ({
  activeTool: state.activeTool,
  symmetryMode: state.symmetryMode,
});

/** Select color information */
export const selectColorInfo = (state: ReturnType<typeof useEditorStore.getState>) => ({
  primaryColor: state.primaryColor,
  secondaryColor: state.secondaryColor,
  palette: state.palette,
  paletteName: state.paletteName,
});

/** Select animation state */
export const selectAnimationState = (state: ReturnType<typeof useEditorStore.getState>) => ({
  frames: state.frames,
  activeFrameId: state.activeFrameId,
  isPlaying: state.isPlaying,
  fps: state.fps,
  frameCount: state.frames.length,
});

/** Select UI state */
export const selectUIState = (state: ReturnType<typeof useEditorStore.getState>) => ({
  theme: state.theme,
});

// ============================================
// Parameterized Selectors (Factory Functions)
// ============================================

/** Select pixel color at specific coordinates */
export const selectPixelColor = (x: number, y: number) =>
  (state: ReturnType<typeof useEditorStore.getState>) => {
    const frame = selectActiveFrame(state);
    return frame?.pixels.get(pixelKey(x, y));
  };

/** Select a specific frame by ID */
export const selectFrameById = (id: string) =>
  (state: ReturnType<typeof useEditorStore.getState>) =>
    state.frames.find((f) => f.id === id);

/** Select frame index by ID */
export const selectFrameIndex = (id: string) =>
  (state: ReturnType<typeof useEditorStore.getState>) =>
    state.frames.findIndex((f) => f.id === id);

// ============================================
// Computed Selectors with useMemo (Custom Hooks)
// ============================================

/** Hook to get the active frame with memoization */
export const useActiveFrame = (): Frame | undefined => {
  const frames = useEditorStore((state) => state.frames);
  const activeFrameId = useEditorStore((state) => state.activeFrameId);

  return useMemo(
    () => frames.find((f) => f.id === activeFrameId),
    [frames, activeFrameId]
  );
};

/** Hook to get canvas display info with memoization */
export const useCanvasDisplay = () => {
  const canvasSize = useEditorStore((state) => state.canvasSize);
  const zoom = useEditorStore((state) => state.zoom);
  const showGrid = useEditorStore((state) => state.showGrid);

  return useMemo(
    () => ({
      canvasSize,
      zoom,
      showGrid,
      pixelSize: zoom,
      canvasPxSize: canvasSize * zoom,
    }),
    [canvasSize, zoom, showGrid]
  );
};

/** Hook to get filtered frames (e.g., for non-empty frames) */
export const useNonEmptyFrames = (): Frame[] => {
  const frames = useEditorStore((state) => state.frames);

  return useMemo(
    () => frames.filter((f) => f.pixels.size > 0),
    [frames]
  );
};

/** Hook to get the total pixel count across all frames */
export const useTotalPixelCount = (): number => {
  const frames = useEditorStore((state) => state.frames);

  return useMemo(
    () => frames.reduce((sum, frame) => sum + frame.pixels.size, 0),
    [frames]
  );
};

/** Hook to check if current frame is empty */
export const useIsActiveFrameEmpty = (): boolean => {
  const activeFrame = useActiveFrame();
  return !activeFrame || activeFrame.pixels.size === 0;
};

/** Hook to get the active frame index */
export const useActiveFrameIndex = (): number => {
  const frames = useEditorStore((state) => state.frames);
  const activeFrameId = useEditorStore((state) => state.activeFrameId);

  return useMemo(
    () => frames.findIndex((f) => f.id === activeFrameId),
    [frames, activeFrameId]
  );
};

// ============================================
// Action Selectors (for cleaner component code)
// ============================================

/** Select only drawing actions */
export const useDrawingActions = () => ({
  setPixel: useEditorStore((state) => state.setPixel),
  erasePixel: useEditorStore((state) => state.erasePixel),
  fill: useEditorStore((state) => state.fill),
  drawLine: useEditorStore((state) => state.drawLine),
  drawRectangle: useEditorStore((state) => state.drawRectangle),
  clearCanvas: useEditorStore((state) => state.clearCanvas),
});

/** Select only tool actions */
export const useToolActions = () => ({
  setTool: useEditorStore((state) => state.setTool),
  setSymmetryMode: useEditorStore((state) => state.setSymmetryMode),
});

/** Select only color actions */
export const useColorActions = () => ({
  setPrimaryColor: useEditorStore((state) => state.setPrimaryColor),
  setSecondaryColor: useEditorStore((state) => state.setSecondaryColor),
  swapColors: useEditorStore((state) => state.swapColors),
  setPalette: useEditorStore((state) => state.setPalette),
});

/** Select only animation actions */
export const useAnimationActions = () => ({
  addFrame: useEditorStore((state) => state.addFrame),
  deleteFrame: useEditorStore((state) => state.deleteFrame),
  selectFrame: useEditorStore((state) => state.selectFrame),
  duplicateFrame: useEditorStore((state) => state.duplicateFrame),
  reorderFrames: useEditorStore((state) => state.reorderFrames),
  play: useEditorStore((state) => state.play),
  pause: useEditorStore((state) => state.pause),
  setFps: useEditorStore((state) => state.setFps),
  nextFrame: useEditorStore((state) => state.nextFrame),
});

/** Select only history actions */
export const useHistoryActions = () => ({
  saveToHistory: useEditorStore((state) => state.saveToHistory),
  undo: useEditorStore((state) => state.undo),
  redo: useEditorStore((state) => state.redo),
  canUndo: useEditorStore((state) => state.canUndo),
  canRedo: useEditorStore((state) => state.canRedo),
});
