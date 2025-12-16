import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { nanoid } from 'nanoid';
import type { Tool, SymmetryMode, CanvasSize, Frame, HistoryEntry } from '../types';
import { retroPalettes, type PaletteName } from '../tokens';

// Helper to create pixel key
const pixelKey = (x: number, y: number) => `${x},${y}`;

// Helper to clone a Map
const clonePixelMap = (map: Map<string, string>) => new Map(map);

interface EditorState {
  // Canvas
  canvasSize: CanvasSize;
  zoom: number;
  showGrid: boolean;

  // Tools
  activeTool: Tool;
  symmetryMode: SymmetryMode;

  // Colors
  primaryColor: string;
  secondaryColor: string;
  palette: string[];
  paletteName: PaletteName;

  // Animation
  frames: Frame[];
  activeFrameId: string;
  isPlaying: boolean;
  fps: number;

  // History
  history: HistoryEntry[];
  historyIndex: number;

  // UI
  theme: 'dark' | 'light';
}

interface EditorActions {
  // Canvas
  setCanvasSize: (size: CanvasSize) => void;
  setZoom: (zoom: number) => void;
  toggleGrid: () => void;

  // Tools
  setTool: (tool: Tool) => void;
  setSymmetryMode: (mode: SymmetryMode) => void;

  // Drawing
  setPixel: (x: number, y: number, color: string) => void;
  erasePixel: (x: number, y: number) => void;
  fill: (x: number, y: number, color: string) => void;
  drawLine: (x1: number, y1: number, x2: number, y2: number, color: string) => void;
  drawRectangle: (x1: number, y1: number, x2: number, y2: number, color: string, filled?: boolean) => void;
  clearCanvas: () => void;
  getPixelColor: (x: number, y: number) => string | undefined;

  // Colors
  setPrimaryColor: (color: string) => void;
  setSecondaryColor: (color: string) => void;
  swapColors: () => void;
  setPalette: (name: PaletteName) => void;

  // Animation
  addFrame: () => void;
  deleteFrame: (id: string) => void;
  selectFrame: (id: string) => void;
  duplicateFrame: (id: string) => void;
  reorderFrames: (fromIndex: number, toIndex: number) => void;
  play: () => void;
  pause: () => void;
  setFps: (fps: number) => void;
  nextFrame: () => void;

  // History
  saveToHistory: () => void;
  undo: () => void;
  redo: () => void;
  canUndo: () => boolean;
  canRedo: () => boolean;

  // Export helpers
  getActiveFrame: () => Frame | undefined;
  getAllPixels: () => Map<string, string>;

  // UI
  toggleTheme: () => void;

  // Reset
  resetEditor: () => void;

  // Demo
  loadFrames: (frames: Frame[]) => void;
}

type EditorStore = EditorState & EditorActions;

const MAX_HISTORY = 50;

const createInitialFrame = (): Frame => ({
  id: nanoid(),
  pixels: new Map(),
});

const initialState: EditorState = {
  canvasSize: 32,
  zoom: 8,
  showGrid: true,
  activeTool: 'pencil',
  symmetryMode: 'none',
  primaryColor: '#0f380f',
  secondaryColor: '#9bbc0f',
  palette: [...retroPalettes.gameboy.colors],
  paletteName: 'gameboy',
  frames: [createInitialFrame()],
  activeFrameId: '',
  isPlaying: false,
  fps: 12,
  history: [],
  historyIndex: -1,
  theme: 'dark',
};

