import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ZoomControl } from './ZoomControl';

const meta: Meta<typeof ZoomControl> = {
  title: 'Molecules/ZoomControl',
  component: ZoomControl,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    zoom: {
      control: { type: 'number', min: 1, max: 32, step: 1 },
      description: 'Current zoom level (1-32x)',
    },
    onZoomIn: {
      action: 'zoomIn',
      description: 'Callback when zoom in button is clicked',
    },
    onZoomOut: {
      action: 'zoomOut',
      description: 'Callback when zoom out button is clicked',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [zoom, setZoom] = useState(8);
    return (
      <ZoomControl
        zoom={zoom}
        onZoomIn={() => setZoom(Math.min(32, zoom * 2))}
        onZoomOut={() => setZoom(Math.max(1, zoom / 2))}
      />
    );
  },
};

export const MinZoom: Story = {
  render: () => {
    const [zoom, setZoom] = useState(1);
    return (
      <ZoomControl
        zoom={zoom}
        onZoomIn={() => setZoom(Math.min(32, zoom * 2))}
        onZoomOut={() => setZoom(Math.max(1, zoom / 2))}
      />
    );
  },
};

export const MaxZoom: Story = {
  render: () => {
    const [zoom, setZoom] = useState(32);
    return (
      <ZoomControl
        zoom={zoom}
        onZoomIn={() => setZoom(Math.min(32, zoom * 2))}
        onZoomOut={() => setZoom(Math.max(1, zoom / 2))}
      />
    );
  },
};
