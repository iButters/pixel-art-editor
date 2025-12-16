// Editor Types

export type Tool = 'pencil' | 'eraser' | 'fill' | 'picker' | 'line' | 'rectangle';

export type SymmetryMode = 'none' | 'horizontal' | 'vertical' | 'both';

export type CanvasSize = 16 | 32 | 64;

export interface Pixel {
  x: number;
  y: number;
  color: string;
}

export interface Frame {
  id: string;
  pixels: Map<string, string>; // "x,y" -> color
}

export interface Point {
  x: number;
  y: number;
}

export interface HistoryEntry {
  frameId: string;
  pixels: Map<string, string>;
}

// Palette types
export interface Palette {
  name: string;
  colors: string[];
}

// Export types
export type ExportScale = 1 | 2 | 4 | 8 | 16;

export interface ExportOptions {
  scale: ExportScale;
  includeBackground: boolean;
}