export const useEditorStore = create<EditorStore>()(
  persist(
    (set, get) => {
      // Initialize activeFrameId
      const firstFrame = createInitialFrame();
      initialState.frames = [firstFrame];
      initialState.activeFrameId = firstFrame.id;

      return {
        ...initialState,

        // Canvas
        setCanvasSize: (size) => set({ canvasSize: size }),
        setZoom: (zoom) => set({ zoom: Math.max(1, Math.min(32, zoom)) }),
        toggleGrid: () => set((state) => ({ showGrid: !state.showGrid })),

        // Tools
        setTool: (tool) => set({ activeTool: tool }),
        setSymmetryMode: (mode) => set({ symmetryMode: mode }),

        // Drawing
        setPixel: (x, y, color) => {
          const state = get();
          const frame = state.frames.find((f) => f.id === state.activeFrameId);
          if (!frame) return;

          const newPixels = clonePixelMap(frame.pixels);
          const { symmetryMode, canvasSize } = state;

          // Set the main pixel
          newPixels.set(pixelKey(x, y), color);

          // Handle symmetry
          if (symmetryMode === 'horizontal' || symmetryMode === 'both') {
            const mirrorX = canvasSize - 1 - x;
            newPixels.set(pixelKey(mirrorX, y), color);
          }
          if (symmetryMode === 'vertical' || symmetryMode === 'both') {
            const mirrorY = canvasSize - 1 - y;
            newPixels.set(pixelKey(x, mirrorY), color);
          }
          if (symmetryMode === 'both') {
            const mirrorX = canvasSize - 1 - x;
            const mirrorY = canvasSize - 1 - y;
            newPixels.set(pixelKey(mirrorX, mirrorY), color);
          }

          set({
            frames: state.frames.map((f) =>
              f.id === state.activeFrameId ? { ...f, pixels: newPixels } : f
            ),
          });
        },

        erasePixel: (x, y) => {
          const state = get();
          const frame = state.frames.find((f) => f.id === state.activeFrameId);
          if (!frame) return;

          const newPixels = clonePixelMap(frame.pixels);
          const { symmetryMode, canvasSize } = state;

          newPixels.delete(pixelKey(x, y));

          if (symmetryMode === 'horizontal' || symmetryMode === 'both') {
            newPixels.delete(pixelKey(canvasSize - 1 - x, y));
          }
          if (symmetryMode === 'vertical' || symmetryMode === 'both') {
            newPixels.delete(pixelKey(x, canvasSize - 1 - y));
          }
          if (symmetryMode === 'both') {
            newPixels.delete(pixelKey(canvasSize - 1 - x, canvasSize - 1 - y));
          }

          set({
            frames: state.frames.map((f) =>
              f.id === state.activeFrameId ? { ...f, pixels: newPixels } : f
            ),
          });
        },

        fill: (startX, startY, fillColor) => {
          const state = get();
          const frame = state.frames.find((f) => f.id === state.activeFrameId);
          if (!frame) return;

          const { canvasSize } = state;
          const targetColor = frame.pixels.get(pixelKey(startX, startY));

          // Don't fill if clicking on same color
          if (targetColor === fillColor) return;

          const newPixels = clonePixelMap(frame.pixels);
          const visited = new Set<string>();
          const stack: [number, number][] = [[startX, startY]];

          while (stack.length > 0) {
            const [x, y] = stack.pop()!;
            const key = pixelKey(x, y);

            if (
              x < 0 || x >= canvasSize ||
              y < 0 || y >= canvasSize ||
              visited.has(key)
            ) {
              continue;
            }

            const currentColor = newPixels.get(key);
            if (currentColor !== targetColor) continue;

            visited.add(key);
            newPixels.set(key, fillColor);

            stack.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]);
          }

          set({
            frames: state.frames.map((f) =>
              f.id === state.activeFrameId ? { ...f, pixels: newPixels } : f
            ),
          });
        },

        drawLine: (x1, y1, x2, y2, color) => {
          const state = get();
          const frame = state.frames.find((f) => f.id === state.activeFrameId);
          if (!frame) return;

          const newPixels = clonePixelMap(frame.pixels);

          // Bresenham's line algorithm
          const dx = Math.abs(x2 - x1);
          const dy = Math.abs(y2 - y1);
          const sx = x1 < x2 ? 1 : -1;
          const sy = y1 < y2 ? 1 : -1;
          let err = dx - dy;

          let x = x1;
          let y = y1;

          while (true) {
            newPixels.set(pixelKey(x, y), color);

            if (x === x2 && y === y2) break;

            const e2 = 2 * err;
            if (e2 > -dy) {
              err -= dy;
              x += sx;
            }
            if (e2 < dx) {
              err += dx;
              y += sy;
            }
          }

          set({
            frames: state.frames.map((f) =>
              f.id === state.activeFrameId ? { ...f, pixels: newPixels } : f
            ),
          });
        },

        drawRectangle: (x1, y1, x2, y2, color, filled = false) => {
          const state = get();
          const frame = state.frames.find((f) => f.id === state.activeFrameId);
          if (!frame) return;

          const newPixels = clonePixelMap(frame.pixels);

          const minX = Math.min(x1, x2);
          const maxX = Math.max(x1, x2);
          const minY = Math.min(y1, y2);
          const maxY = Math.max(y1, y2);

          for (let x = minX; x <= maxX; x++) {
            for (let y = minY; y <= maxY; y++) {
              if (filled || x === minX || x === maxX || y === minY || y === maxY) {
                newPixels.set(pixelKey(x, y), color);
              }
            }
          }

          set({
            frames: state.frames.map((f) =>
              f.id === state.activeFrameId ? { ...f, pixels: newPixels } : f
            ),
          });
        },

        clearCanvas: () => {
          const state = get();
          set({
            frames: state.frames.map((f) =>
              f.id === state.activeFrameId ? { ...f, pixels: new Map() } : f
            ),
          });
        },

        getPixelColor: (x, y) => {
          const state = get();
          const frame = state.frames.find((f) => f.id === state.activeFrameId);
          return frame?.pixels.get(pixelKey(x, y));
        },

        // Colors
        setPrimaryColor: (color) => set({ primaryColor: color }),
        setSecondaryColor: (color) => set({ secondaryColor: color }),
        swapColors: () =>
          set((state) => ({
            primaryColor: state.secondaryColor,
            secondaryColor: state.primaryColor,
          })),
        setPalette: (name) =>
          set({
            paletteName: name,
            palette: [...retroPalettes[name].colors],
          }),

        // Animation
        addFrame: () => {
          const newFrame = createInitialFrame();
          set((state) => ({
            frames: [...state.frames, newFrame],
            activeFrameId: newFrame.id,
          }));
        },

        deleteFrame: (id) => {
          const state = get();
          if (state.frames.length <= 1) return;

          const index = state.frames.findIndex((f) => f.id === id);
          const newFrames = state.frames.filter((f) => f.id !== id);
          const newActiveId =
            state.activeFrameId === id
              ? newFrames[Math.min(index, newFrames.length - 1)].id
              : state.activeFrameId;

          set({ frames: newFrames, activeFrameId: newActiveId });
        },

        selectFrame: (id) => set({ activeFrameId: id }),

        duplicateFrame: (id) => {
          const state = get();
          const frame = state.frames.find((f) => f.id === id);
          if (!frame) return;

          const newFrame: Frame = {
            id: nanoid(),
            pixels: clonePixelMap(frame.pixels),
          };

          const index = state.frames.findIndex((f) => f.id === id);
          const newFrames = [...state.frames];
          newFrames.splice(index + 1, 0, newFrame);

          set({ frames: newFrames, activeFrameId: newFrame.id });
        },

        reorderFrames: (fromIndex, toIndex) => {
          set((state) => {
            const newFrames = [...state.frames];
            const [removed] = newFrames.splice(fromIndex, 1);
            newFrames.splice(toIndex, 0, removed);
            return { frames: newFrames };
          });
        },

        play: () => set({ isPlaying: true }),
        pause: () => set({ isPlaying: false }),
        setFps: (fps) => set({ fps: Math.max(1, Math.min(60, fps)) }),

        nextFrame: () => {
          const state = get();
          const currentIndex = state.frames.findIndex(
            (f) => f.id === state.activeFrameId
          );
          const nextIndex = (currentIndex + 1) % state.frames.length;
          set({ activeFrameId: state.frames[nextIndex].id });
        },

        // History
        saveToHistory: () => {
          const state = get();
          const frame = state.frames.find((f) => f.id === state.activeFrameId);
          if (!frame) return;

          const entry: HistoryEntry = {
            frameId: state.activeFrameId,
            pixels: clonePixelMap(frame.pixels),
          };

          const newHistory = state.history.slice(0, state.historyIndex + 1);
          newHistory.push(entry);

          // Limit history size
          if (newHistory.length > MAX_HISTORY) {
            newHistory.shift();
          }

          set({
            history: newHistory,
            historyIndex: newHistory.length - 1,
          });
        },

        undo: () => {
          const state = get();
          if (state.historyIndex <= 0) return;

          const newIndex = state.historyIndex - 1;
          const entry = state.history[newIndex];

          set({
            historyIndex: newIndex,
            activeFrameId: entry.frameId,
            frames: state.frames.map((f) =>
              f.id === entry.frameId
                ? { ...f, pixels: clonePixelMap(entry.pixels) }
                : f
            ),
          });
        },

        redo: () => {
          const state = get();
          if (state.historyIndex >= state.history.length - 1) return;

          const newIndex = state.historyIndex + 1;
          const entry = state.history[newIndex];

          set({
            historyIndex: newIndex,
            activeFrameId: entry.frameId,
            frames: state.frames.map((f) =>
              f.id === entry.frameId
                ? { ...f, pixels: clonePixelMap(entry.pixels) }
                : f
            ),
          });
        },

        canUndo: () => get().historyIndex > 0,
        canRedo: () => get().historyIndex < get().history.length - 1,

        // Export helpers
        getActiveFrame: () => {
          const state = get();
          return state.frames.find((f) => f.id === state.activeFrameId);
        },

        getAllPixels: () => {
          const frame = get().getActiveFrame();
          return frame ? clonePixelMap(frame.pixels) : new Map();
        },

        // UI
        toggleTheme: () =>
          set((state) => ({
            theme: state.theme === 'dark' ? 'light' : 'dark',
          })),

        // Reset
        resetEditor: () => {
          const newFrame = createInitialFrame();
          set({
            ...initialState,
            frames: [newFrame],
            activeFrameId: newFrame.id,
          });
        },

        // Load demo/external frames
        loadFrames: (frames) => {
          if (frames.length === 0) return;
          set({
            frames,
            activeFrameId: frames[0].id,
            history: [],
            historyIndex: -1,
          });
        },
      };
    },
    {
      name: 'pixel-editor-storage',
      partialize: (state) => ({
        canvasSize: state.canvasSize,
        showGrid: state.showGrid,
        paletteName: state.paletteName,
        fps: state.fps,
        theme: state.theme,
        // Don't persist frames/history to avoid localStorage bloat
      }),
    }
  )
);
