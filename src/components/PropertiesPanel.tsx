import React from 'react';
import { Settings, Type, Image as ImageIcon, Square, Trash2, Copy } from 'lucide-react';
import { CanvasState, CanvasElement, TextElement, ImageElement, ShapeElement } from '../types';
import { FONTS } from '../constants';

interface PropertiesPanelProps {
  state: CanvasState;
  selectedElementId: string | null;
  onUpdateCanvas: (updates: Partial<CanvasState>) => void;
  onUpdateElement: (id: string, updates: Partial<CanvasElement>) => void;
  onDeleteElement: (id: string) => void;
  onDuplicateElement: (id: string) => void;
}

export const PropertiesPanel: React.FC<PropertiesPanelProps> = ({
  state,
  selectedElementId,
  onUpdateCanvas,
  onUpdateElement,
  onDeleteElement,
  onDuplicateElement,
}) => {
  const selectedElement = state.elements.find(el => el.id === selectedElementId);

  const renderBaseProperties = (el: CanvasElement) => (
    <div className="space-y-4 border-t border-gray-200 pt-4 mt-6">
      <h3 className="text-sm font-semibold text-gray-800">基础属性</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-gray-500 mb-1">X</label>
          <input
            type="number"
            value={Math.round(el.x)}
            onChange={(e) => onUpdateElement(el.id, { x: Number(e.target.value) })}
            className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1">Y</label>
          <input
            type="number"
            value={Math.round(el.y)}
            onChange={(e) => onUpdateElement(el.id, { y: Number(e.target.value) })}
            className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1">宽度</label>
          <input
            type="number"
            value={Math.round(el.width)}
            onChange={(e) => onUpdateElement(el.id, { width: Number(e.target.value) })}
            className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1">高度</label>
          <input
            type="number"
            value={Math.round(el.height)}
            onChange={(e) => onUpdateElement(el.id, { height: Number(e.target.value) })}
            className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1">旋转 (度)</label>
          <input
            type="number"
            value={el.rotation}
            onChange={(e) => onUpdateElement(el.id, { rotation: Number(e.target.value) })}
            className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1">透明度 (0-1)</label>
          <input
            type="number"
            step="0.1"
            min="0"
            max="1"
            value={el.opacity}
            onChange={(e) => onUpdateElement(el.id, { opacity: Number(e.target.value) })}
            className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1">层级 (z-index)</label>
          <input
            type="number"
            value={el.zIndex}
            onChange={(e) => onUpdateElement(el.id, { zIndex: Number(e.target.value) })}
            className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>
      </div>
    </div>
  );

  const renderTextProperties = (el: TextElement) => (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Type className="w-5 h-5 text-indigo-600" />
        <h3 className="font-semibold text-gray-800">文字属性</h3>
      </div>
      
      <div>
        <label className="block text-xs text-gray-500 mb-1">内容</label>
        <textarea
          value={el.text}
          onChange={(e) => onUpdateElement(el.id, { text: e.target.value })}
          className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-indigo-500 min-h-[100px]"
        />
      </div>

      <div>
        <label className="block text-xs text-gray-500 mb-1">字体</label>
        <select
          value={el.fontFamily}
          onChange={(e) => onUpdateElement(el.id, { fontFamily: e.target.value })}
          className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-indigo-500"
        >
          {FONTS.map(font => (
            <option key={font.name} value={font.value} style={{ fontFamily: font.value }}>
              {font.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-gray-500 mb-1">字号</label>
          <input
            type="number"
            value={el.fontSize}
            onChange={(e) => onUpdateElement(el.id, { fontSize: Number(e.target.value) })}
            className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1">字重</label>
          <select
            value={el.fontWeight}
            onChange={(e) => onUpdateElement(el.id, { fontWeight: e.target.value })}
            className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            <option value="300">细 (300)</option>
            <option value="400">正常 (400)</option>
            <option value="500">中等 (500)</option>
            <option value="600">半粗 (600)</option>
            <option value="700">粗 (700)</option>
            <option value="900">黑 (900)</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs text-gray-500 mb-1">颜色</label>
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={el.color}
            onChange={(e) => onUpdateElement(el.id, { color: e.target.value })}
            className="w-8 h-8 rounded cursor-pointer border-0 p-0"
          />
          <input
            type="text"
            value={el.color}
            onChange={(e) => onUpdateElement(el.id, { color: e.target.value })}
            className="flex-1 px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-indigo-500 uppercase"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-gray-500 mb-1">行高</label>
          <input
            type="number"
            step="0.1"
            value={el.lineHeight}
            onChange={(e) => onUpdateElement(el.id, { lineHeight: Number(e.target.value) })}
            className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1">字间距</label>
          <input
            type="number"
            value={el.letterSpacing}
            onChange={(e) => onUpdateElement(el.id, { letterSpacing: Number(e.target.value) })}
            className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs text-gray-500 mb-1">对齐方式</label>
        <div className="flex bg-gray-100 p-1 rounded-lg">
          {['left', 'center', 'right'].map((align) => (
            <button
              key={align}
              onClick={() => onUpdateElement(el.id, { textAlign: align as any })}
              className={`flex-1 py-1.5 text-sm rounded-md transition-colors ${
                el.textAlign === align
                  ? 'bg-white shadow text-indigo-600 font-medium'
                  : 'text-gray-600 hover:bg-gray-200'
              }`}
            >
              {align === 'left' ? '左对齐' : align === 'center' ? '居中' : '右对齐'}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-xs text-gray-500 mb-1">文字阴影 (CSS)</label>
        <input
          type="text"
          value={el.textShadow || ''}
          onChange={(e) => onUpdateElement(el.id, { textShadow: e.target.value })}
          placeholder="2px 2px 4px rgba(0,0,0,0.5)"
          className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
      </div>
    </div>
  );

  const renderImageProperties = (el: ImageElement) => (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <ImageIcon className="w-5 h-5 text-indigo-600" />
        <h3 className="font-semibold text-gray-800">图片属性</h3>
      </div>
      
      <div>
        <label className="block text-xs text-gray-500 mb-1">图片 URL</label>
        <input
          type="text"
          value={el.src}
          onChange={(e) => onUpdateElement(el.id, { src: e.target.value })}
          className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-xs text-gray-500 mb-1">填充方式</label>
        <select
          value={el.objectFit}
          onChange={(e) => onUpdateElement(el.id, { objectFit: e.target.value as any })}
          className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-indigo-500"
        >
          <option value="cover">覆盖 (Cover)</option>
          <option value="contain">包含 (Contain)</option>
          <option value="fill">拉伸 (Fill)</option>
        </select>
      </div>

      <div>
        <label className="block text-xs text-gray-500 mb-1">圆角 (px)</label>
        <input
          type="number"
          value={el.borderRadius || 0}
          onChange={(e) => onUpdateElement(el.id, { borderRadius: Number(e.target.value) })}
          className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
      </div>
    </div>
  );

  const renderShapeProperties = (el: ShapeElement) => (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Square className="w-5 h-5 text-indigo-600" />
        <h3 className="font-semibold text-gray-800">形状属性</h3>
      </div>
      
      <div>
        <label className="block text-xs text-gray-500 mb-1">形状类型</label>
        <select
          value={el.shapeType}
          onChange={(e) => onUpdateElement(el.id, { shapeType: e.target.value as any })}
          className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-indigo-500"
        >
          <option value="rectangle">矩形</option>
          <option value="circle">圆形</option>
        </select>
      </div>

      <div>
        <label className="block text-xs text-gray-500 mb-1">背景颜色</label>
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={el.backgroundColor === 'transparent' ? '#ffffff' : el.backgroundColor}
            onChange={(e) => onUpdateElement(el.id, { backgroundColor: e.target.value })}
            className="w-8 h-8 rounded cursor-pointer border-0 p-0"
          />
          <input
            type="text"
            value={el.backgroundColor}
            onChange={(e) => onUpdateElement(el.id, { backgroundColor: e.target.value })}
            className="flex-1 px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-indigo-500 uppercase"
          />
        </div>
      </div>

      {el.shapeType === 'rectangle' && (
        <div>
          <label className="block text-xs text-gray-500 mb-1">圆角 (px)</label>
          <input
            type="number"
            value={el.borderRadius || 0}
            onChange={(e) => onUpdateElement(el.id, { borderRadius: Number(e.target.value) })}
            className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>
      )}
    </div>
  );

  const renderCanvasProperties = () => (
    <div className="space-y-4">
      <div className="text-xs text-gray-400">设置当前画布的背景样式</div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-xs text-gray-500 mb-2">背景类型</label>
          <select
            value={state.background.type}
            onChange={(e) => onUpdateCanvas({ background: { ...state.background, type: e.target.value as any } })}
            className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            <option value="color">纯色</option>
            <option value="gradient">渐变</option>
            <option value="image">图片</option>
          </select>
        </div>

        {state.background.type === 'color' && (
          <div>
            <label className="block text-xs text-gray-500 mb-1">颜色</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={state.background.value}
                onChange={(e) => onUpdateCanvas({ background: { ...state.background, value: e.target.value } })}
                className="w-8 h-8 rounded cursor-pointer border-0 p-0"
              />
              <input
                type="text"
                value={state.background.value}
                onChange={(e) => onUpdateCanvas({ background: { ...state.background, value: e.target.value } })}
                className="flex-1 px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-indigo-500 uppercase"
              />
            </div>
          </div>
        )}

        {state.background.type === 'gradient' && (
          <div>
            <label className="block text-xs text-gray-500 mb-1">渐变 CSS</label>
            <input
              type="text"
              value={state.background.value}
              onChange={(e) => onUpdateCanvas({ background: { ...state.background, value: e.target.value } })}
              placeholder="linear-gradient(to right, #ff7e5f, #feb47b)"
              className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
        )}

        {state.background.type === 'image' && (
          <div>
            <label className="block text-xs text-gray-500 mb-1">图片 URL</label>
            <input
              type="text"
              value={state.background.value}
              onChange={(e) => onUpdateCanvas({ background: { ...state.background, value: e.target.value } })}
              placeholder="https://..."
              className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
        )}

        <div className="border-t border-gray-200 pt-4 mt-6">
          <h4 className="text-xs font-semibold text-gray-600 mb-2">画布尺寸</h4>
          <div className="grid grid-cols-2 gap-3 text-xs text-gray-500 bg-gray-50 p-2.5 rounded-lg border border-gray-100">
            <div>宽度: <span className="font-mono text-gray-800">{state.width}px</span></div>
            <div>高度: <span className="font-mono text-gray-800">{state.height}px</span></div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-80 bg-white border-l border-gray-200 flex flex-col h-full overflow-hidden shrink-0 select-none">
      {/* 顶部固定标题栏 - 与 TopBar (h-14) 保持高度与底边线完全平齐 */}
      <div className="h-14 border-b border-gray-200 px-4 flex items-center justify-between shrink-0 bg-white z-10 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
        <div className="flex items-center gap-2">
          {selectedElement ? (
            <>
              {selectedElement.type === 'text' && <Type className="w-4 h-4 text-indigo-600" />}
              {selectedElement.type === 'image' && <ImageIcon className="w-4 h-4 text-indigo-600" />}
              {selectedElement.type === 'shape' && <Square className="w-4 h-4 text-indigo-600" />}
              <span className="text-sm font-bold text-gray-800">
                {selectedElement.type === 'text' ? '文字属性' : selectedElement.type === 'image' ? '图片属性' : '形状属性'}
              </span>
            </>
          ) : (
            <>
              <Settings className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-bold text-gray-800">画布属性</span>
            </>
          )}
        </div>

        {selectedElement && (
          <div className="flex items-center gap-1">
            <button
              onClick={() => onDuplicateElement(selectedElement.id)}
              className="p-1.5 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
              title="复制图层"
            >
              <Copy className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDeleteElement(selectedElement.id)}
              className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="删除图层"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* 独立滚动区域 - 顶部位置紧贴顶部工具栏下方 (y=56px)，内容自顶向下正常流式排布，彻底杜绝负偏移与截断 */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {selectedElement ? (
          <div className="space-y-4">
            {selectedElement.type === 'text' && renderTextProperties(selectedElement as TextElement)}
            {selectedElement.type === 'image' && renderImageProperties(selectedElement as ImageElement)}
            {selectedElement.type === 'shape' && renderShapeProperties(selectedElement as ShapeElement)}
            {renderBaseProperties(selectedElement)}
          </div>
        ) : (
          renderCanvasProperties()
        )}
      </div>
    </div>
  );
};
