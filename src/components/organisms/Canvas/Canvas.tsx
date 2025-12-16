import { type FC, useRef, useEffect, useState, useCallback } from 'react';
import { useEditorStore } from '../../../store';
import styles from './Canvas.module.css';

interface Point {
  x: number;
  y: number;
}

export const Canvas: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPoint, setStartPoint] = useState<Point | null>(null);
  const [lastPoint, setLastPoint] = useState<Point | null>(null);

  const {
    canvasSize,
    zoom,
    showGrid,
    activeTool,
    primaryColor,
    secondaryColor,
    frames,
    activeFrameId,
    symmetryMode,
    setPixel,
    erasePixel,
    fill,
    drawLine,
    drawRectangle,
    setPrimaryColor,
    saveToHistory,
  } = useEditorStore();

  const activeFrame = frames.find((f) => f.id === activeFrameId);
  const pixelSize = zoom;
  const canvasPxSize = canvasSize * pixelSize;

  // Get mouse position in pixel coordinates
  const getPixelCoords = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>): Point | null => {
      const canvas = canvasRef.current;
      if (!canvas) return null;

      const rect = canvas.getBoundingClientRect();
      const x = Math.floor((e.clientX - rect.left) / pixelSize);
      const y = Math.floor((e.clientY - rect.top) / pixelSize);

      if (x < 0 || x >= canvasSize || y < 0 || y >= canvasSize) {
        return null;
      }

      return { x, y };
    },
    [pixelSize, canvasSize]
  );

  // Draw the canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !activeFrame) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvasPxSize, canvasPxSize);

    // Draw checkerboard background
    const checkSize = Math.max(pixelSize / 2, 4);
    for (let x = 0; x < canvasPxSize; x += checkSize) {
      for (let y = 0; y < canvasPxSize; y += checkSize) {
        const isEven = ((x + y) / checkSize) % 2 === 0;
        ctx.fillStyle = isEven ? '#2a2a2a' : '#3a3a3a';
        ctx.fillRect(x, y, checkSize, checkSize);
      }
    }

    // Draw pixels
    activeFrame.pixels.forEach((color, key) => {
      const [px, py] = key.split(',').map(Number);
      ctx.fillStyle = color;
      ctx.fillRect(px * pixelSize, py * pixelSize, pixelSize, pixelSize);
    });

    // Draw grid
    if (showGrid && pixelSize >= 4) {
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 1;

      for (let i = 0; i <= canvasSize; i++) {
        const pos = i * pixelSize;
        ctx.beginPath();
        ctx.moveTo(pos, 0);
        ctx.lineTo(pos, canvasPxSize);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, pos);
        ctx.lineTo(canvasPxSize, pos);
        ctx.stroke();
      }
    }

    // Draw symmetry guides
    if (symmetryMode !== 'none') {
      ctx.strokeStyle = 'rgba(155, 188, 15, 0.5)';
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 4]);

      const center = canvasPxSize / 2;

      if (symmetryMode === 'horizontal' || symmetryMode === 'both') {
        ctx.beginPath();
        ctx.moveTo(center, 0);
        ctx.lineTo(center, canvasPxSize);
        ctx.stroke();
      }

      if (symmetryMode === 'vertical' || symmetryMode === 'both') {
        ctx.beginPath();
        ctx.moveTo(0, center);
        ctx.lineTo(canvasPxSize, center);
        ctx.stroke();
      }

      ctx.setLineDash([]);
    }
  }, [activeFrame, canvasSize, pixelSize, canvasPxSize, showGrid, symmetryMode]);

  // Handle drawing
  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const point = getPixelCoords(e);
      if (!point) return;

      const color = e.button === 2 ? secondaryColor : primaryColor;

      setIsDrawing(true);
      setStartPoint(point);
      setLastPoint(point);
      saveToHistory();

      switch (activeTool) {
        case 'pencil':
          setPixel(point.x, point.y, color);
          break;
        case 'eraser':
          erasePixel(point.x, point.y);
          break;
        case 'fill':
          fill(point.x, point.y, color);
          break;
        case 'picker':
          const pickedColor = activeFrame?.pixels.get(`${point.x},${point.y}`);
          if (pickedColor) {
            setPrimaryColor(pickedColor);
          }
          break;
        case 'line':
        case 'rectangle':
          // These tools need a start and end point
          break;
      }
    },
    [
      getPixelCoords,
      activeTool,
      primaryColor,
      secondaryColor,
      setPixel,
      erasePixel,
      fill,
      setPrimaryColor,
      activeFrame,
      saveToHistory,
    ]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const point = getPixelCoords(e);
      if (!point || !isDrawing) return;

      const color = e.buttons === 2 ? secondaryColor : primaryColor;

      switch (activeTool) {
        case 'pencil':
          // Draw line from last point to current point for smooth drawing
          if (lastPoint) {
            const dx = Math.abs(point.x - lastPoint.x);
            const dy = Math.abs(point.y - lastPoint.y);
            const sx = lastPoint.x < point.x ? 1 : -1;
            const sy = lastPoint.y < point.y ? 1 : -1;
            let err = dx - dy;
            let x = lastPoint.x;
            let y = lastPoint.y;

            while (true) {
              setPixel(x, y, color);
              if (x === point.x && y === point.y) break;
              const e2 = 2 * err;
              if (e2 > -dy) {
                err -= dy;
                x += sx;
              }
              if (e2 < dx) {
                err += dx;
                y += sy;
              }
            }
          }
          setPixel(point.x, point.y, color);
          break;
        case 'eraser':
          erasePixel(point.x, point.y);
          break;
      }

      setLastPoint(point);
    },
    [getPixelCoords, isDrawing, activeTool, primaryColor, secondaryColor, setPixel, erasePixel, lastPoint]
  );

  const handleMouseUp = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const point = getPixelCoords(e);

      if (startPoint && point) {
        const color = e.button === 2 ? secondaryColor : primaryColor;

        switch (activeTool) {
          case 'line':
            drawLine(startPoint.x, startPoint.y, point.x, point.y, color);
            break;
          case 'rectangle':
            drawRectangle(startPoint.x, startPoint.y, point.x, point.y, color, e.shiftKey);
            break;
        }
      }

      setIsDrawing(false);
      setStartPoint(null);
      setLastPoint(null);
    },
    [getPixelCoords, startPoint, activeTool, primaryColor, secondaryColor, drawLine, drawRectangle]
  );

  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
  }, []);

  return (
    <div ref={containerRef} className={styles.container}>
      <canvas
        ref={canvasRef}
        width={canvasPxSize}
        height={canvasPxSize}
        className={styles.canvas}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={() => {
          setIsDrawing(false);
          setLastPoint(null);
        }}
        onContextMenu={handleContextMenu}
      />
    </div>
  );
};
