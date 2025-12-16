import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ColorPicker } from './ColorPicker';

const meta: Meta<typeof ColorPicker> = {
  title: 'Molecules/ColorPicker',
  component: ColorPicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [color, setColor] = useState('#9bbc0f');
    return <ColorPicker color={color} onChange={setColor} />;
  },
};

export const WithLabel: Story = {
  render: () => {
    const [color, setColor] = useState('#0f380f');
    return <ColorPicker color={color} onChange={setColor} label="Primary" />;
  },
};

export const PrimaryAndSecondary: Story = {
  render: () => {
    const [primary, setPrimary] = useState('#0f380f');
    const [secondary, setSecondary] = useState('#9bbc0f');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <ColorPicker color={primary} onChange={setPrimary} label="Primary" />
        <ColorPicker color={secondary} onChange={setSecondary} label="Secondary" />
      </div>
    );
  },
};
