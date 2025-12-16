import type { Meta, StoryObj } from '@storybook/react';
import { FramePreview } from './FramePreview';
import type { Frame } from '../../../types';

const meta: Meta<typeof FramePreview> = {
  title: 'Molecules/FramePreview',
  component: FramePreview,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Create a sample frame with some pixels
const createSampleFrame = (): Frame => {
  const pixels = new Map<string, string>();
  // Draw a simple smiley
  const color = '#9bbc0f';
  // Eyes
  pixels.set('10,10', color);
  pixels.set('21,10', color);
  // Mouth
  for (let x = 10; x <= 21; x++) {
    pixels.set(`${x},20`, color);
  }
  pixels.set('9,19', color);
  pixels.set('22,19', color);

  return {
    id: 'frame-1',
    pixels,
  };
};

const emptyFrame: Frame = {
  id: 'frame-empty',
  pixels: new Map(),
};

export const Default: Story = {
  args: {
    frame: createSampleFrame(),
    index: 0,
    canvasSize: 32,
    active: false,
    onSelect: () => {},
    onDelete: () => {},
    onDuplicate: () => {},
    canDelete: true,
  },
};

export const Active: Story = {
  args: {
    ...Default.args,
    active: true,
  },
};

export const Empty: Story = {
  args: {
    ...Default.args,
    frame: emptyFrame,
  },
};

export const CannotDelete: Story = {
  args: {
    ...Default.args,
    canDelete: false,
  },
};

export const Timeline: Story = {
  render: () => {
    const frames = [createSampleFrame(), emptyFrame, createSampleFrame()];

    return (
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        {frames.map((frame, i) => (
          <FramePreview
            key={frame.id + i}
            frame={frame}
            index={i}
            canvasSize={32}
            active={i === 0}
            onSelect={() => {}}
            onDelete={() => {}}
            onDuplicate={() => {}}
            canDelete={frames.length > 1}
          />
        ))}
      </div>
    );
  },
};
