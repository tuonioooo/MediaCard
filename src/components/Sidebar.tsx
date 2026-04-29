import React, { useState, useRef, useEffect } from 'react';
import { Type, Image as ImageIcon, Square, LayoutTemplate, Download, ChevronDown, Palette, Shapes, Settings as SettingsIcon } from 'lucide-react';
import { TEMPLATES } from '../constants';
import { CanvasState, Template, TextElement, ImageElement, ShapeElement } from '../types';

interface SidebarProps {
  state: CanvasState;
  onUpdateCanvas: (updates: Partial<CanvasState>) => void;
  onAddText: () => void;
  onAddImage: (src?: string) => void;
  onAddShape: () => void;
  onSelectTemplate: (template: Template) => void;
  onExport: (format: 'png' | 'jpeg' | 'webp') => void;
  currentTemplateId: string | null;
}

const TemplateThumbnail: React.FC<{ template: Template }> = ({ template }) => {
  const { state } = template;
  
  return (
    <div 
      className="w-full h-full relative overflow-hidden" 
      style={{
        background: state.background.type === 'color' ? state.background.value : undefined,
        backgroundImage: state.background.type === 'gradient' ? state.background.value : undefined,
      }}
    >
      {state.background.type === 'image' && (
        <img src={state.background.value} alt="bg" className="absolute inset-0 w-full h-full object-cover" referrerPolicy="no-referrer" />
      )}
      <svg viewBox={`0 0 ${state.width} ${state.height}`} className="absolute inset-0 w-full h-full pointer-events-none">
        <foreignObject x="0" y="0" width={state.width} height={state.height}>
          {/* @ts-ignore - foreignObject requires xmlns in some strict environments but works in React */}
          <div xmlns="http://www.w3.org/1999/xhtml" style={{ width: state.width, height: state.height, position: 'relative' }}>
            {state.elements.map(el => {
              const baseStyle: React.CSSProperties = {
                position: 'absolute',
                left: el.x,
                top: el.y,
                width: el.width,
                height: el.height,
                transform: `rotate(${el.rotation}deg)`,
                opacity: el.opacity,
                zIndex: el.zIndex,
              };

              if (el.type === 'text') {
                const textEl = el as TextElement;
                return (
                  <div key={el.id} style={{
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
                  }}>
                    {textEl.text}
                  </div>
                );
              } else if (el.type === 'image') {
                const imgEl = el as ImageElement;
                return (
                  <img key={el.id} src={imgEl.src} referrerPolicy="no-referrer" style={{
                    ...baseStyle,
                    objectFit: imgEl.objectFit,
                    borderRadius: imgEl.borderRadius,
                  }} />
                );
              } else if (el.type === 'shape') {
                const shapeEl = el as ShapeElement;
                return (
                  <div key={el.id} style={{
                    ...baseStyle,
                    backgroundColor: shapeEl.backgroundColor,
                    borderRadius: shapeEl.shapeType === 'circle' ? '50%' : shapeEl.borderRadius,
                  }} />
                );
              }
              return null;
            })}
          </div>
        </foreignObject>
      </svg>
    </div>
  );
};

const imageModules = import.meta.glob('/public/assets/*.{png,jpg,jpeg,svg,webp}', { eager: true });
const assetImages = Object.keys(imageModules).map(path => path.replace('/public', ''));

