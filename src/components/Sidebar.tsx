import React, { useState, useRef, useEffect } from 'react';
import { 
  Type, 
  Image as ImageIcon, 
  Square, 
  LayoutTemplate, 
  Download, 
  ChevronDown, 
  Palette, 
  Shapes, 
  Settings as SettingsIcon,
  RotateCcw,
  Check,
  Copy,
  CheckCircle2,
  Loader2,
  Sliders,
  ArrowLeftRight,
  Lock,
  Unlock,
  Link as LinkIcon,
  Unlink,
  Maximize2,
  Maximize,
  Minimize2,
  ZoomIn,
  ZoomOut
} from 'lucide-react';
import { TEMPLATES } from '../constants';
import { CanvasState, Template, TextElement, ImageElement, ShapeElement, ExportOptions } from '../types';

interface SidebarProps {
  state: CanvasState;
  onUpdateCanvas: (updates: Partial<CanvasState>) => void;
  onScaleContent?: (multiplier: number) => void;
  onFitContent?: (mode: 'cover' | 'contain') => void;
  onAddText: () => void;
  onAddImage: (src?: string) => void;
  onAddShape: () => void;
  onSelectTemplate: (template: Template) => void;
  onExport: (options: ExportOptions | 'png' | 'jpeg' | 'webp') => Promise<boolean> | void;
  onCopyImage?: (options: ExportOptions) => Promise<boolean>;
  currentTemplateId: string | null;
}

const RATIO_PRESETS = [
  {
    id: '9:16',
    name: '9:16',
    tag: 'Story / 全屏',
    desc: '竖屏全屏',
    width: 1080,
    height: 1920,
    iconW: 11,
    iconH: 19,
  },
  {
    id: '3:4',
    name: '3:4',
    tag: '长图 / 贴片',
    desc: '推荐长图',
    width: 1080,
    height: 1440,
    iconW: 13,
    iconH: 17,
  },
  {
    id: '4:5',
    name: '4:5',
    tag: '小红书 / IG',
    desc: '社媒肖像',
    width: 1080,
    height: 1350,
    iconW: 13,
    iconH: 16,
  },
  {
    id: '1:1',
    name: '1:1',
    tag: '方形 / 头像',
    desc: '通用正方',
    width: 1080,
    height: 1080,
    iconW: 14,
    iconH: 14,
  },
];

const QUICK_CUSTOM_SIZES = [
  { label: '16:9 横屏', width: 1920, height: 1080 },
  { label: '9:16 竖屏', width: 1080, height: 1920 },
  { label: '1:1 正方', width: 1080, height: 1080 },
  { label: '4:3 经典', width: 1200, height: 900 },
  { label: '2:1 横幅', width: 1200, height: 600 },
  { label: '4:5 社媒', width: 1080, height: 1350 },
];

const RESOLUTION_OPTIONS = [
  { scale: 1, label: '标准', multiplier: '1x' },
  { scale: 2, label: '高清', multiplier: '2x', recommended: true },
  { scale: 3, label: '超清', multiplier: '3x' },
];

