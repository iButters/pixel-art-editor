import type { Meta, StoryObj } from '@storybook/react';
import { ColorSwatch } from './ColorSwatch';

const meta: Meta<typeof ColorSwatch> = {
  title: 'Atoms/ColorSwatch',
  component: ColorSwatch,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'color',
      description: 'The color to display in the swatch (hex, rgb, or hsl)',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Swatch size: sm (20px), md (28px), lg (36px)',
    },
    active: {
      control: 'boolean',
      description: 'Whether the swatch is selected/active (shows border highlight)',
    },
    showBorder: {
      control: 'boolean',
      description: 'Whether to show a border around the swatch',
    },
    onClick: {
      action: 'clicked',
      description: 'Click event handler for color selection',
    },
    onContextMenu: {
      action: 'contextMenu',
      description: 'Right-click event handler (e.g., for secondary color)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    color: '#9bbc0f',
  },
};

export const Active: Story = {
  args: {
    color: '#9bbc0f',
    active: true,
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <ColorSwatch color="#9bbc0f" size="sm" />
      <ColorSwatch color="#9bbc0f" size="md" />
      <ColorSwatch color="#9bbc0f" size="lg" />
    </div>
  ),
};

export const GameBoyPalette: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.5rem' }}>
      <ColorSwatch color="#0f380f" active />
      <ColorSwatch color="#306230" />
      <ColorSwatch color="#8bac0f" />
      <ColorSwatch color="#9bbc0f" />
    </div>
  ),
};

export const Pico8Palette: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem' }}>
      <ColorSwatch color="#000000" />
      <ColorSwatch color="#1d2b53" />
      <ColorSwatch color="#7e2553" />
      <ColorSwatch color="#008751" />
      <ColorSwatch color="#ab5236" />
      <ColorSwatch color="#5f574f" />
      <ColorSwatch color="#c2c3c7" />
      <ColorSwatch color="#fff1e8" />
      <ColorSwatch color="#ff004d" active />
      <ColorSwatch color="#ffa300" />
      <ColorSwatch color="#ffec27" />
      <ColorSwatch color="#00e436" />
      <ColorSwatch color="#29adff" />
      <ColorSwatch color="#83769c" />
      <ColorSwatch color="#ff77a8" />
      <ColorSwatch color="#ffccaa" />
    </div>
  ),
};
