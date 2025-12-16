import { type FC } from 'react';
import { IconButton, Tooltip, type IconName } from '../../atoms';
import type { Tool } from '../../../types';

export interface ToolButtonProps {
  tool: Tool;
  icon: IconName;
  label: string;
  shortcut?: string;
  active: boolean;
  onSelect: (tool: Tool) => void;
}

export const ToolButton: FC<ToolButtonProps> = ({
  tool,
  icon,
  label,
  shortcut,
  active,
  onSelect,
}) => {
  const tooltipContent = shortcut ? `${label} (${shortcut})` : label;

  return (
    <Tooltip content={tooltipContent} position="right">
      <IconButton
        icon={icon}
        active={active}
        onClick={() => onSelect(tool)}
        aria-label={label}
        aria-pressed={active}
      />
    </Tooltip>
  );
};
