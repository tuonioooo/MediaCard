import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Link as LinkIcon, Unlink, LayoutTemplate } from 'lucide-react';

interface TopBarProps {
  width: number;
  height: number;
  onUpdateCanvas: (updates: { width?: number; height?: number }) => void;
}

const RATIOS = [
  { label: '智能', value: 'custom' },
  { label: '21:9', value: 21 / 9 },
  { label: '16:9', value: 16 / 9 },
  { label: '3:2', value: 3 / 2 },
  { label: '4:3', value: 4 / 3 },
  { label: '1:1', value: 1 / 1 },
  { label: '3:4', value: 3 / 4 },
  { label: '2:3', value: 2 / 3 },
  { label: '9:16', value: 9 / 16 },
];

const RESOLUTIONS = [
  { label: '高清 2K', longEdge: 2560 },
  { label: '超清 4K', longEdge: 3840 },
];

const RatioIcon = ({ ratio }: { ratio: number | 'custom' }) => {
  if (ratio === 'custom') {
    return (
      <div className="w-[16px] h-[16px] border-[1.5px] border-current rounded-[3px] border-dashed flex items-center justify-center">
        <div className="w-1.5 h-1.5 bg-current rounded-[1px]" />
      </div>
    );
  }
  const isWide = ratio > 1;
  const width = isWide ? 18 : Math.max(18 * ratio, 6);
  const height = isWide ? Math.max(18 / ratio, 6) : 18;
  return (
    <div
      className="border-[1.5px] border-current rounded-[3px]"
      style={{ width: `${width}px`, height: `${height}px` }}
    />
  );
};

