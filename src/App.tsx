import React, { useState, useRef, useCallback } from 'react';
import { CanvasState, CanvasElement, Template, TextElement, ImageElement, ShapeElement } from './types';
import { TEMPLATES, generateId, FONTS } from './constants';
import { Sidebar } from './components/Sidebar';
import { Canvas } from './components/Canvas';
import { PropertiesPanel } from './components/PropertiesPanel';
import { TopBar } from './components/TopBar';
import html2canvas from 'html2canvas';

export default function App() {
  const [currentTemplateId, setCurrentTemplateId] = useState<string | null>(TEMPLATES[0].id);
  const [state, setState] = useState<CanvasState>(TEMPLATES[0].state);
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleUpdateCanvas = (updates: Partial<CanvasState>) => {
    setState(prev => {
      const nextWidth = updates.width ?? prev.width;
      const nextHeight = updates.height ?? prev.height;

      if (nextWidth === prev.width && nextHeight === prev.height) {
        return { ...prev, ...updates };
      }

      const scaleX = nextWidth / prev.width;
      const scaleY = nextHeight / prev.height;
      
      // Use geometric mean for uniform scaling to preserve aspect ratio of elements
      // while still scaling them when the canvas area changes.
      const uniformScale = Math.sqrt(scaleX * scaleY);

      return {
        ...prev,
        ...updates,
        width: nextWidth,
        height: nextHeight,
        elements: prev.elements.map((el) => {
          // Calculate new center based on relative position
          const centerX = el.x + el.width / 2;
          const centerY = el.y + el.height / 2;
          const newCenterX = centerX * scaleX;
          const newCenterY = centerY * scaleY;

          // Scale width and height uniformly
          const newWidth = el.width * uniformScale;
          const newHeight = el.height * uniformScale;

          const resizedBase = {
            ...el,
            x: newCenterX - newWidth / 2,
            y: newCenterY - newHeight / 2,
            width: newWidth,
            height: newHeight,
          };

          if (el.type === 'text') {
            return {
              ...resizedBase,
              fontSize: Math.max(1, Math.round(el.fontSize * uniformScale)),
              letterSpacing: el.letterSpacing * uniformScale,
            };
          }

          if (el.type === 'image' || el.type === 'shape') {
            return {
              ...resizedBase,
              borderRadius: el.borderRadius === undefined ? undefined : el.borderRadius * uniformScale,
            };
          }

          return resizedBase;
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

  const handleAddImage = () => {
    const newImage: ImageElement = {
      id: generateId(),
      type: 'image',
      src: 'https://picsum.photos/seed/new/400/400',
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

  const handleExport = useCallback(async (format: 'png' | 'jpeg' | 'webp') => {
    if (!canvasRef.current) return;
    
    // Deselect element before export to remove outlines
    const prevSelected = selectedElementId;
    setSelectedElementId(null);
    
    // Wait a tick for React to render without outlines
    await new Promise(resolve => setTimeout(resolve, 50));

    try {
      const canvas = await html2canvas(canvasRef.current, {
        scale: 2, // High quality
        useCORS: true, // Allow external images
        allowTaint: true,
        backgroundColor: format === 'jpeg' ? '#ffffff' : null,
      });

      const mimeType = `image/${format}`;
      const url = canvas.toDataURL(mimeType, 1.0);
      const link = document.createElement('a');
      const ext = format === 'jpeg' ? 'jpg' : format;
      link.download = `template-export-${Date.now()}.${ext}`;
      link.href = url;
      link.click();
    } catch (error) {
      console.error('Export failed:', error);
      alert('导出失败，请确保使用的图片支持跨域访问。');
    } finally {
      // Restore selection
      setSelectedElementId(prevSelected);
    }
  }, [selectedElementId]);

  return (
    <div className="flex h-screen w-full bg-gray-50 overflow-hidden font-sans">
      <Sidebar
        onAddText={handleAddText}
        onAddImage={handleAddImage}
        onAddShape={handleAddShape}
        onSelectTemplate={handleSelectTemplate}
        onExport={handleExport}
        currentTemplateId={currentTemplateId}
      />
      
      <div className="flex-1 flex flex-col relative">
        <TopBar 
          width={state.width} 
          height={state.height} 
          onUpdateCanvas={handleUpdateCanvas} 
        />
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
