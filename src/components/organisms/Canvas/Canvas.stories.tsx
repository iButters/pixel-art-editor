import type { Meta, StoryObj } from '@storybook/react';
import { useEffect } from 'react';
import { Canvas } from './Canvas';
import { useEditorStore } from '../../../store';

const meta: Meta<typeof Canvas> = {
  title: 'Organisms/Canvas',
  component: Canvas,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'The main drawing canvas for pixel art. Supports various drawing tools, symmetry modes, and mouse interactions.',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => {
      // Reset store to default state before each story
      useEffect(() => {
        useEditorStore.getState().resetEditor();
      }, []);

      return (
        <div style={{
          padding: 'var(--space-4)',
          background: 'var(--color-background)',
          borderRadius: 'var(--radius-md)',
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
  render: () => <Canvas />,
};

export const WithGrid: Story = {
  render: function Render() {
    useEffect(() => {
      const store = useEditorStore.getState();
      store.setZoom(16);
      if (!store.showGrid) store.toggleGrid();
    }, []);

    return <Canvas />;
  },
};

export const WithoutGrid: Story = {
  render: function Render() {
    useEffect(() => {
      const store = useEditorStore.getState();
      store.setZoom(16);
      if (store.showGrid) store.toggleGrid();
    }, []);

    return <Canvas />;
  },
};

export const SmallCanvas: Story = {
  render: function Render() {
    useEffect(() => {
      useEditorStore.getState().setCanvasSize(16);
      useEditorStore.getState().setZoom(16);
    }, []);

    return <Canvas />;
  },
};

export const LargeCanvas: Story = {
  render: function Render() {
    useEffect(() => {
      useEditorStore.getState().setCanvasSize(64);
      useEditorStore.getState().setZoom(8);
    }, []);

    return <Canvas />;
  },
};

export const HorizontalSymmetry: Story = {
  render: function Render() {
    useEffect(() => {
      useEditorStore.getState().setSymmetryMode('horizontal');
      useEditorStore.getState().setZoom(12);
    }, []);

    return <Canvas />;
  },
};

export const VerticalSymmetry: Story = {
  render: function Render() {
    useEffect(() => {
      useEditorStore.getState().setSymmetryMode('vertical');
      useEditorStore.getState().setZoom(12);
    }, []);

    return <Canvas />;
  },
};

export const BothSymmetry: Story = {
  render: function Render() {
    useEffect(() => {
      useEditorStore.getState().setSymmetryMode('both');
      useEditorStore.getState().setZoom(12);
    }, []);

    return <Canvas />;
  },
};

export const WithPixels: Story = {
  render: function Render() {
    useEffect(() => {
      const store = useEditorStore.getState();
      store.setZoom(12);
      store.setCanvasSize(16);

      // Draw a simple smiley face
      const primaryColor = '#9bbc0f';
      store.setPixel(4, 4, primaryColor);
      store.setPixel(11, 4, primaryColor);
      store.setPixel(3, 10, primaryColor);
      store.setPixel(4, 11, primaryColor);
      store.setPixel(5, 11, primaryColor);
      store.setPixel(10, 11, primaryColor);
      store.setPixel(11, 11, primaryColor);
      store.setPixel(12, 10, primaryColor);
    }, []);

    return <Canvas />;
  },
};
