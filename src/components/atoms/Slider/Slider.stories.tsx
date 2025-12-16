import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Slider } from './Slider';

const meta: Meta<typeof Slider> = {
  title: 'Atoms/Slider',
  component: Slider,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '200px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState(50);
    return <Slider value={value} min={0} max={100} onChange={setValue} />;
  },
};

export const WithLabel: Story = {
  render: () => {
    const [value, setValue] = useState(12);
    return (
      <Slider
        value={value}
        min={1}
        max={30}
        onChange={setValue}
        label="FPS"
      />
    );
  },
};

export const ZoomControl: Story = {
  render: () => {
    const [value, setValue] = useState(4);
    return (
      <Slider
        value={value}
        min={1}
        max={32}
        onChange={setValue}
        label="Zoom"
      />
    );
  },
};

export const WithoutValue: Story = {
  render: () => {
    const [value, setValue] = useState(50);
    return (
      <Slider
        value={value}
        min={0}
        max={100}
        onChange={setValue}
        showValue={false}
      />
    );
  },
};
