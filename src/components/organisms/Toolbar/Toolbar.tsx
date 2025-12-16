import { type FC } from 'react';
import { useEditorStore } from '../../../store';
import { ToolButton } from '../../molecules';
import { IconButton, Tooltip, Text } from '../../atoms';
import type { Tool, SymmetryMode } from '../../../types';
import type { IconName } from '../../atoms';
import styles from './Toolbar.module.css';

interface ToolConfig {
  tool: Tool;
  icon: IconName;
  label: string;
  shortcut: string;
}

const tools: ToolConfig[] = [
  { tool: 'pencil', icon: 'pencil', label: 'Pencil', shortcut: 'P' },
  { tool: 'eraser', icon: 'eraser', label: 'Eraser', shortcut: 'E' },
  { tool: 'fill', icon: 'fill', label: 'Fill Bucket', shortcut: 'F' },
  { tool: 'picker', icon: 'picker', label: 'Color Picker', shortcut: 'I' },
  { tool: 'line', icon: 'line', label: 'Line', shortcut: 'L' },
  { tool: 'rectangle', icon: 'rectangle', label: 'Rectangle', shortcut: 'R' },
];

interface SymmetryConfig {
  mode: SymmetryMode;
  icon: IconName;
  label: string;
}

const symmetryModes: SymmetryConfig[] = [
  { mode: 'none', icon: 'grid', label: 'No Symmetry' },
  { mode: 'horizontal', icon: 'symmetryH', label: 'Horizontal Symmetry' },
  { mode: 'vertical', icon: 'symmetryV', label: 'Vertical Symmetry' },
  { mode: 'both', icon: 'symmetryBoth', label: 'Both Axes' },
];

export const Toolbar: FC = () => {
  const { activeTool, setTool, symmetryMode, setSymmetryMode } = useEditorStore();

  return (
    <div className={styles.toolbar}>
      <div className={styles.section}>
        <Text variant="label" className={styles.sectionTitle}>
          Tools
        </Text>
        <div className={styles.tools}>
          {tools.map((tool) => (
            <ToolButton
              key={tool.tool}
              tool={tool.tool}
              icon={tool.icon}
              label={tool.label}
              shortcut={tool.shortcut}
              active={activeTool === tool.tool}
              onSelect={setTool}
            />
          ))}
        </div>
      </div>

      <div className={styles.divider} />

      <div className={styles.section}>
        <Text variant="label" className={styles.sectionTitle}>
          Symmetry
        </Text>
        <div className={styles.tools}>
          {symmetryModes.map((sym) => (
            <Tooltip key={sym.mode} content={sym.label} position="right">
              <IconButton
                icon={sym.icon}
                active={symmetryMode === sym.mode}
                onClick={() => setSymmetryMode(sym.mode)}
                aria-label={sym.label}
                aria-pressed={symmetryMode === sym.mode}
              />
            </Tooltip>
          ))}
        </div>
      </div>
    </div>
  );
};
