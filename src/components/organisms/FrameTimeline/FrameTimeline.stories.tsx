import type { Meta, StoryObj } from '@storybook/react';
import { useEffect } from 'react';
import { FrameTimeline } from './FrameTimeline';
import { useEditorStore } from '../../../store';

const meta: Meta<typeof FrameTimeline> = {
  title: 'Organisms/FrameTimeline',
  component: FrameTimeline,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Bottom timeline for animation frame management. Supports play/pause, FPS control, and frame operations (add, delete, duplicate).',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => {
      useEffect(() => {
        useEditorStore.getState().resetEditor();
      }, []);

      return (
        <div style={{
          background: 'var(--color-background)',
          padding: 'var(--space-2)',
          borderRadius: 'var(--radius-md)',
          minWidth: '500px',
        }}>
          <Story />
        </div>
      );
    },
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <FrameTimeline />,
};

export const SingleFrame: Story = {
  render: function Render() {
    useEffect(() => {
      useEditorStore.getState().resetEditor();
    }, []);

    return <FrameTimeline />;
  },
};

export const MultipleFrames: Story = {
  render: function Render() {
    useEffect(() => {
      const store = useEditorStore.getState();
      store.resetEditor();
      store.addFrame();
      store.addFrame();
      store.addFrame();
    }, []);

    return <FrameTimeline />;
  },
};

export const HighFPS: Story = {
  render: function Render() {
    useEffect(() => {
      useEditorStore.getState().setFps(24);
    }, []);

    return <FrameTimeline />;
  },
};

export const LowFPS: Story = {
  render: function Render() {
    useEffect(() => {
      useEditorStore.getState().setFps(4);
    }, []);

    return <FrameTimeline />;
  },
};

export const WithPixelArt: Story = {
  render: function Render() {
    useEffect(() => {
      const store = useEditorStore.getState();
      store.resetEditor();

      // Frame 1: Draw a simple pattern
      store.setPixel(2, 2, '#9bbc0f');
      store.setPixel(3, 3, '#9bbc0f');
      store.setPixel(4, 4, '#9bbc0f');

      // Add frame 2 with different pattern
      store.addFrame();
      store.setPixel(4, 2, '#8bac0f');
      store.setPixel(3, 3, '#8bac0f');
      store.setPixel(2, 4, '#8bac0f');

      // Select first frame
      const firstFrame = store.frames[0];
      if (firstFrame) {
        store.selectFrame(firstFrame.id);
      }
    }, []);

    return <FrameTimeline />;
  },
};
