import { type FC, useEffect, useRef } from 'react';
import { useEditorStore } from '../../../store';
import { EditorLayout } from '../../templates/EditorLayout/EditorLayout';
import { TopBar, Toolbar, Canvas, ColorPanel, FrameTimeline } from '../../organisms';
import { createHeroWithAttackFrames } from '../../../data/heroSprite';

export const EditorPage: FC = () => {
  const { theme, undo, redo, swapColors, setTool, loadFrames, frames } = useEditorStore();
  const demoLoaded = useRef(false);

  // Load demo data on first mount with PICO-8 palette
  useEffect(() => {
    if (!demoLoaded.current && frames.length === 1 && frames[0].pixels.size === 0) {
      const demoFrames = createHeroWithAttackFrames();
      loadFrames(demoFrames);
      // Set PICO-8 palette for maximum color variety
      useEditorStore.getState().setPalette('pico8');
      demoLoaded.current = true;
    }
  }, [frames, loadFrames]);

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Global keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      // Undo/Redo
      if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
        e.preventDefault();
        if (e.shiftKey) {
          redo();
        } else {
          undo();
        }
        return;
      }

      if ((e.ctrlKey || e.metaKey) && e.key === 'y') {
        e.preventDefault();
        redo();
        return;
      }

      // Swap colors
      if (e.key.toLowerCase() === 'x') {
        swapColors();
        return;
      }

      // Tool shortcuts
      const toolShortcuts: Record<string, Parameters<typeof setTool>[0]> = {
        p: 'pencil',
        e: 'eraser',
        f: 'fill',
        i: 'picker',
        l: 'line',
        r: 'rectangle',
      };

      const tool = toolShortcuts[e.key.toLowerCase()];
      if (tool) {
        setTool(tool);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo, swapColors, setTool]);

  return (
    <EditorLayout
      topBar={<TopBar />}
      toolbar={<Toolbar />}
      canvas={<Canvas />}
      colorPanel={<ColorPanel />}
      timeline={<FrameTimeline />}
    />
  );
};
