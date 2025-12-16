import type { Meta, StoryObj } from '@storybook/react';
import { useEffect } from 'react';
import { ColorPanel } from './ColorPanel';
import { useEditorStore } from '../../../store';

const meta: Meta<typeof ColorPanel> = {
  title: 'Organisms/ColorPanel',
  component: ColorPanel,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Right sidebar panel for color management. Contains primary/secondary color pickers, palette selector, and palette color swatches.',
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
          minWidth: '200px',
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
  render: () => <ColorPanel />,
};

export const GameBoyPalette: Story = {
  render: function Render() {
    useEffect(() => {
      useEditorStore.getState().setPalette('gameboy');
    }, []);

    return <ColorPanel />;
  },
};

export const Pico8Palette: Story = {
  render: function Render() {
    useEffect(() => {
      useEditorStore.getState().setPalette('pico8');
    }, []);

    return <ColorPanel />;
  },
};

export const NESPalette: Story = {
  render: function Render() {
    useEffect(() => {
      useEditorStore.getState().setPalette('nes');
    }, []);

    return <ColorPanel />;
  },
};

export const C64Palette: Story = {
  render: function Render() {
    useEffect(() => {
      useEditorStore.getState().setPalette('c64');
    }, []);

    return <ColorPanel />;
  },
};

export const CGAPalette: Story = {
  render: function Render() {
    useEffect(() => {
      useEditorStore.getState().setPalette('cga');
    }, []);

    return <ColorPanel />;
  },
};

export const CustomColors: Story = {
  render: function Render() {
    useEffect(() => {
      const store = useEditorStore.getState();
      store.setPrimaryColor('#ff0000');
      store.setSecondaryColor('#0000ff');
    }, []);

    return <ColorPanel />;
  },
};