export const TopBar: React.FC<TopBarProps> = ({ width, height, onUpdateCanvas }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLocked, setIsLocked] = useState(true);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentRatioValue = width / height;
  
  // Find closest ratio using a small tolerance for floating point comparison
  const closestRatio = RATIOS.find((r) => {
    if (r.value === 'custom') return false;
    // Calculate the actual ratio value (e.g., 3/4 = 0.75)
    return Math.abs((r.value as number) - currentRatioValue) < 0.01;
  });
  
  const activeRatio = closestRatio ? closestRatio.value : 'custom';

  const longEdge = Math.max(width, height);
  let activeRes = RESOLUTIONS[0].longEdge;
  if (Math.abs(longEdge - RESOLUTIONS[1].longEdge) < 500) {
    activeRes = RESOLUTIONS[1].longEdge;
  }

  const handleRatioClick = (ratioVal: number | 'custom') => {
    if (ratioVal === 'custom') return;
    const isWide = ratioVal > 1;
    let newW, newH;
    if (isWide) {
      newW = activeRes;
      newH = Math.round(activeRes / ratioVal);
    } else {
      newH = activeRes;
      newW = Math.round(activeRes * ratioVal);
    }
    onUpdateCanvas({ width: newW, height: newH });
  };

  const handleResClick = (resLongEdge: number) => {
    const ratio = width / height;
    const isWide = ratio > 1;
    let newW, newH;
    if (isWide) {
      newW = resLongEdge;
      newH = Math.round(resLongEdge / ratio);
    } else {
      newH = resLongEdge;
      newW = Math.round(resLongEdge * ratio);
    }
    onUpdateCanvas({ width: newW, height: newH });
  };

  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newW = parseInt(e.target.value) || 0;
    if (isLocked) {
      const ratio = width / height;
      onUpdateCanvas({ width: newW, height: Math.round(newW / ratio) });
    } else {
      onUpdateCanvas({ width: newW });
    }
  };

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newH = parseInt(e.target.value) || 0;
    if (isLocked) {
      const ratio = width / height;
      onUpdateCanvas({ width: Math.round(newH * ratio), height: newH });
    } else {
      onUpdateCanvas({ height: newH });
    }
  };

  return (
    <div className="h-14 bg-white border-b border-gray-200 flex items-center px-4 relative z-50 shadow-sm">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-[#2a2a2c] text-gray-200 px-3 py-2 rounded-lg hover:bg-[#3f3f46] transition-colors text-sm font-medium shadow-sm"
      >
        <LayoutTemplate className="w-4 h-4 text-gray-400" />
        <span>{closestRatio ? closestRatio.label : '自定义'}</span>
        <span className="text-gray-500 mx-1">|</span>
        <span>{activeRes === RESOLUTIONS[1].longEdge ? '超清 4K' : '高清 2K'}</span>
        <ChevronDown className="w-4 h-4 text-gray-400 ml-1" />
      </button>

      {isOpen && (
        <div
          ref={popoverRef}
          className="absolute top-16 left-4 w-[520px] bg-[#1e1e20] rounded-xl shadow-2xl border border-[#3f3f46] p-5 text-gray-200 select-none"
        >
          {/* 选择比例 */}
          <div className="mb-6">
            <div className="text-sm text-gray-400 mb-3">选择比例</div>
            <div className="flex justify-between bg-[#2a2a2c] p-1.5 rounded-lg">
              {RATIOS.map((r) => {
                const isActive = activeRatio === r.value;
                return (
                  <button
                    key={r.label}
                    onClick={() => handleRatioClick(r.value)}
                    className={`flex flex-col items-center justify-center w-[48px] h-[56px] rounded-md transition-colors ${
                      isActive
                        ? 'bg-[#3f3f46] text-white shadow-sm'
                        : 'text-gray-400 hover:text-gray-200 hover:bg-[#3f3f46]/50'
                    }`}
                  >
                    <div className="h-7 flex items-center justify-center mb-1">
                      <RatioIcon ratio={r.value} />
                    </div>
                    <span className="text-[11px] font-medium">{r.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 选择分辨率 */}
          <div className="mb-6">
            <div className="text-sm text-gray-400 mb-3">选择分辨率</div>
            <div className="flex gap-3">
              {RESOLUTIONS.map((res) => {
                const isActive = activeRes === res.longEdge;
                return (
                  <button
                    key={res.label}
                    onClick={() => handleResClick(res.longEdge)}
                    className={`flex-1 py-3 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-[#3f3f46] text-white shadow-sm'
                        : 'bg-[#2a2a2c] text-gray-400 hover:bg-[#3f3f46]/70'
                    }`}
                  >
                    {res.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 尺寸 */}
          <div>
            <div className="text-sm text-gray-400 mb-3">尺寸</div>
            <div className="flex items-center gap-3">
              <div className="flex-1 flex items-center bg-[#2a2a2c] rounded-lg px-4 py-2.5 border border-transparent focus-within:border-gray-500 transition-colors">
                <span className="text-gray-500 text-sm font-medium mr-3">W</span>
                <input
                  type="number"
                  value={width}
                  onChange={handleWidthChange}
                  className="bg-transparent text-white w-full outline-none text-center font-mono text-base"
                />
              </div>
              
              <button
                onClick={() => setIsLocked(!isLocked)}
                className={`p-2.5 rounded-lg transition-colors ${
                  isLocked ? 'text-white bg-[#3f3f46] shadow-sm' : 'text-gray-500 hover:text-gray-300 hover:bg-[#2a2a2c]'
                }`}
                title={isLocked ? '解锁比例' : '锁定比例'}
              >
                {isLocked ? <LinkIcon className="w-4 h-4" /> : <Unlink className="w-4 h-4" />}
              </button>
              
              <div className="flex-1 flex items-center bg-[#2a2a2c] rounded-lg px-4 py-2.5 border border-transparent focus-within:border-gray-500 transition-colors">
                <span className="text-gray-500 text-sm font-medium mr-3">H</span>
                <input
                  type="number"
                  value={height}
                  onChange={handleHeightChange}
                  className="bg-transparent text-white w-full outline-none text-center font-mono text-base"
                />
                <span className="text-gray-500 text-sm font-medium ml-3">PX</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