const FORMAT_OPTIONS = [
  { id: 'png', label: 'PNG', note: '高画质·支持透明' },
  { id: 'jpeg', label: 'JPG', note: '体积小·白底' },
  { id: 'webp', label: 'WebP', note: '现代高压缩' },
] as const;


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
  onScaleContent,
  onFitContent,
  onAddText,
  onAddImage,
  onAddShape,
  onSelectTemplate,
  onExport,
  onCopyImage,
  currentTemplateId,
}) => {
  const [activeTab, setActiveTab] = useState<'templates' | 'images' | 'background' | 'elements' | 'settings'>('templates');
  const [templateFilter, setTemplateFilter] = useState<'all' | 'xhs' | 'wechat' | 'product'>('all');
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const exportMenuRef = useRef<HTMLDivElement>(null);
  const filterMenuRef = useRef<HTMLDivElement>(null);

  // Export Settings state
  const [exportScale, setExportScale] = useState<number>(2);
  const [exportFormat, setExportFormat] = useState<'png' | 'jpeg' | 'webp'>('png');
  const [exportFilename, setExportFilename] = useState<string>('mediacard');
  const [transparentBg, setTransparentBg] = useState<boolean>(false);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [isCopying, setIsCopying] = useState<boolean>(false);
  const [exportSuccess, setExportSuccess] = useState<boolean>(false);
  const [copySuccess, setCopySuccess] = useState<boolean>(false);

  // Custom Canvas Dimensions state
  const [inputW, setInputW] = useState<string>(String(state.width));
  const [inputH, setInputH] = useState<string>(String(state.height));
  const [isRatioLocked, setIsRatioLocked] = useState<boolean>(false);

  // Sync inputs when canvas dimensions change externally (presets, templates, topbar)
  useEffect(() => {
    setInputW(String(state.width));
    setInputH(String(state.height));
  }, [state.width, state.height]);

  const currentRatio = state.width / state.height;
  const activePreset = RATIO_PRESETS.find(p => Math.abs((p.width / p.height) - currentRatio) < 0.02);

  const handleWidthInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputW(e.target.value);
  };

  const handleWidthCommit = () => {
    const num = parseInt(inputW, 10);
    if (!isNaN(num) && num >= 100 && num <= 8000) {
      if (isRatioLocked && state.height > 0 && state.width > 0) {
        const ratio = state.width / state.height;
        const newH = Math.round(num / ratio);
        setInputH(String(newH));
        onUpdateCanvas({ width: num, height: newH });
      } else {
        onUpdateCanvas({ width: num });
      }
    } else {
      setInputW(String(state.width));
    }
  };

  const handleHeightInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputH(e.target.value);
  };

  const handleHeightCommit = () => {
    const num = parseInt(inputH, 10);
    if (!isNaN(num) && num >= 100 && num <= 8000) {
      if (isRatioLocked && state.height > 0 && state.width > 0) {
        const ratio = state.width / state.height;
        const newW = Math.round(num * ratio);
        setInputW(String(newW));
        onUpdateCanvas({ width: newW, height: num });
      } else {
        onUpdateCanvas({ height: num });
      }
    } else {
      setInputH(String(state.height));
    }
  };

  const handleSwapDimensions = () => {
    const newW = state.height;
    const newH = state.width;
    setInputW(String(newW));
    setInputH(String(newH));
    onUpdateCanvas({ width: newW, height: newH });
  };

  const handleApplyCustomSize = (w: number, h: number) => {
    setInputW(String(w));
    setInputH(String(h));
    onUpdateCanvas({ width: w, height: h });
  };

  const handleRestoreTemplate = () => {
    const target = TEMPLATES.find(t => t.id === currentTemplateId) || TEMPLATES[0];
    onSelectTemplate(target);
    setInputW(String(target.state.width));
    setInputH(String(target.state.height));
  };

  const handleResetDefaults = () => {
    const target = TEMPLATES.find(t => t.id === currentTemplateId) || TEMPLATES[0];
    onUpdateCanvas({ width: target.state.width, height: target.state.height });
    setInputW(String(target.state.width));
    setInputH(String(target.state.height));
    setIsRatioLocked(false);
    setExportScale(2);
    setExportFormat('png');
    setExportFilename('mediacard');
    setTransparentBg(false);
  };

  const handleDoExport = async () => {
    setIsExporting(true);
    try {
      await onExport({
        format: exportFormat,
        scale: exportScale,
        filename: exportFilename.trim() || 'mediacard',
        transparent: transparentBg && exportFormat !== 'jpeg',
      });
      setExportSuccess(true);
      setTimeout(() => setExportSuccess(false), 3000);
    } finally {
      setIsExporting(false);
    }
  };

  const handleDoCopy = async () => {
    if (!onCopyImage) return;
    setIsCopying(true);
    try {
      const ok = await onCopyImage({
        format: exportFormat,
        scale: exportScale,
        filename: exportFilename.trim() || 'mediacard',
        transparent: transparentBg && exportFormat !== 'jpeg',
      });
      if (ok) {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 3000);
      }
    } finally {
      setIsCopying(false);
    }
  };

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
      <div className={`${activeTab === 'settings' ? 'w-[320px]' : 'w-[280px]'} flex flex-col shrink-0 bg-white shadow-[1px_0_10px_rgba(0,0,0,0.02)] relative z-10 transition-all duration-300`}>
        <div className="p-4 border-b border-gray-100 bg-white flex items-center justify-between">
          <h2 className="text-sm font-bold text-gray-800">
            {activeTab === 'settings' ? '导出设置' : navItems.find(i => i.id === activeTab)?.label}
          </h2>
          {activeTab === 'settings' && (
            <button
              onClick={handleResetDefaults}
              className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors group cursor-pointer"
              title="重置为默认导出设置"
            >
              <RotateCcw className="w-3.5 h-3.5 group-hover:-rotate-90 transition-transform duration-300" />
              <span>恢复默认</span>
            </button>
          )}
        </div>

        
        <div className="flex-1 overflow-y-auto p-4 max-w-full">
          {activeTab === 'templates' && (
            <div className="flex flex-col h-full">
              <div className="flex gap-1.5 shrink-0 mb-4 items-center overflow-x-auto pb-1">
                <button
                  onClick={() => setTemplateFilter('all')}
                  className={`px-2.5 py-1 text-xs font-medium rounded-full transition-colors whitespace-nowrap ${templateFilter === 'all' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                  全部 ({TEMPLATES.length})
                </button>
                <button
                  onClick={() => setTemplateFilter('wechat')}
                  className={`px-2.5 py-1 text-xs font-medium rounded-full transition-colors whitespace-nowrap ${templateFilter === 'wechat' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                  微信贴片 ({TEMPLATES.filter(t => t.category === 'wechat').length})
                </button>
                <button
                  onClick={() => setTemplateFilter('xhs')}
                  className={`px-2.5 py-1 text-xs font-medium rounded-full transition-colors whitespace-nowrap ${templateFilter === 'xhs' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                  小红书 ({TEMPLATES.filter(t => t.category === 'xhs').length})
                </button>
                <button
                  onClick={() => setTemplateFilter('product')}
                  className={`px-2.5 py-1 text-xs font-medium rounded-full transition-colors whitespace-nowrap ${templateFilter === 'product' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                  商品卡片 ({TEMPLATES.filter(t => t.category === 'product').length})
                </button>
              </div>

              <div className="flex-1 overflow-y-auto pb-8 grid grid-cols-2 gap-3 auto-rows-max items-start">
                {TEMPLATES.filter(t => templateFilter === 'all' || t.category === templateFilter).map(template => (
                  <div
                    key={template.id}
                    onClick={() => onSelectTemplate(template)}
                    className={`cursor-pointer rounded-lg overflow-hidden border-2 transition-all hover:shadow-md ${template.state.width > template.state.height ? 'col-span-2' : 'col-span-1'} ${
                      currentTemplateId === template.id ? 'border-indigo-600 shadow-sm' : 'border-gray-100 hover:border-indigo-300'
                    }`}
                  >
                    <div className="bg-gray-50 relative" style={{ aspectRatio: `${template.state.width}/${template.state.height}` }}>
                      <TemplateThumbnail template={template} />
                    </div>
                    <div className="p-1.5 text-[10px] text-center text-gray-700 font-medium bg-white truncate" title={template.name}>
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
            <div className="space-y-4 pb-6">
              {/* 1. 画布比例与自定义尺寸 */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <label className="text-xs font-bold text-gray-800">
                      画布比例与尺寸
                    </label>
                    {!activePreset && (
                      <span className="text-[10px] px-1.5 py-0.2 bg-amber-50 text-amber-700 border border-amber-200/80 rounded font-medium">
                        自定义
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-gray-400 font-mono">
                    {state.width} × {state.height} px
                  </span>
                </div>

                {/* 常用比例卡片 2x2 */}
                <div className="grid grid-cols-2 gap-2 mb-2.5">
                  {RATIO_PRESETS.map((preset) => {
                    const isSelected = activePreset?.id === preset.id;
                    return (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => {
                          setInputW(String(preset.width));
                          setInputH(String(preset.height));
                          onUpdateCanvas({ width: preset.width, height: preset.height });
                        }}
                        className={`flex flex-col text-left p-2.5 rounded-xl border transition-all relative cursor-pointer ${
                          isSelected
                            ? 'border-indigo-600 bg-indigo-50/70 text-indigo-950 ring-1 ring-indigo-500/30 shadow-xs'
                            : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50/70 text-gray-700'
                        }`}
                      >
                        <div className="flex items-center justify-between w-full mb-1">
                          <div className="flex items-center gap-1.5">
                            <div
                              className={`rounded-[2px] border-[1.5px] transition-colors ${
                                isSelected ? 'border-indigo-600 bg-indigo-100/40' : 'border-gray-500'
                              }`}
                              style={{ width: `${preset.iconW}px`, height: `${preset.iconH}px` }}
                            />
                            <span className="text-xs font-bold">{preset.name}</span>
                          </div>
                          {isSelected && (
                            <span className="w-3.5 h-3.5 rounded-full bg-indigo-600 text-white flex items-center justify-center shrink-0">
                              <Check className="w-2.5 h-2.5" strokeWidth={3} />
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-gray-500 mb-1.5 font-mono">
                          {preset.width} × {preset.height}
                        </div>
                        <span
                          className={`text-[10px] self-start px-1.5 py-0.5 rounded font-medium ${
                            isSelected
                              ? 'bg-indigo-100/90 text-indigo-700'
                              : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {preset.tag}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* 自定义尺寸模块 */}
                <div className="p-3 bg-gray-50/90 rounded-xl border border-gray-200/90 shadow-2xs">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5">
                      <Sliders className="w-3.5 h-3.5 text-indigo-600" />
                      <span className="text-xs font-bold text-gray-700">自定义宽高</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={handleSwapDimensions}
                        title="翻转横竖屏 (互换宽高)"
                        className="px-1.5 py-0.5 text-gray-600 hover:text-indigo-600 bg-white hover:bg-indigo-50/60 rounded border border-gray-200 hover:border-indigo-200 transition-all text-[10px] font-medium flex items-center gap-1 cursor-pointer shadow-2xs"
                      >
                        <ArrowLeftRight className="w-3 h-3" />
                        <span>翻转</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsRatioLocked(!isRatioLocked)}
                        title={isRatioLocked ? '已锁定比例，修改单边将自动等比缩放' : '未锁定比例，可自由调节宽高'}
                        className={`px-1.5 py-0.5 rounded border transition-all text-[10px] font-medium flex items-center gap-1 cursor-pointer shadow-2xs ${
                          isRatioLocked
                            ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                            : 'bg-white text-gray-600 hover:text-gray-800 border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {isRatioLocked ? <Lock className="w-3 h-3 text-indigo-600" /> : <Unlock className="w-3 h-3 text-gray-400" />}
                        <span>{isRatioLocked ? '等比' : '自由'}</span>
                      </button>
                    </div>
                  </div>

                  {/* 宽高输入框 */}
                  <div className="grid grid-cols-2 gap-2 mb-2">
                    <div>
                      <div className="flex items-center justify-between text-[10px] text-gray-500 mb-1">
                        <span className="font-medium">宽度 (W)</span>
                        <span className="text-gray-400 font-mono">PX</span>
                      </div>
                      <div className="relative flex items-center">
                        <input
                          type="number"
                          min={100}
                          max={8000}
                          step={10}
                          value={inputW}
                          onChange={handleWidthInputChange}
                          onBlur={handleWidthCommit}
                          onKeyDown={(e) => e.key === 'Enter' && handleWidthCommit()}
                          className="w-full px-2.5 py-1.5 text-xs font-mono font-semibold bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 text-gray-800 shadow-2xs"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between text-[10px] text-gray-500 mb-1">
                        <span className="font-medium">高度 (H)</span>
                        <span className="text-gray-400 font-mono">PX</span>
                      </div>
                      <div className="relative flex items-center">
                        <input
                          type="number"
                          min={100}
                          max={8000}
                          step={10}
                          value={inputH}
                          onChange={handleHeightInputChange}
                          onBlur={handleHeightCommit}
                          onKeyDown={(e) => e.key === 'Enter' && handleHeightCommit()}
                          className="w-full px-2.5 py-1.5 text-xs font-mono font-semibold bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 text-gray-800 shadow-2xs"
                        />
                      </div>
                    </div>
                  </div>

                  {/* 快捷自定义尺寸预设 */}
                  <div className="pt-2 border-t border-gray-200/70">
                    <div className="text-[10px] text-gray-500 mb-1.5 flex items-center justify-between">
                      <span>常用快速填充：</span>
                      <span className="text-gray-400 font-mono text-[9px]">
                        比例 {(state.width / state.height).toFixed(2)}:1
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {QUICK_CUSTOM_SIZES.map((sz) => {
                        const isMatch = state.width === sz.width && state.height === sz.height;
                        return (
                          <button
                            key={sz.label}
                            type="button"
                            onClick={() => handleApplyCustomSize(sz.width, sz.height)}
                            className={`text-[10px] px-2 py-0.5 rounded-md border transition-all cursor-pointer font-medium ${
                              isMatch
                                ? 'bg-indigo-600 text-white border-indigo-600 shadow-2xs'
                                : 'bg-white text-gray-600 border-gray-200 hover:border-indigo-300 hover:text-indigo-600'
                            }`}
                            title={`${sz.label} (${sz.width} × ${sz.height} px)`}
                          >
                            {sz.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* 一键恢复模板原始排版 */}
                  <button
                    type="button"
                    onClick={handleRestoreTemplate}
                    className="w-full mt-2.5 py-1.5 px-3 bg-white hover:bg-amber-50 text-amber-800 hover:text-amber-900 border border-amber-200/90 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                    title="重新载入当前模板的标准尺寸与排版，撤销意外变形"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-amber-600" />
                    <span>一键还原当前模板排版与尺寸</span>
                  </button>
                </div>
              </div>

              {/* 2. 内容整体等比缩放与画面排版 */}
              <div className="p-3 bg-indigo-50/60 rounded-xl border border-indigo-100 shadow-2xs">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-1.5">
                    <Maximize2 className="w-3.5 h-3.5 text-indigo-600" />
                    <span className="text-xs font-bold text-gray-800">内容等比缩放</span>
                  </div>
                  <span className="text-[10px] text-indigo-700 bg-indigo-100/80 px-1.5 py-0.5 rounded font-semibold">
                    撑满画布 · 消除空隙
                  </span>
                </div>
                <p className="text-[11px] text-gray-500 mb-2 leading-snug">
                  切换为 9:16 或自定义尺寸后，可一键等比例放大内容撑满画布，视觉更饱满大气。
                </p>

                {/* 快捷等比微调按钮 */}
                <div className="grid grid-cols-4 gap-1.5 mb-2">
                  <button
                    type="button"
                    onClick={() => onScaleContent?.(0.95)}
                    title="等比缩小 5%"
                    className="py-1 px-1 bg-white hover:bg-gray-50 text-gray-700 rounded-lg border border-gray-200 text-xs font-semibold flex items-center justify-center gap-0.5 cursor-pointer transition-colors shadow-2xs"
                  >
                    <ZoomOut className="w-3 h-3 text-gray-500" />
                    <span>-5%</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onScaleContent?.(1.05)}
                    title="等比放大 5%"
                    className="py-1 px-1 bg-white hover:bg-gray-50 text-gray-700 rounded-lg border border-gray-200 text-xs font-semibold flex items-center justify-center gap-0.5 cursor-pointer transition-colors shadow-2xs"
                  >
                    <ZoomIn className="w-3 h-3 text-gray-500" />
                    <span>+5%</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onScaleContent?.(1.15)}
                    title="等比放大 15%"
                    className="py-1 px-1 bg-white hover:bg-indigo-50 text-indigo-700 rounded-lg border border-indigo-200 text-xs font-semibold flex items-center justify-center cursor-pointer transition-colors shadow-2xs"
                  >
                    <span>+15%</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onScaleContent?.(1.30)}
                    title="等比放大 30%"
                    className="py-1 px-1 bg-white hover:bg-indigo-50 text-indigo-700 rounded-lg border border-indigo-200 text-xs font-semibold flex items-center justify-center cursor-pointer transition-colors shadow-2xs"
                  >
                    <span>+30%</span>
                  </button>
                </div>

                {/* 一键等比撑满 / 居中适应 */}
                <div className="grid grid-cols-2 gap-1.5">
                  <button
                    type="button"
                    onClick={() => onFitContent?.('cover')}
                    className="py-1.5 px-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1 cursor-pointer transition-all shadow-xs"
                    title="将画布所有图文内容等比放大撑满画布边界"
                  >
                    <Maximize className="w-3.5 h-3.5" />
                    <span>一键等比撑满</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onFitContent?.('contain')}
                    className="py-1.5 px-2 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 cursor-pointer transition-all shadow-2xs"
                    title="等比缩放并保留合适安全留白"
                  >
                    <Minimize2 className="w-3.5 h-3.5 text-gray-500" />
                    <span>安全留白居中</span>
                  </button>
                </div>
              </div>

              {/* 3. 导出清晰度 */}
              <div>
                <label className="block text-xs font-bold text-gray-800 mb-1.5">
                  导出清晰度
                </label>
                <div className="grid grid-cols-3 gap-1.5 p-1 bg-gray-100 rounded-xl">
                  {RESOLUTION_OPTIONS.map((opt) => {
                    const isSelected = exportScale === opt.scale;
                    return (
                      <button
                        key={opt.scale}
                        type="button"
                        onClick={() => setExportScale(opt.scale)}
                        className={`py-1.5 px-2 rounded-lg text-xs font-medium transition-all relative flex flex-col items-center justify-center cursor-pointer ${
                          isSelected
                            ? 'bg-white text-indigo-600 font-semibold shadow-xs'
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        <div className="flex items-center gap-1">
                          <span>{opt.label}</span>
                          <span className="text-[10px] opacity-70">({opt.multiplier})</span>
                        </div>
                        {opt.recommended && (
                          <span className="absolute -top-2 right-1 px-1 py-[1px] bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[9px] font-bold rounded-full scale-90 leading-none">
                            推荐
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
                <div className="mt-2 px-3 py-1.5 bg-indigo-50/60 rounded-lg border border-indigo-100/80 flex items-center justify-between text-[11px] text-indigo-900">
                  <span className="text-gray-500">实际导出尺寸</span>
                  <span className="font-semibold text-indigo-700 font-mono">
                    {Math.round(state.width * exportScale)} × {Math.round(state.height * exportScale)} px
                  </span>
                </div>
              </div>

              {/* 3. 导出格式 */}
              <div>
                <label className="block text-xs font-bold text-gray-800 mb-1.5">
                  导出格式
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {FORMAT_OPTIONS.map((fmt) => {
                    const isSelected = exportFormat === fmt.id;
                    return (
                      <button
                        key={fmt.id}
                        type="button"
                        onClick={() => {
                          setExportFormat(fmt.id);
                          if (fmt.id === 'jpeg') {
                            setTransparentBg(false);
                          }
                        }}
                        className={`p-2 rounded-xl border text-left transition-all cursor-pointer ${
                          isSelected
                            ? 'border-indigo-600 bg-indigo-50/70 text-indigo-950 ring-1 ring-indigo-500/30'
                            : 'border-gray-200 bg-white hover:border-gray-300 text-gray-700'
                        }`}
                      >
                        <div className="text-xs font-bold mb-0.5">{fmt.label}</div>
                        <div className="text-[10px] text-gray-400 leading-tight">{fmt.note}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 4. 文件名称 */}
              <div>
                <label className="block text-xs font-bold text-gray-800 mb-1.5">
                  文件名称
                </label>
                <input
                  type="text"
                  value={exportFilename}
                  onChange={(e) => setExportFilename(e.target.value)}
                  placeholder="输入文件名，默认 mediacard"
                  className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50/50 hover:bg-white focus:bg-white transition-colors"
                />
                <div className="mt-1 text-[10px] text-gray-400 truncate font-mono">
                  预览: {(exportFilename.trim() || 'mediacard')}_{Math.round(state.width * exportScale)}x{Math.round(state.height * exportScale)}.{exportFormat === 'jpeg' ? 'jpg' : exportFormat}
                </div>
              </div>

              {/* 5. 透明背景开关 */}
              <div
                className={`p-3 rounded-xl border transition-all ${
                  exportFormat === 'jpeg'
                    ? 'bg-gray-50/70 border-gray-200 opacity-60'
                    : transparentBg
                      ? 'bg-indigo-50/60 border-indigo-200 ring-1 ring-indigo-500/20'
                      : 'bg-gray-50/70 border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="pr-2">
                    <div className="text-xs font-bold text-gray-800 flex items-center gap-1.5">
                      <span>透明背景</span>
                      {transparentBg && exportFormat !== 'jpeg' && (
                        <span className="text-[9px] bg-indigo-100 text-indigo-700 px-1 py-0.2 rounded font-medium">
                          透明
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] text-gray-400 mt-0.5 leading-snug">
                      {exportFormat === 'jpeg'
                        ? 'JPG 格式不支持透明，请选择 PNG'
                        : '忽略背景色与底图，输出透明图层'}
                    </p>
                  </div>
                  <button
                    type="button"
                    disabled={exportFormat === 'jpeg'}
                    onClick={() => setTransparentBg(!transparentBg)}
                    className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      transparentBg && exportFormat !== 'jpeg' ? 'bg-indigo-600' : 'bg-gray-300'
                    } ${exportFormat === 'jpeg' ? 'cursor-not-allowed' : ''}`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        transparentBg && exportFormat !== 'jpeg' ? 'translate-x-4' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* 6. 操作按钮 */}
              <div className="space-y-2 pt-1">
                <button
                  type="button"
                  onClick={handleDoExport}
                  disabled={isExporting}
                  className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] disabled:opacity-70 text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-all text-xs shadow-md shadow-indigo-200 cursor-pointer"
                >
                  {isExporting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>正在导出高清图片...</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      <span>立即导出图片 ({exportFormat.toUpperCase()} · {exportScale}x)</span>
                    </>
                  )}
                </button>

                {onCopyImage && (
                  <button
                    type="button"
                    onClick={handleDoCopy}
                    disabled={isCopying || isExporting}
                    className="w-full py-2 px-3 border border-gray-200 hover:border-gray-300 hover:bg-gray-50 active:scale-[0.99] disabled:opacity-70 text-gray-700 rounded-xl font-medium flex items-center justify-center gap-1.5 transition-all text-xs cursor-pointer"
                  >
                    {isCopying ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin text-gray-500" />
                        <span>正在生成并复制...</span>
                      </>
                    ) : copySuccess ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700 font-semibold">已复制到剪贴板！</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-gray-500" />
                        <span>复制图片到剪贴板</span>
                      </>
                    )}
                  </button>
                )}

                {/* 状态反馈 */}
                {exportSuccess && (
                  <div className="py-1.5 px-2.5 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-700 text-[11px] font-medium flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>图片导出成功，已保存到本地！</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
