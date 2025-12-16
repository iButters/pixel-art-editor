import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { PaletteSelector } from './PaletteSelector';
import type { PaletteName } from '../../../tokens';

const meta: Meta<typeof PaletteSelector> = {
  title: 'Molecules/PaletteSelector',
  component: PaletteSelector,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [palette, setPalette] = useState<PaletteName>('gameboy');
    return <PaletteSelector currentPalette={palette} onSelect={setPalette} />;
  },
};

export const Pico8Selected: Story = {
  render: () => {
    const [palette, setPalette] = useState<PaletteName>('pico8');
    return <PaletteSelector currentPalette={palette} onSelect={setPalette} />;
  },
};
