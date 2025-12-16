import type { Meta, StoryObj } from '@storybook/react';
import { IconButton } from './IconButton';

const meta: Meta<typeof IconButton> = {
  title: 'Atoms/IconButton',
  component: IconButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    icon: {
      control: 'select',
      options: ['pencil', 'eraser', 'fill', 'picker', 'line', 'rectangle', 'undo', 'redo'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    variant: {
      control: 'select',
      options: ['default', 'ghost'],
    },
    active: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: 'pencil',
    'aria-label': 'Pencil tool',
  },
};

export const Active: Story = {
  args: {
    icon: 'pencil',
    active: true,
    'aria-label': 'Pencil tool (active)',
  },
};

export const Ghost: Story = {
  args: {
    icon: 'grid',
    variant: 'ghost',
    'aria-label': 'Toggle grid',
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <IconButton icon="pencil" size="sm" aria-label="Small" />
      <IconButton icon="pencil" size="md" aria-label="Medium" />
      <IconButton icon="pencil" size="lg" aria-label="Large" />
    </div>
  ),
};

export const ToolbarExample: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.5rem' }}>
      <IconButton icon="pencil" active aria-label="Pencil" />
      <IconButton icon="eraser" aria-label="Eraser" />
      <IconButton icon="fill" aria-label="Fill" />
      <IconButton icon="picker" aria-label="Color picker" />
      <IconButton icon="line" aria-label="Line" />
      <IconButton icon="rectangle" aria-label="Rectangle" />
    </div>
  ),
};