export const Sidebar: React.FC<SidebarProps> = ({
  state,
  onUpdateCanvas,
  onAddText,
  onAddImage,
  onAddShape,
  onSelectTemplate,
  onExport,
  currentTemplateId,
}) => {
  const [activeTab, setActiveTab] = useState<'templates' | 'images' | 'background' | 'elements' | 'settings'>('templates');
  const [templateFilter, setTemplateFilter] = useState<'all' | 'xhs' | 'wechat' | 'product'>('all');
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const exportMenuRef = useRef<HTMLDivElement>(null);
  const filterMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (exportMenuRef.current && !exportMenuRef.current.contains(event.target as Node)) {
        setShowExportMenu(false);
      }
      if (filterMenuRef.current && !filterMenuRef.current.contains(event.target as Node)) {
        setShowFilterMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleExportClick = (format: 'png' | 'jpeg' | 'webp') => {
    onExport(format);
    setShowExportMenu(false);
  };

  const navItems = [
    { id: 'templates', label: '模板', icon: LayoutTemplate },
    { id: 'images', label: '图库', icon: ImageIcon },
    { id: 'background', label: '背景', icon: Palette },
    { id: 'elements', label: '元素', icon: Shapes },
    { id: 'settings', label: '设置', icon: SettingsIcon },
  ] as const;

  return (
    <div className="flex h-full border-r border-gray-200 bg-white z-10 relative">
      {/* 侧边导航栏 */}
      <div className="w-[72px] bg-gray-50 border-r border-gray-200 flex flex-col items-center py-4 shrink-0 shadow-sm relative z-20">
        <div className="flex flex-col gap-6 w-full">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className="flex flex-col items-center gap-1.5 w-full relative group outline-none"
              >
                <div className={`p-2 rounded-xl transition-colors ${isActive ? 'bg-indigo-100 text-indigo-600' : 'text-gray-500 group-hover:bg-gray-200 group-hover:text-gray-800'}`}>
                  <Icon className="w-6 h-6" strokeWidth={isActive ? 2 : 1.5} />
                </div>
                <span className={`text-[11px] font-medium transition-colors ${isActive ? 'text-indigo-600' : 'text-gray-500 group-hover:text-gray-800'}`}>
                  {item.label}
                </span>
                {isActive && (
                  <div className="absolute left-0 top-[20%] bottom-[20%] w-1 bg-indigo-600 rounded-r-md" />
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* 面板内容 */}
      <div className="w-[280px] flex flex-col shrink-0 bg-white shadow-[1px_0_10px_rgba(0,0,0,0.02)] relative z-10 transition-all duration-300">
        <div className="p-4 border-b border-gray-100 bg-white">
          <h2 className="text-sm font-bold text-gray-800">
            {navItems.find(i => i.id === activeTab)?.label}
          </h2>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 max-w-full">
          {activeTab === 'templates' && (
            <div className="flex flex-col h-full">
              <div className="flex gap-2 shrink-0 mb-4 items-center">
                <button
                  onClick={() => setTemplateFilter('all')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors whitespace-nowrap ${templateFilter === 'all' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                  全部
                </button>
                <button
                  onClick={() => setTemplateFilter('xhs')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors whitespace-nowrap ${templateFilter === 'xhs' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                  小红书
                </button>
                <div className="relative" ref={filterMenuRef}>
                  <button
                    onClick={() => setShowFilterMenu(!showFilterMenu)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors whitespace-nowrap flex items-center gap-1.5 ${!['all', 'xhs'].includes(templateFilter) ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                  >
                    {!['all', 'xhs'].includes(templateFilter) ? (templateFilter === 'wechat' ? '微信贴片' : templateFilter === 'product' ? '商品卡片' : '其他') : '更多'}
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>

                  {showFilterMenu && (
                    <div className="absolute top-full left-0 mt-1 w-32 bg-white border border-gray-200 rounded-lg shadow-xl overflow-hidden z-50">
                      <button
                        onClick={() => { setTemplateFilter('product'); setShowFilterMenu(false); }}
                        className={`w-full text-left px-4 py-2 hover:bg-indigo-50 text-xs font-medium transition-colors ${templateFilter === 'product' ? 'text-indigo-600' : 'text-gray-800'}`}
                      >
                        商品卡片
                      </button>
                      <button
                        onClick={() => { setTemplateFilter('wechat'); setShowFilterMenu(false); }}
                        className={`w-full text-left px-4 py-2 hover:bg-indigo-50 text-xs font-medium transition-colors ${templateFilter === 'wechat' ? 'text-indigo-600' : 'text-gray-800'}`}
                      >
                        微信贴片
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex-1 overflow-y-auto pb-8 grid grid-cols-2 gap-3 auto-rows-max items-start">
                {TEMPLATES.filter(t => templateFilter === 'all' || t.category === templateFilter).map(template => (
                  <div
                    key={template.id}
                    onClick={() => onSelectTemplate(template)}
                    className={`cursor-pointer rounded-lg overflow-hidden border-2 transition-all hover:shadow-md ${template.category === 'wechat' ? 'col-span-2' : 'col-span-1'} ${
                      currentTemplateId === template.id ? 'border-indigo-600 shadow-sm' : 'border-gray-100 hover:border-indigo-300'
                    }`}
                  >
                    <div className="bg-gray-50 relative" style={{ aspectRatio: `${template.state.width}/${template.state.height}` }}>
                      <TemplateThumbnail template={template} />
                    </div>
                    <div className="p-1.5 text-[10px] text-center text-gray-600 bg-white truncate">
                      {template.category === 'xhs' ? '📕 ' : template.category === 'product' ? '🛍️ ' : '💬 '}{template.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'images' && (
            <div className="flex flex-col h-full space-y-4">
              <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border border-gray-100">
                <span className="text-xs text-gray-500">从图库中选择图片添加到画布</span>
              </div>
              <div className="flex-1 overflow-y-auto pb-8 grid grid-cols-2 gap-3 auto-rows-max items-start">
                {assetImages.length > 0 ? (
                  assetImages.map((src, idx) => (
                    <div
                      key={idx}
                      onClick={() => onAddImage(src)}
                      className="cursor-pointer rounded-lg overflow-hidden border border-gray-200 transition-all hover:shadow-md hover:border-indigo-400 group relative"
                    >
                      <div className="aspect-square bg-gray-50 flex justify-center items-center overflow-hidden">
                        <img src={src} alt="Gallery item" className="w-full h-full object-cover transition-transform group-hover:scale-105" loading="lazy" />
                      </div>
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                        <span className="text-white text-xs font-medium px-2 py-1 bg-black/40 rounded-full backdrop-blur-sm">添加</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-2 py-8 text-center text-gray-400 text-xs">
                    图库中没有图片
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'background' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-2">背景类型</label>
                <select
                  value={state.background.type}
                  onChange={(e) => onUpdateCanvas({ background: { ...state.background, type: e.target.value as any } })}
                  className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                >
                  <option value="color">纯色</option>
                  <option value="gradient">渐变</option>
                  <option value="image">图片</option>
                </select>
              </div>

              {state.background.type === 'color' && (
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-2">颜色</label>
                  <div className="flex items-center gap-2">
                    <input type="color" value={state.background.value} onChange={(e) => onUpdateCanvas({ background: { ...state.background, value: e.target.value } })} className="w-8 h-8 rounded cursor-pointer border-0 p-0" />
                    <input type="text" value={state.background.value} onChange={(e) => onUpdateCanvas({ background: { ...state.background, value: e.target.value } })} className="flex-1 px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 uppercase" />
                  </div>
                </div>
              )}

              {state.background.type === 'gradient' && (
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-2">渐变 CSS</label>
                  <input type="text" value={state.background.value} onChange={(e) => onUpdateCanvas({ background: { ...state.background, value: e.target.value } })} placeholder="linear-gradient(to right, #ff7e5f, #feb47b)" className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500" />
                </div>
              )}

              {state.background.type === 'image' && (
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-2">图片 URL</label>
                  <input type="text" value={state.background.value} onChange={(e) => onUpdateCanvas({ background: { ...state.background, value: e.target.value } })} placeholder="https://..." className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500" />
                </div>
              )}
            </div>
          )}

          {activeTab === 'elements' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  添加新元素
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  <button onClick={() => onAddText()} className="flex flex-col items-center justify-center p-3 bg-gray-50 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors border border-gray-100 hover:border-indigo-100 group">
                    <Type className="w-5 h-5 mb-1.5 text-gray-500 group-hover:text-indigo-500" />
                    <span className="text-[10px] font-medium text-gray-700 group-hover:text-indigo-600">文字</span>
                  </button>
                  <button onClick={() => onAddImage()} className="flex flex-col items-center justify-center p-3 bg-gray-50 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors border border-gray-100 hover:border-indigo-100 group">
                    <ImageIcon className="w-5 h-5 mb-1.5 text-gray-500 group-hover:text-indigo-500" />
                    <span className="text-[10px] font-medium text-gray-700 group-hover:text-indigo-600">图片</span>
                  </button>
                  <button onClick={() => onAddShape()} className="flex flex-col items-center justify-center p-3 bg-gray-50 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors border border-gray-100 hover:border-indigo-100 group">
                    <Square className="w-5 h-5 mb-1.5 text-gray-500 group-hover:text-indigo-500" />
                    <span className="text-[10px] font-medium text-gray-700 group-hover:text-indigo-600">形状</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6">
               <div className="p-5 bg-gray-50 rounded-xl border border-gray-100">
                 <h3 className="text-sm font-semibold text-gray-800 mb-2">图片导出</h3>
                 <p className="text-xs text-gray-500 mb-4 leading-relaxed">
                   将当前画布内容导出为各种高清晰度格式。
                 </p>
                 <div className="space-y-2 relative" ref={exportMenuRef}>
                    <button
                      onClick={() => setShowExportMenu(!showExportMenu)}
                      className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium flex items-center justify-center gap-2 transition-colors text-sm shadow-sm"
                    >
                      <Download className="w-4 h-4" />
                      导出当前画布
                      <ChevronDown className="w-3.5 h-3.5 ml-1 opacity-80" />
                    </button>

                    {showExportMenu && (
                      <div className="absolute top-[110%] left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-xl overflow-hidden z-50">
                        <button
                          onClick={() => handleExportClick('png')}
                          className="w-full text-left px-4 py-3 hover:bg-indigo-50 text-sm font-medium text-gray-800 border-b border-gray-100 transition-colors flex flex-col group"
                        >
                          PNG 格式
                          <span className="text-[10px] text-gray-400 group-hover:text-indigo-400 mt-0.5">高质量,支持透明</span>
                        </button>
                        <button
                          onClick={() => handleExportClick('jpeg')}
                          className="w-full text-left px-4 py-3 hover:bg-indigo-50 text-sm font-medium text-gray-800 border-b border-gray-100 transition-colors flex flex-col group"
                        >
                          JPG 格式
                          <span className="text-[10px] text-gray-400 group-hover:text-indigo-400 mt-0.5">体积小,白底</span>
                        </button>
                        <button
                          onClick={() => handleExportClick('webp')}
                          className="w-full text-left px-4 py-3 hover:bg-indigo-50 text-sm font-medium text-gray-800 transition-colors flex flex-col group"
                        >
                          WebP 格式
                          <span className="text-[10px] text-gray-400 group-hover:text-indigo-400 mt-0.5">现代格式</span>
                        </button>
                      </div>
                    )}
                 </div>
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
