import type { Meta, StoryObj } from '@storybook/react';
import { useEffect } from 'react';
import { Toolbar } from './Toolbar';
import { useEditorStore } from '../../../store';

const meta: Meta<typeof Toolbar> = {
  title: 'Organisms/Toolbar',
  component: Toolbar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Left sidebar toolbar containing drawing tools and symmetry mode controls. Tools include pencil, eraser, fill bucket, color picker, line, and rectangle.',
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
  render: () => <Toolbar />,
};

export const PencilSelected: Story = {
  render: function Render() {
    useEffect(() => {
      useEditorStore.getState().setTool('pencil');
    }, []);

    return <Toolbar />;
  },
};

export const EraserSelected: Story = {
  render: function Render() {
    useEffect(() => {
      useEditorStore.getState().setTool('eraser');
    }, []);

    return <Toolbar />;
  },
};

export const FillSelected: Story = {
  render: function Render() {
    useEffect(() => {
      useEditorStore.getState().setTool('fill');
    }, []);

    return <Toolbar />;
  },
};

export const LineSelected: Story = {
  render: function Render() {
    useEffect(() => {
      useEditorStore.getState().setTool('line');
    }, []);

    return <Toolbar />;
  },
};

export const HorizontalSymmetryMode: Story = {
  render: function Render() {
    useEffect(() => {
      useEditorStore.getState().setSymmetryMode('horizontal');
    }, []);

    return <Toolbar />;
  },
};

export const BothSymmetryMode: Story = {
  render: function Render() {
    useEffect(() => {
      useEditorStore.getState().setSymmetryMode('both');
    }, []);

    return <Toolbar />;
  },
};
