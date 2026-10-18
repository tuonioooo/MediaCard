import React, { useState, useRef, useCallback } from 'react';
import { CanvasState, CanvasElement, Template, TextElement, ImageElement, ShapeElement, ExportOptions } from './types';
import { TEMPLATES, generateId, FONTS } from './constants';
import { Sidebar } from './components/Sidebar';
import { Canvas } from './components/Canvas';
import { PropertiesPanel } from './components/PropertiesPanel';
import html2canvas from 'html2canvas';

export default function App() {
  const [currentTemplateId, setCurrentTemplateId] = useState<string | null>(TEMPLATES[0].id);
  const [state, setState] = useState<CanvasState>(() => JSON.parse(JSON.stringify(TEMPLATES[0].state)));
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleScaleContent = (multiplier: number) => {
    setState(prev => {
      const isFullBg = (el: CanvasElement) =>
        el.type === 'shape' &&
        Math.abs(el.width - prev.width) <= 30 &&
        Math.abs(el.height - prev.height) <= 30 &&
        el.x <= 20 &&
        el.y <= 20;

      const centerX = prev.width / 2;
      const centerY = prev.height / 2;

      return {
        ...prev,
        elements: prev.elements.map(el => {
          if (isFullBg(el)) return el;

          const elCenterX = el.x + el.width / 2;
          const elCenterY = el.y + el.height / 2;

          const newCenterX = centerX + (elCenterX - centerX) * multiplier;
          const newCenterY = centerY + (elCenterY - centerY) * multiplier;

          const newWidth = Math.max(5, Math.round(el.width * multiplier));
          const newHeight = Math.max(5, Math.round(el.height * multiplier));
          const newX = Math.round(newCenterX - newWidth / 2);
          const newY = Math.round(newCenterY - newHeight / 2);

          const base = {
            ...el,
            x: newX,
            y: newY,
            width: newWidth,
            height: newHeight,
          };

          if (el.type === 'text') {
            return {
              ...base,
              fontSize: Math.max(8, Math.round(el.fontSize * multiplier)),
              letterSpacing: el.letterSpacing ? Math.round(el.letterSpacing * multiplier) : el.letterSpacing,
            };
          }

          if (el.type === 'shape' || el.type === 'image') {
            return {
              ...base,
              borderRadius: el.borderRadius !== undefined ? Math.round(el.borderRadius * multiplier) : undefined,
            };
          }

          return base;
        }),
      };
    });
  };

  const handleFitContent = (mode: 'cover' | 'contain' = 'cover') => {
    setState(prev => {
      const isFullBg = (el: CanvasElement) =>
        el.type === 'shape' &&
        Math.abs(el.width - prev.width) <= 30 &&
        Math.abs(el.height - prev.height) <= 30 &&
        el.x <= 20 &&
        el.y <= 20;

      const nonBg = prev.elements.filter(el => !isFullBg(el));
      if (nonBg.length === 0) return prev;

      let minX = Infinity;
      let minY = Infinity;
      let maxX = -Infinity;
      let maxY = -Infinity;
      nonBg.forEach(el => {
        minX = Math.min(minX, el.x);
        minY = Math.min(minY, el.y);
        maxX = Math.max(maxX, el.x + el.width);
        maxY = Math.max(maxY, el.y + el.height);
      });

      const bboxW = Math.max(1, maxX - minX);
      const bboxH = Math.max(1, maxY - minY);

      const margin = 40;
      const targetW = prev.width - margin * 2;
      const targetH = prev.height - margin * 2;

      const scale = mode === 'cover'
        ? Math.max(targetW / bboxW, targetH / bboxH)
        : Math.min(targetW / bboxW, targetH / bboxH);

      const scaledW = bboxW * scale;
      const scaledH = bboxH * scale;

      const targetMinX = Math.round((prev.width - scaledW) / 2);
      const targetMinY = Math.round((prev.height - scaledH) / 2);

      const dx = targetMinX - Math.round(minX * scale);
      const dy = targetMinY - Math.round(minY * scale);

      return {
        ...prev,
        elements: prev.elements.map(el => {
          if (isFullBg(el)) return el;

          const newW = Math.max(5, Math.round(el.width * scale));
          const newH = Math.max(5, Math.round(el.height * scale));
          const newX = Math.round(el.x * scale + dx);
          const newY = Math.round(el.y * scale + dy);

          const base = { ...el, x: newX, y: newY, width: newW, height: newH };
          if (el.type === 'text') {
            return {
              ...base,
              fontSize: Math.max(8, Math.round(el.fontSize * scale)),
              letterSpacing: el.letterSpacing ? Math.round(el.letterSpacing * scale) : el.letterSpacing,
            };
          }
          if (el.type === 'shape' || el.type === 'image') {
            return {
              ...base,
              borderRadius: el.borderRadius !== undefined ? Math.round(el.borderRadius * scale) : undefined,
            };
          }
          return base;
        }),
      };
    });
  };

  const handleUpdateCanvas = (updates: Partial<CanvasState>) => {
    setState(prev => {
      const nextWidth = updates.width ?? prev.width;
      const nextHeight = updates.height ?? prev.height;

      if (nextWidth === prev.width && nextHeight === prev.height) {
        return { ...prev, ...updates };
      }

      // Check if an element is a full-canvas background (covers previous canvas completely)
      const isFullBg = (el: CanvasElement) =>
        el.type === 'shape' &&
        Math.abs(el.width - prev.width) <= 30 &&
        Math.abs(el.height - prev.height) <= 30 &&
        el.x <= 20 &&
        el.y <= 20;

      const nonBgElements = prev.elements.filter(el => !isFullBg(el));

      if (nonBgElements.length === 0) {
        return {
          ...prev,
          ...updates,
          width: nextWidth,
          height: nextHeight,
          elements: prev.elements.map(el =>
            isFullBg(el)
              ? { ...el, x: 0, y: 0, width: nextWidth, height: nextHeight }
              : el
          ),
        };
      }

      const scaleX = nextWidth / prev.width;
      const scaleY = nextHeight / prev.height;

      // 1. Proportional / Resolution scaling (e.g. 1080p -> 2K -> 4K or same ratio)
      if (Math.abs(scaleX - scaleY) < 0.05) {
        const uniformScale = (scaleX + scaleY) / 2;
        return {
          ...prev,
          ...updates,
          width: nextWidth,
          height: nextHeight,
          elements: prev.elements.map(el => {
            if (isFullBg(el)) {
              return { ...el, x: 0, y: 0, width: nextWidth, height: nextHeight };
            }
            const base = {
              ...el,
              x: Math.round(el.x * uniformScale),
              y: Math.round(el.y * uniformScale),
              width: Math.max(5, Math.round(el.width * uniformScale)),
              height: Math.max(5, Math.round(el.height * uniformScale)),
            };
            if (el.type === 'text') {
              return {
                ...base,
                fontSize: Math.max(8, Math.round(el.fontSize * uniformScale)),
                letterSpacing: el.letterSpacing ? Math.round(el.letterSpacing * uniformScale) : el.letterSpacing,
              };
            }
            if (el.type === 'shape' || el.type === 'image') {
              return {
                ...base,
                borderRadius: el.borderRadius !== undefined ? Math.round(el.borderRadius * uniformScale) : undefined,
              };
            }
            return base;
          }),
        };
      }

      // 2. Aspect Ratio Change (e.g., 3:4 -> 9:16, 4:5 -> 9:16, 1:1 -> 9:16, etc.)
      // Intelligent layout adaptation:
      // Header stays pinned at top, Footer stays pinned at bottom.
      // Middle content adapts and scales to generously fill vertical space without looking tiny/cramped.
      const headerThreshold = prev.height * 0.22;
      const footerThreshold = prev.height * 0.88;

      const headerElements = nonBgElements.filter(el => el.y <= headerThreshold);
      const footerElements = nonBgElements.filter(el => el.y >= footerThreshold);

      let headerBottom = 0;
      headerElements.forEach(el => {
        headerBottom = Math.max(headerBottom, el.y + el.height);
      });
      if (headerBottom === 0) headerBottom = prev.height * 0.16;

      let footerTop = prev.height;
      footerElements.forEach(el => {
        footerTop = Math.min(footerTop, el.y);
      });
      if (footerTop === prev.height) footerTop = prev.height * 0.92;

      // Header slightly scales if height expanded
      const headerScaleY = scaleY > 1 ? Math.min(1.15, 1 + (scaleY - 1) * 0.25) : Math.max(0.85, scaleY);
      const newHeaderBottom = Math.round(headerBottom * headerScaleY);

      const footerHeight = prev.height - footerTop;
      const footerScaleY = scaleY > 1 ? Math.min(1.15, 1 + (scaleY - 1) * 0.25) : Math.max(0.85, scaleY);
      const newFooterHeight = Math.round(footerHeight * footerScaleY);
      const newFooterTop = nextHeight - newFooterHeight;

      const oldBodyHeight = Math.max(10, footerTop - headerBottom);
      const newBodyHeight = Math.max(10, newFooterTop - newHeaderBottom);
      const bodyStretchY = newBodyHeight / oldBodyHeight;

      // Card height scaling: when canvas expands vertically (like 9:16), enlarge card heights & text
      const bodyElemScaleY = bodyStretchY > 1
        ? Math.min(1.30, 1 + (bodyStretchY - 1) * 0.42)
        : Math.max(0.70, bodyStretchY);

      const fontScale = bodyStretchY > 1
        ? Math.min(1.25, 1 + (bodyStretchY - 1) * 0.35)
        : Math.max(0.75, bodyStretchY);

      return {
        ...prev,
        ...updates,
        width: nextWidth,
        height: nextHeight,
        elements: prev.elements.map(el => {
          if (isFullBg(el)) {
            return {
              ...el,
              x: 0,
              y: 0,
              width: nextWidth,
              height: nextHeight,
            };
          }

          // Full-width banner
          const isFullWidthBanner =
            el.type === 'shape' &&
            el.x <= 20 &&
            Math.abs(el.width - prev.width) <= 30;

          // Header zone
          if (el.y <= headerThreshold) {
            const newW = isFullWidthBanner ? nextWidth : Math.round(el.width * scaleX);
            const newX = isFullWidthBanner ? 0 : Math.round(el.x * scaleX);
            const newH = Math.round(el.height * headerScaleY);
            const newY = Math.round(el.y * headerScaleY);

            const base = { ...el, x: newX, y: newY, width: newW, height: newH };
            if (el.type === 'text') {
              return {
                ...base,
                fontSize: Math.round(el.fontSize * Math.min(1.2, Math.max(scaleX, headerScaleY))),
              };
            }
            if (el.type === 'shape' || el.type === 'image') {
              return {
                ...base,
                borderRadius: el.borderRadius !== undefined ? Math.round(el.borderRadius * Math.min(1.2, headerScaleY)) : undefined,
              };
            }
            return base;
          }

          // Footer zone
          if (el.y >= footerThreshold) {
            const distFromBottom = prev.height - el.y;
            const newY = Math.round(nextHeight - distFromBottom * footerScaleY);
            const newW = isFullWidthBanner ? nextWidth : Math.round(el.width * scaleX);
            const newX = isFullWidthBanner ? 0 : Math.round(el.x * scaleX);
            const newH = Math.round(el.height * footerScaleY);

            const base = { ...el, x: newX, y: newY, width: newW, height: newH };
            if (el.type === 'text') {
              return {
                ...base,
                fontSize: Math.round(el.fontSize * Math.min(1.15, Math.max(scaleX, footerScaleY))),
              };
            }
            if (el.type === 'shape' || el.type === 'image') {
              return {
                ...base,
                borderRadius: el.borderRadius !== undefined ? Math.round(el.borderRadius * Math.min(1.2, footerScaleY)) : undefined,
              };
            }
            return base;
          }

          // Middle body zone (cards, rank badges, text, metrics)
          const relY = (el.y - headerBottom) / oldBodyHeight;
          const newY = Math.round(newHeaderBottom + relY * newBodyHeight);
          const newW = Math.round(el.width * scaleX);
          const newX = Math.round(el.x * scaleX);
          const newH = Math.round(el.height * bodyElemScaleY);

          const base = { ...el, x: newX, y: newY, width: newW, height: newH };
          if (el.type === 'text') {
            return {
              ...base,
              fontSize: Math.max(9, Math.round(el.fontSize * fontScale)),
              letterSpacing: el.letterSpacing ? Math.round(el.letterSpacing * fontScale) : el.letterSpacing,
            };
          }
          if (el.type === 'shape' || el.type === 'image') {
            return {
              ...base,
              borderRadius: el.borderRadius !== undefined ? Math.round(el.borderRadius * Math.min(1.2, fontScale)) : undefined,
            };
          }
          return base;
        }),
      };
    });
  };

  const handleUpdateElement = (id: string, updates: Partial<CanvasElement>) => {
    setState(prev => ({
      ...prev,
      elements: prev.elements.map(el => el.id === id ? { ...el, ...updates } : el)
    }));
  };

  const handleDeleteElement = (id: string) => {
    setState(prev => ({
      ...prev,
      elements: prev.elements.filter(el => el.id !== id)
    }));
    setSelectedElementId(null);
  };

  const handleDuplicateElement = (id: string) => {
    const elementToCopy = state.elements.find(el => el.id === id);
    if (!elementToCopy) return;

    const newElement = {
      ...elementToCopy,
      id: generateId(),
      x: elementToCopy.x + 20,
      y: elementToCopy.y + 20,
      zIndex: Math.max(...state.elements.map(e => e.zIndex), 0) + 1,
    };

    setState(prev => ({
      ...prev,
      elements: [...prev.elements, newElement]
    }));
    setSelectedElementId(newElement.id);
  };

  const handleSelectTemplate = (template: Template) => {
    setCurrentTemplateId(template.id);
    setState(JSON.parse(JSON.stringify(template.state))); // Deep copy
    setSelectedElementId(null);
  };

  const handleAddText = () => {
    const newText: TextElement = {
      id: generateId(),
      type: 'text',
      text: '双击编辑文字',
      x: state.width / 2 - 100,
      y: state.height / 2 - 30,
      width: 200,
      height: 60,
      rotation: 0,
      opacity: 1,
      zIndex: Math.max(...state.elements.map(e => e.zIndex), 0) + 1,
      fontSize: 48,
      fontFamily: FONTS[0].value,
      fontWeight: '400',
      color: '#000000',
      textAlign: 'center',
      lineHeight: 1.5,
      letterSpacing: 0,
    };
    setState(prev => ({ ...prev, elements: [...prev.elements, newText] }));
    setSelectedElementId(newText.id);
  };

  const handleAddImage = (src?: string) => {
    const newImage: ImageElement = {
      id: generateId(),
      type: 'image',
      src: src || 'https://picsum.photos/seed/new/400/400',
      x: state.width / 2 - 200,
      y: state.height / 2 - 200,
      width: 400,
      height: 400,
      rotation: 0,
      opacity: 1,
      zIndex: Math.max(...state.elements.map(e => e.zIndex), 0) + 1,
      objectFit: 'cover',
      borderRadius: 0,
    };
    setState(prev => ({ ...prev, elements: [...prev.elements, newImage] }));
    setSelectedElementId(newImage.id);
  };

  const handleAddShape = () => {
    const newShape: ShapeElement = {
      id: generateId(),
      type: 'shape',
      shapeType: 'rectangle',
      backgroundColor: '#E5E7EB',
      x: state.width / 2 - 150,
      y: state.height / 2 - 150,
      width: 300,
      height: 300,
      rotation: 0,
      opacity: 1,
      zIndex: Math.max(...state.elements.map(e => e.zIndex), 0) + 1,
      borderRadius: 0,
    };
    setState(prev => ({ ...prev, elements: [...prev.elements, newShape] }));
    setSelectedElementId(newShape.id);
  };

  const handleExport = useCallback(async (options: ExportOptions | 'png' | 'jpeg' | 'webp' = 'png'): Promise<boolean> => {
    if (!canvasRef.current) return false;

    const opts: ExportOptions = typeof options === 'string'
      ? { format: options, scale: 2 }
      : {
          format: options?.format || 'png',
          scale: options?.scale || 2,
          filename: options?.filename,
          transparent: options?.transparent,
        };

    // Deselect element before export to remove outlines and resize handles
    const prevSelected = selectedElementId;
    setSelectedElementId(null);

    // Wait a tick for React to render without outlines
    await new Promise(resolve => setTimeout(resolve, 60));

    const targetEl = canvasRef.current;
    const origBackground = targetEl.style.background;
    const origBackgroundColor = targetEl.style.backgroundColor;
    const origBackgroundImage = targetEl.style.backgroundImage;
    const origBoxShadow = targetEl.style.boxShadow;

    if (opts.transparent && opts.format !== 'jpeg') {
      targetEl.style.background = 'transparent';
      targetEl.style.backgroundColor = 'transparent';
      targetEl.style.backgroundImage = 'none';
    }
    targetEl.style.boxShadow = 'none';

    try {
      const canvas = await html2canvas(targetEl, {
        scale: opts.scale || 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: (opts.transparent && opts.format !== 'jpeg') ? null : (opts.format === 'jpeg' ? '#ffffff' : null),
      });

      const mimeType = `image/${opts.format}`;
      const url = canvas.toDataURL(mimeType, 1.0);
      const link = document.createElement('a');
      const ext = opts.format === 'jpeg' ? 'jpg' : opts.format;
      const rawName = opts.filename?.trim() || 'mediacard';
      const safeName = rawName.replace(/[/\\?%*:|"<>]/g, '-');
      const wPx = Math.round(state.width * (opts.scale || 2));
      const hPx = Math.round(state.height * (opts.scale || 2));
      link.download = `${safeName}_${wPx}x${hPx}.${ext}`;
      link.href = url;
      link.click();
      return true;
    } catch (error) {
      console.error('Export failed:', error);
      alert('导出失败，请确保使用的外部图片支持跨域访问。');
      return false;
    } finally {
      targetEl.style.background = origBackground;
      targetEl.style.backgroundColor = origBackgroundColor;
      targetEl.style.backgroundImage = origBackgroundImage;
      targetEl.style.boxShadow = origBoxShadow;
      setSelectedElementId(prevSelected);
    }
  }, [selectedElementId, state.width, state.height]);

  const handleCopyImage = useCallback(async (options: ExportOptions): Promise<boolean> => {
    if (!canvasRef.current) return false;

    const prevSelected = selectedElementId;
    setSelectedElementId(null);
    await new Promise(resolve => setTimeout(resolve, 60));

    const targetEl = canvasRef.current;
    const origBackground = targetEl.style.background;
    const origBackgroundColor = targetEl.style.backgroundColor;
    const origBackgroundImage = targetEl.style.backgroundImage;
    const origBoxShadow = targetEl.style.boxShadow;

    if (options.transparent && options.format !== 'jpeg') {
      targetEl.style.background = 'transparent';
      targetEl.style.backgroundColor = 'transparent';
      targetEl.style.backgroundImage = 'none';
    }
    targetEl.style.boxShadow = 'none';

    try {
      const canvas = await html2canvas(targetEl, {
        scale: options.scale || 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: (options.transparent && options.format !== 'jpeg') ? null : (options.format === 'jpeg' ? '#ffffff' : null),
      });

      return new Promise<boolean>((resolve) => {
        canvas.toBlob(async (blob) => {
          if (!blob) {
            resolve(false);
            return;
          }
          try {
            await navigator.clipboard.write([
              new ClipboardItem({ 'image/png': blob })
            ]);
            resolve(true);
          } catch (err) {
            console.error('Clipboard copy failed:', err);
            resolve(false);
          }
        }, 'image/png');
      });
    } catch (error) {
      console.error('Copy to clipboard failed:', error);
      return false;
    } finally {
      targetEl.style.background = origBackground;
      targetEl.style.backgroundColor = origBackgroundColor;
      targetEl.style.backgroundImage = origBackgroundImage;
      targetEl.style.boxShadow = origBoxShadow;
      setSelectedElementId(prevSelected);
    }
  }, [selectedElementId]);

  return (
    <div className="flex h-screen w-full bg-gray-100 overflow-hidden font-sans">
      <Sidebar
        state={state}
        onUpdateCanvas={handleUpdateCanvas}
        onScaleContent={handleScaleContent}
        onFitContent={handleFitContent}
        onAddText={handleAddText}
        onAddImage={handleAddImage}
        onAddShape={handleAddShape}
        onSelectTemplate={handleSelectTemplate}
        onExport={handleExport}
        onCopyImage={handleCopyImage}
        currentTemplateId={currentTemplateId}
      />
      
      <div className="flex-1 flex flex-col relative overflow-hidden">
        <Canvas
          state={state}
          selectedElementId={selectedElementId}
          onSelectElement={setSelectedElementId}
          onUpdateElement={handleUpdateElement}
          canvasRef={canvasRef}
        />
      </div>

      <PropertiesPanel
        state={state}
        selectedElementId={selectedElementId}
        onUpdateCanvas={handleUpdateCanvas}
        onUpdateElement={handleUpdateElement}
        onDeleteElement={handleDeleteElement}
        onDuplicateElement={handleDuplicateElement}
      />
    </div>
  );
}
