import React, { useEffect, useRef, useState } from 'react';
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
  const [dragState, setDragState] = useState<{
    elementId: string;
    startX: number;
    startY: number;
    elementX: number;
    elementY: number;
    elementWidth: number;
    elementHeight: number;
    moved: boolean;
    type: 'move' | 'resize';
    handle?: string;
  } | null>(null);
  const [editingTextId, setEditingTextId] = useState<string | null>(null);

  // Calculate scale to fit canvas in view
  const containerRef = useRef<HTMLDivElement>(null);
  const editingRef = useRef<HTMLDivElement>(null);
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

  useEffect(() => {
    if (selectedElementId !== editingTextId) {
      setEditingTextId(null);
    }
  }, [selectedElementId, editingTextId]);

  useEffect(() => {
    if (editingTextId && editingRef.current) {
      editingRef.current.focus();
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(editingRef.current);
      range.collapse(false);
      selection?.removeAllRanges();
      selection?.addRange(range);
    }
  }, [editingTextId]);

  const handleElementMouseDown = (e: React.MouseEvent, element: CanvasElement) => {
    if (editingTextId === element.id) {
      e.stopPropagation();
      return;
    }

    e.stopPropagation();
    onSelectElement(element.id);
    setDragState({
      elementId: element.id,
      startX: e.clientX,
      startY: e.clientY,
      elementX: element.x,
      elementY: element.y,
      elementWidth: element.width,
      elementHeight: element.height,
      moved: false,
      type: 'move',
    });
  };

  const handleResizeMouseDown = (e: React.MouseEvent, element: CanvasElement, handle: string) => {
    e.stopPropagation();
    onSelectElement(element.id);
    setDragState({
      elementId: element.id,
      startX: e.clientX,
      startY: e.clientY,
      elementX: element.x,
      elementY: element.y,
      elementWidth: element.width,
      elementHeight: element.height,
      moved: false,
      type: 'resize',
      handle,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragState) {
      return;
    }

    const dx = (e.clientX - dragState.startX) / scale;
    const dy = (e.clientY - dragState.startY) / scale;
    const moved = dragState.moved || Math.abs(dx) > 2 || Math.abs(dy) > 2;

    setDragState((prev) => (prev ? { ...prev, moved } : prev));

    if (!moved) {
      return;
    }

    if (dragState.type === 'move') {
      onUpdateElement(dragState.elementId, {
        x: dragState.elementX + dx,
        y: dragState.elementY + dy,
      });
    } else if (dragState.type === 'resize' && dragState.handle) {
      let newX = dragState.elementX;
      let newY = dragState.elementY;
      let newWidth = dragState.elementWidth;
      let newHeight = dragState.elementHeight;

      const handle = dragState.handle;

      if (handle.includes('e')) {
        newWidth = Math.max(10, dragState.elementWidth + dx);
      }
      if (handle.includes('s')) {
        newHeight = Math.max(10, dragState.elementHeight + dy);
      }
      if (handle.includes('w')) {
        const possibleWidth = dragState.elementWidth - dx;
        if (possibleWidth > 10) {
          newWidth = possibleWidth;
          newX = dragState.elementX + dx;
        }
      }
      if (handle.includes('n')) {
        const possibleHeight = dragState.elementHeight - dy;
        if (possibleHeight > 10) {
          newHeight = possibleHeight;
          newY = dragState.elementY + dy;
        }
      }

      onUpdateElement(dragState.elementId, {
        x: newX,
        y: newY,
        width: newWidth,
        height: newHeight,
      });
    }
  };

  const handleMouseUp = () => {
    setDragState(null);
  };

  const handleCanvasMouseDown = () => {
    if (editingTextId) {
      return;
    }
    onSelectElement(null);
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onSelectElement(null);
      setEditingTextId(null);
    }
  };

  const handleTextDoubleClick = (e: React.MouseEvent, element: TextElement) => {
    e.stopPropagation();
    onSelectElement(element.id);
    setEditingTextId(element.id);
    setDragState(null);
  };

  const handleTextBlur = (id: string, value: string) => {
    onUpdateElement(id, { text: value });
    setEditingTextId(null);
  };

  const renderResizeHandles = (el: CanvasElement) => {
    if (selectedElementId !== el.id || editingTextId === el.id) return null;

    const baseHandleStyle: React.CSSProperties = {
      position: 'absolute',
      backgroundColor: '#ffffff',
      border: '2px solid #94a3b8',
      zIndex: 10,
      boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
    };

    const handles = [
      // Corners (Circles) - 24x24
      { id: 'nw', cursor: 'nwse-resize', top: -12, left: -12, width: 24, height: 24, borderRadius: '50%' },
      { id: 'ne', cursor: 'nesw-resize', top: -12, right: -12, width: 24, height: 24, borderRadius: '50%' },
      { id: 'se', cursor: 'nwse-resize', bottom: -12, right: -12, width: 24, height: 24, borderRadius: '50%' },
      { id: 'sw', cursor: 'nesw-resize', bottom: -12, left: -12, width: 24, height: 24, borderRadius: '50%' },
      // Edges (Pills) - 32x16 and 16x32
      { id: 'n', cursor: 'ns-resize', top: -8, left: '50%', transform: 'translateX(-50%)', width: 32, height: 16, borderRadius: '8px' },
      { id: 's', cursor: 'ns-resize', bottom: -8, left: '50%', transform: 'translateX(-50%)', width: 32, height: 16, borderRadius: '8px' },
      { id: 'e', cursor: 'ew-resize', top: '50%', right: -8, transform: 'translateY(-50%)', width: 16, height: 32, borderRadius: '8px' },
      { id: 'w', cursor: 'ew-resize', top: '50%', left: -8, transform: 'translateY(-50%)', width: 16, height: 32, borderRadius: '8px' },
    ];

    return (
      <>
        {handles.map((handle) => {
          const { id, cursor, ...styleProps } = handle;
          return (
            <div
              key={id}
              style={{ ...baseHandleStyle, ...styleProps, cursor }}
              onMouseDown={(e) => handleResizeMouseDown(e, el, id)}
              onClick={(e) => e.stopPropagation()}
            />
          );
        })}
      </>
    );
  };

  const renderElement = (el: CanvasElement) => {
    const isSelected = el.id === selectedElementId;
    const isDragging = dragState?.elementId === el.id && dragState.moved;
    const isEditing = el.type === 'text' && editingTextId === el.id;
    const baseStyle: React.CSSProperties = {
      position: 'absolute',
      left: el.x,
      top: el.y,
      width: el.width,
      height: el.height,
      transform: `rotate(${el.rotation}deg)`,
      opacity: el.opacity,
      zIndex: el.zIndex,
      cursor: isEditing ? 'text' : isDragging && isSelected ? 'grabbing' : 'grab',
      outline: isSelected ? '3px solid #00d0f4' : 'none',
      userSelect: isEditing ? 'text' : 'none',
    };

    if (el.type === 'text') {
      const textEl = el as TextElement;
      return (
        <div
          key={el.id}
          ref={isEditing ? editingRef : null}
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
          contentEditable={isEditing}
          suppressContentEditableWarning
          onMouseDown={(e) => handleElementMouseDown(e, el)}
          onDoubleClick={(e) => handleTextDoubleClick(e, textEl)}
          onClick={(e) => e.stopPropagation()}
          onBlur={(e) => handleTextBlur(el.id, e.currentTarget.textContent ?? '')}
        >
          {textEl.text}
          {renderResizeHandles(el)}
        </div>
      );
    }

    if (el.type === 'image') {
      const imgEl = el as ImageElement;
      return (
        <div
          key={el.id}
          style={baseStyle}
          onMouseDown={(e) => handleElementMouseDown(e, el)}
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={imgEl.src}
            alt=""
            draggable={false}
            referrerPolicy="no-referrer"
            style={{
              width: '100%',
              height: '100%',
              objectFit: imgEl.objectFit,
              borderRadius: imgEl.borderRadius,
              display: 'block',
              pointerEvents: 'none',
            }}
          />
          {renderResizeHandles(el)}
        </div>
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
          onMouseDown={(e) => handleElementMouseDown(e, el)}
          onClick={(e) => e.stopPropagation()}
        >
          {renderResizeHandles(el)}
        </div>
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
      onMouseDown={handleCanvasMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onClick={handleCanvasClick}
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
          {[...state.elements].sort((a, b) => a.zIndex - b.zIndex).map(renderElement)}
        </div>
      </div>
    </div>
  );
};
