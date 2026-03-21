import React, { useRef, useState, useEffect } from 'react';
import { CanvasState, CanvasElement, TextElement, ImageElement, ShapeElement } from '../types';

interface CanvasProps {
  state: CanvasState;
  selectedElementId: string | null;
  onSelectElement: (id: string | null) => void;
  onUpdateElement: (id: string, updates: Partial<CanvasElement>) => void;
  canvasRef: React.RefObject<HTMLDivElement | null>;
}

export const Canvas: React.FC<CanvasProps> = ({
  state,
  selectedElementId,
  onSelectElement,
  onUpdateElement,
  canvasRef
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [elementStart, setElementStart] = useState({ x: 0, y: 0 });

  // Calculate scale to fit canvas in view
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth - 40;
        const containerHeight = containerRef.current.clientHeight - 40;
        const scaleX = containerWidth / state.width;
        const scaleY = containerHeight / state.height;
        setScale(Math.min(scaleX, scaleY, 1));
      }
    };
    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, [state.width, state.height]);

  const handleMouseDown = (e: React.MouseEvent, element: CanvasElement) => {
    e.stopPropagation();
    onSelectElement(element.id);
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
    setElementStart({ x: element.x, y: element.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && selectedElementId) {
      const dx = (e.clientX - dragStart.x) / scale;
      const dy = (e.clientY - dragStart.y) / scale;
      onUpdateElement(selectedElementId, {
        x: elementStart.x + dx,
        y: elementStart.y + dy,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const renderElement = (el: CanvasElement) => {
    const isSelected = el.id === selectedElementId;
    const baseStyle: React.CSSProperties = {
      position: 'absolute',
      left: el.x,
      top: el.y,
      width: el.width,
      height: el.height,
      transform: `rotate(${el.rotation}deg)`,
      opacity: el.opacity,
      zIndex: el.zIndex,
      cursor: isDragging && isSelected ? 'grabbing' : 'grab',
      outline: isSelected ? '2px solid #3b82f6' : 'none',
      outlineOffset: '2px',
      userSelect: 'none',
    };

    if (el.type === 'text') {
      const textEl = el as TextElement;
      return (
        <div
          key={el.id}
          style={{
            ...baseStyle,
            fontSize: textEl.fontSize,
            fontFamily: textEl.fontFamily,
            fontWeight: textEl.fontWeight,
            color: textEl.color,
            textAlign: textEl.textAlign,
            lineHeight: textEl.lineHeight,
            letterSpacing: textEl.letterSpacing,
            textShadow: textEl.textShadow,
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
          }}
          onMouseDown={(e) => handleMouseDown(e, el)}
        >
          {textEl.text}
        </div>
      );
    }

    if (el.type === 'image') {
      const imgEl = el as ImageElement;
      return (
        <img
          key={el.id}
          src={imgEl.src}
          alt=""
          style={{
            ...baseStyle,
            objectFit: imgEl.objectFit,
            borderRadius: imgEl.borderRadius,
            pointerEvents: 'none', // Prevent native image drag
          }}
          onMouseDown={(e) => handleMouseDown(e, el)}
        />
      );
    }

    if (el.type === 'shape') {
      const shapeEl = el as ShapeElement;
      return (
        <div
          key={el.id}
          style={{
            ...baseStyle,
            backgroundColor: shapeEl.backgroundColor,
            borderRadius: shapeEl.shapeType === 'circle' ? '50%' : shapeEl.borderRadius,
          }}
          onMouseDown={(e) => handleMouseDown(e, el)}
        />
      );
    }

    return null;
  };

  const getBackgroundStyle = (): React.CSSProperties => {
    const bg = state.background;
    if (bg.type === 'color') return { backgroundColor: bg.value };
    if (bg.type === 'gradient') return { background: bg.value };
    if (bg.type === 'image') return { backgroundImage: `url(${bg.value})`, backgroundSize: 'cover', backgroundPosition: 'center' };
    return { backgroundColor: '#ffffff' };
  };

  return (
    <div 
      ref={containerRef}
      className="flex-1 bg-gray-100 flex items-center justify-center overflow-hidden relative"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onClick={() => onSelectElement(null)}
    >
      <div
        style={{
          width: state.width * scale,
          height: state.height * scale,
          position: 'relative',
        }}
      >
        <div
          ref={canvasRef}
          style={{
            width: state.width,
            height: state.height,
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
            ...getBackgroundStyle(),
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            position: 'absolute',
            top: 0,
            left: 0,
            overflow: 'hidden',
          }}
          className="transition-transform duration-200 ease-out"
        >
          {state.elements.sort((a, b) => a.zIndex - b.zIndex).map(renderElement)}
        </div>
      </div>
    </div>
  );
};
