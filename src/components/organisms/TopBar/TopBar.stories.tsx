import type { Meta, StoryObj } from '@storybook/react';
import { useEffect } from 'react';
import { TopBar } from './TopBar';
import { useEditorStore } from '../../../store';

const meta: Meta<typeof TopBar> = {
  title: 'Organisms/TopBar',
  component: TopBar,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Top navigation bar with canvas size selector, zoom controls, undo/redo, grid toggle, theme switch, and export options.',
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
          minWidth: '800px',
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
  render: () => <TopBar />,
};

export const SmallCanvas: Story = {
  render: function Render() {
    useEffect(() => {
      useEditorStore.getState().setCanvasSize(16);
    }, []);

    return <TopBar />;
  },
};

export const LargeCanvas: Story = {
  render: function Render() {
    useEffect(() => {
      useEditorStore.getState().setCanvasSize(64);
    }, []);

    return <TopBar />;
  },
};

export const ZoomedIn: Story = {
  render: function Render() {
    useEffect(() => {
      useEditorStore.getState().setZoom(16);
    }, []);

    return <TopBar />;
  },
};

export const ZoomedOut: Story = {
  render: function Render() {
    useEffect(() => {
      useEditorStore.getState().setZoom(4);
    }, []);

    return <TopBar />;
  },
};

export const GridDisabled: Story = {
  render: function Render() {
    useEffect(() => {
      const store = useEditorStore.getState();
      if (store.showGrid) store.toggleGrid();
    }, []);

    return <TopBar />;
  },
};

export const LightTheme: Story = {
  render: function Render() {
    useEffect(() => {
      const store = useEditorStore.getState();
      if (store.theme === 'dark') store.toggleTheme();
    }, []);

    return <TopBar />;
  },
};

export const WithHistory: Story = {
  render: function Render() {
    useEffect(() => {
      const store = useEditorStore.getState();
      store.saveToHistory();
      store.setPixel(5, 5, '#9bbc0f');
      store.saveToHistory();
      store.setPixel(6, 6, '#8bac0f');
      store.saveToHistory();
    }, []);

    return <TopBar />;
  },
};
