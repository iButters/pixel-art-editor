import type { Meta, StoryObj } from '@storybook/react';
import { PixelIcon, type IconName } from './PixelIcon';

const meta: Meta<typeof PixelIcon> = {
  title: 'Atoms/PixelIcon',
  component: PixelIcon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'select',
      options: [
        'pencil', 'eraser', 'fill', 'picker', 'line', 'rectangle',
        'undo', 'redo', 'grid', 'symmetryH', 'symmetryV', 'symmetryBoth',
        'plus', 'minus', 'play', 'pause', 'trash', 'download', 'copy',
        'sun', 'moon', 'check',
      ],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'pencil',
    size: 'md',
  },
};

export const AllIcons: Story = {
  render: () => {
    const icons: IconName[] = [
      'pencil', 'eraser', 'fill', 'picker', 'line', 'rectangle',
      'undo', 'redo', 'grid', 'symmetryH', 'symmetryV', 'symmetryBoth',
      'plus', 'minus', 'play', 'pause', 'trash', 'download', 'copy',
      'sun', 'moon', 'check',
    ];

    return (
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(6, 1fr)',
        gap: '1.5rem',
        padding: '1rem',
      }}>
        {icons.map((name) => (
          <div
            key={name}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <PixelIcon name={name} size="lg" />
            <span style={{ fontSize: '10px', opacity: 0.7 }}>{name}</span>
          </div>
        ))}
      </div>
    );
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <PixelIcon name="pencil" size="sm" />
        <div style={{ fontSize: '10px', marginTop: '4px' }}>sm (12px)</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <PixelIcon name="pencil" size="md" />
        <div style={{ fontSize: '10px', marginTop: '4px' }}>md (16px)</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <PixelIcon name="pencil" size="lg" />
        <div style={{ fontSize: '10px', marginTop: '4px' }}>lg (24px)</div>
      </div>
    </div>
  ),
};

export const ToolIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <PixelIcon name="pencil" size="lg" />
      <PixelIcon name="eraser" size="lg" />
      <PixelIcon name="fill" size="lg" />
      <PixelIcon name="picker" size="lg" />
      <PixelIcon name="line" size="lg" />
      <PixelIcon name="rectangle" size="lg" />
    </div>
  ),
};
