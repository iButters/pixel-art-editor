import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ToolButton } from './ToolButton';
import type { Tool } from '../../../types';

const meta: Meta<typeof ToolButton> = {
  title: 'Molecules/ToolButton',
  component: ToolButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    tool: 'pencil',
    icon: 'pencil',
    label: 'Pencil',
    shortcut: 'P',
    active: false,
    onSelect: () => {},
  },
};

export const Active: Story = {
  args: {
    tool: 'pencil',
    icon: 'pencil',
    label: 'Pencil',
    shortcut: 'P',
    active: true,
    onSelect: () => {},
  },
};

export const ToolbarExample: Story = {
  render: () => {
    const [activeTool, setActiveTool] = useState<Tool>('pencil');

    const tools: { tool: Tool; icon: any; label: string; shortcut: string }[] = [
      { tool: 'pencil', icon: 'pencil', label: 'Pencil', shortcut: 'P' },
      { tool: 'eraser', icon: 'eraser', label: 'Eraser', shortcut: 'E' },
      { tool: 'fill', icon: 'fill', label: 'Fill', shortcut: 'F' },
      { tool: 'picker', icon: 'picker', label: 'Color Picker', shortcut: 'I' },
      { tool: 'line', icon: 'line', label: 'Line', shortcut: 'L' },
      { tool: 'rectangle', icon: 'rectangle', label: 'Rectangle', shortcut: 'R' },
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {tools.map((t) => (
          <ToolButton
            key={t.tool}
            tool={t.tool}
            icon={t.icon}
            label={t.label}
            shortcut={t.shortcut}
            active={activeTool === t.tool}
            onSelect={setActiveTool}
          />
        ))}
      </div>
    );
  },
};
