import React from 'react';
import { Type, Image, Square, LayoutTemplate, Download } from 'lucide-react';
import { TEMPLATES, generateId } from '../constants';
import { CanvasState, Template, TextElement, ImageElement, ShapeElement } from '../types';

interface SidebarProps {
  onAddText: () => void;
  onAddImage: () => void;
  onAddShape: () => void;
  onSelectTemplate: (template: Template) => void;
  onExport: () => void;
  currentTemplateId: string | null;
}

export const Sidebar: React.FC<SidebarProps> = ({
  onAddText,
  onAddImage,
  onAddShape,
  onSelectTemplate,
  onExport,
  currentTemplateId,
}) => {
  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-full">
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <LayoutTemplate className="w-6 h-6 text-indigo-600" />
          贴片图文模版
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <div>
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
            添加元素
          </h2>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={onAddText}
              className="flex flex-col items-center justify-center p-3 bg-gray-50 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors"
            >
              <Type className="w-5 h-5 mb-1" />
              <span className="text-xs">文字</span>
            </button>
            <button
              onClick={onAddImage}
              className="flex flex-col items-center justify-center p-3 bg-gray-50 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors"
            >
              <Image className="w-5 h-5 mb-1" />
              <span className="text-xs">图片</span>
            </button>
            <button
              onClick={onAddShape}
              className="flex flex-col items-center justify-center p-3 bg-gray-50 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors"
            >
              <Square className="w-5 h-5 mb-1" />
              <span className="text-xs">形状</span>
            </button>
          </div>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
            基础模版
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-xs font-medium text-gray-400 mb-2">小红书图文 (3:4)</h3>
              <div className="grid grid-cols-2 gap-2">
                {TEMPLATES.filter(t => t.category === 'xhs').map(template => (
                  <div
                    key={template.id}
                    onClick={() => onSelectTemplate(template)}
                    className={`cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                      currentTemplateId === template.id ? 'border-indigo-600 shadow-md' : 'border-transparent hover:border-gray-300'
                    }`}
                  >
                    <div className="aspect-[3/4] bg-gray-100 relative">
                      <img src={template.thumbnail} alt={template.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-1 text-[10px] text-center text-gray-600 truncate">
                      {template.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-medium text-gray-400 mb-2">微信贴片 (2.35:1)</h3>
              <div className="grid grid-cols-1 gap-2">
                {TEMPLATES.filter(t => t.category === 'wechat').map(template => (
                  <div
                    key={template.id}
                    onClick={() => onSelectTemplate(template)}
                    className={`cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                      currentTemplateId === template.id ? 'border-indigo-600 shadow-md' : 'border-transparent hover:border-gray-300'
                    }`}
                  >
                    <div className="aspect-[2.35/1] bg-gray-100 relative">
                      <img src={template.thumbnail} alt={template.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-1 text-[10px] text-center text-gray-600 truncate">
                      {template.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-gray-200">
        <button
          onClick={onExport}
          className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
        >
          <Download className="w-4 h-4" />
          导出图片
        </button>
      </div>
    </div>
  );
};
