import { Template, CanvasElement } from '../types';

const generateId = () => Math.random().toString(36).substring(2, 9);

interface SkillItemData {
  rank: string;
  name: string;
  author: string;
  metric: string;
  desc: string;
}

const SKILL_ITEMS: SkillItemData[] = [
  {
    rank: '01',
    name: 'find-skills',
    author: 'Vercel Labs',
    metric: '240万+',
    desc: '技能生态入口与CLI核心管理工具，支持搜索/安装扩展',
  },
  {
    rank: '02',
    name: 'frontend-design',
    author: 'Anthropic',
    metric: '62.8万+',
    desc: '拒绝AI套样，生成高质感独特的前端界面与组件设计',
  },
  {
    rank: '03',
    name: 'vercel-react-best-practices',
    author: 'Vercel Labs',
    metric: '52.7万+',
    desc: '70+条React与Next.js全栈性能优化与反模式规避法则',
  },
  {
    rank: '04',
    name: 'agent-browser',
    author: 'Vercel Labs',
    metric: '51.4万+',
    desc: '高效Token快照与Ref映射，赋能AI Agent自主浏览网页',
  },
  {
    rank: '05',
    name: 'grill-me',
    author: 'Matt Pocock',
    metric: '45.9万+',
    desc: '灵魂拷问型结构化访谈，深度排查方案潜在漏洞与盲点',
  },
  {
    rank: '06',
    name: 'web-design-guidelines',
    author: 'Vercel Labs',
    metric: '44.0万+',
    desc: 'Vercel官方UI设计与交互规范审查器，确保视觉一致性',
  },
  {
    rank: '07',
    name: 'microsoft-foundry',
    author: 'Microsoft',
    metric: '43.2万+',
    desc: '覆盖Azure AI Foundry智能体全生命周期构建与管理',
  },
  {
    rank: '08',
    name: 'remotion-best-practices',
    author: 'Remotion',
    metric: '41.6万+',
    desc: '使用React编程式生成视频的最佳工程实践与性能指南',
  },
  {
    rank: '09',
    name: 'improve-codebase-architecture',
    author: 'Matt Pocock',
    metric: '40.8万+',
    desc: '全局代码架构体检师，系统性发现并清理技术债',
  },
  {
    rank: '10',
    name: 'tdd',
    author: 'Matt Pocock',
    metric: '39.0万+',
    desc: '测试驱动开发辅助技能，引导Agent高标准编写自动化测试',
  },
];

// Helper to create the Dark Obsidian template
const createDarkTemplate = (): Template => {
  const elements: CanvasElement[] = [
    // Header background bar
    {
      id: generateId(),
      type: 'shape',
      shapeType: 'rectangle',
      x: 0,
      y: 0,
      width: 1080,
      height: 220,
      rotation: 0,
      opacity: 0.95,
      zIndex: 1,
      backgroundColor: '#16181F',
      borderRadius: 0,
    },
    // Top badge left
    {
      id: generateId(),
      type: 'shape',
      shapeType: 'rectangle',
      x: 60,
      y: 46,
      width: 230,
      height: 42,
      rotation: 0,
      opacity: 1,
      zIndex: 2,
      backgroundColor: '#262934',
      borderRadius: 21,
    },
    {
      id: generateId(),
      type: 'text',
      text: '🔥 全网实用技能榜',
      x: 60,
      y: 53,
      width: 230,
      height: 28,
      rotation: 0,
      opacity: 1,
      zIndex: 3,
      fontSize: 18,
      fontFamily: '"Noto Sans SC", sans-serif',
      fontWeight: '700',
      color: '#F59E0B',
      textAlign: 'center',
      lineHeight: 1.4,
      letterSpacing: 2,
    },
    // Top badge right
    {
      id: generateId(),
      type: 'shape',
      shapeType: 'rectangle',
      x: 790,
      y: 46,
      width: 230,
      height: 42,
      rotation: 0,
      opacity: 1,
      zIndex: 2,
      backgroundColor: '#262934',
      borderRadius: 21,
    },
    {
      id: generateId(),
      type: 'text',
      text: 'skills.sh 官方评选',
      x: 790,
      y: 53,
      width: 230,
      height: 28,
      rotation: 0,
      opacity: 1,
      zIndex: 3,
      fontSize: 18,
      fontFamily: '"Noto Sans SC", sans-serif',
      fontWeight: '600',
      color: '#A1A1AA',
      textAlign: 'center',
      lineHeight: 1.4,
      letterSpacing: 1,
    },
    // Title
    {
      id: generateId(),
      type: 'text',
      text: 'Skills CLI 实用技能榜 TOP 10',
      x: 60,
      y: 106,
      width: 960,
      height: 58,
      rotation: 0,
      opacity: 1,
      zIndex: 3,
      fontSize: 46,
      fontFamily: '"Noto Sans SC", sans-serif',
      fontWeight: '900',
      color: '#FFFFFF',
      textAlign: 'left',
      lineHeight: 1.2,
      letterSpacing: 2,
    },
    // Subtitle
    {
      id: generateId(),
      type: 'text',
      text: '暗黑质感 · 沉浸体验 | 开发者高频提效工具权威榜单',
      x: 60,
      y: 172,
      width: 960,
      height: 32,
      rotation: 0,
      opacity: 1,
      zIndex: 3,
      fontSize: 19,
      fontFamily: '"Noto Sans SC", sans-serif',
      fontWeight: '500',
      color: '#9CA3AF',
      textAlign: 'left',
      lineHeight: 1.4,
      letterSpacing: 1,
    },
    // Divider
    {
      id: generateId(),
      type: 'shape',
      shapeType: 'rectangle',
      x: 60,
      y: 216,
      width: 960,
      height: 2,
      rotation: 0,
      opacity: 1,
      zIndex: 2,
      backgroundColor: '#282C38',
      borderRadius: 1,
    },
  ];

  // 10 Cards
  const startY = 236;
  const cardHeight = 98;
  const gap = 12;

  SKILL_ITEMS.forEach((item, idx) => {
    const cardY = startY + idx * (cardHeight + gap);
    const isTop1 = idx === 0;
    const isTop2 = idx === 1;
    const isTop3 = idx === 2;
    const rankBg = isTop1 ? '#F59E0B' : isTop2 ? '#94A3B8' : isTop3 ? '#D97706' : '#272B37';
    const rankColor = isTop1 || isTop2 || isTop3 ? '#0F1117' : '#E2E8F0';

    // Card background
    elements.push({
      id: generateId(),
      type: 'shape',
      shapeType: 'rectangle',
      x: 60,
      y: cardY,
      width: 960,
      height: cardHeight,
      rotation: 0,
      opacity: 1,
      zIndex: 2,
      backgroundColor: '#1A1D25',
      borderRadius: 16,
    });

    // Rank badge
    elements.push({
      id: generateId(),
      type: 'shape',
      shapeType: 'rectangle',
      x: 80,
      y: cardY + 24,
      width: 50,
      height: 50,
      rotation: 0,
      opacity: 1,
      zIndex: 3,
      backgroundColor: rankBg,
      borderRadius: 12,
    });
    elements.push({
      id: generateId(),
      type: 'text',
      text: item.rank,
      x: 80,
      y: cardY + 33,
      width: 50,
      height: 32,
      rotation: 0,
      opacity: 1,
      zIndex: 4,
      fontSize: 22,
      fontFamily: '"Noto Sans SC", sans-serif',
      fontWeight: '900',
      color: rankColor,
      textAlign: 'center',
      lineHeight: 1.4,
      letterSpacing: 0,
    });

    // Skill Name + Author
    elements.push({
      id: generateId(),
      type: 'text',
      text: `${item.name}  ·  ${item.author}`,
      x: 148,
      y: cardY + 16,
      width: 650,
      height: 34,
      rotation: 0,
      opacity: 1,
      zIndex: 3,
      fontSize: 25,
      fontFamily: '"Noto Sans SC", sans-serif',
      fontWeight: '700',
      color: '#FFFFFF',
      textAlign: 'left',
      lineHeight: 1.3,
      letterSpacing: 1,
    });

    // Description
    elements.push({
      id: generateId(),
      type: 'text',
      text: item.desc,
      x: 148,
      y: cardY + 54,
      width: 660,
      height: 28,
      rotation: 0,
      opacity: 1,
      zIndex: 3,
      fontSize: 17,
      fontFamily: '"Noto Sans SC", sans-serif',
      fontWeight: '400',
      color: '#94A3B8',
      textAlign: 'left',
      lineHeight: 1.4,
      letterSpacing: 0.5,
    });

    // Metric pill
    elements.push({
      id: generateId(),
      type: 'shape',
      shapeType: 'rectangle',
      x: 825,
      y: cardY + 28,
      width: 175,
      height: 42,
      rotation: 0,
      opacity: 1,
      zIndex: 3,
      backgroundColor: '#272217',
      borderRadius: 21,
    });
    elements.push({
      id: generateId(),
      type: 'text',
      text: item.metric,
      x: 825,
      y: cardY + 36,
      width: 175,
      height: 26,
      rotation: 0,
      opacity: 1,
      zIndex: 4,
      fontSize: 19,
      fontFamily: '"Noto Sans SC", sans-serif',
      fontWeight: '700',
      color: '#FBBF24',
      textAlign: 'center',
      lineHeight: 1.3,
      letterSpacing: 1,
    });
  });

  // Footer
  elements.push({
    id: generateId(),
    type: 'shape',
    shapeType: 'rectangle',
    x: 60,
    y: 1340,
    width: 960,
    height: 2,
    rotation: 0,
    opacity: 1,
    zIndex: 2,
    backgroundColor: '#282C38',
    borderRadius: 1,
  });
  elements.push({
    id: generateId(),
    type: 'text',
    text: '✦ 微信贴片精选 · 收藏保存持续关注 · 暗黑质感版',
    x: 60,
    y: 1362,
    width: 960,
    height: 36,
    rotation: 0,
    opacity: 1,
    zIndex: 3,
    fontSize: 20,
    fontFamily: '"Noto Sans SC", sans-serif',
    fontWeight: '600',
    color: '#71717A',
    textAlign: 'center',
    lineHeight: 1.4,
    letterSpacing: 2,
  });

  return {
    id: 'wechat-skills-dark',
    name: 'Skills 排行榜 (暗黑质感)',
    category: 'wechat',
    thumbnail: 'https://picsum.photos/seed/skillsdark/200/266',
    state: {
      width: 1080,
      height: 1440,
      background: { type: 'color', value: '#111317' },
      elements,
    },
  };
};

// Helper to create Cyberpunk / Tech template
const createCyberTemplate = (): Template => {
  const elements: CanvasElement[] = [
    // Top cyber glowing strip
    {
      id: generateId(),
      type: 'shape',
      shapeType: 'rectangle',
      x: 0,
      y: 0,
      width: 1080,
      height: 6,
      rotation: 0,
      opacity: 1,
      zIndex: 5,
      backgroundColor: '#00F0FF',
      borderRadius: 0,
    },
    // Header block
    {
      id: generateId(),
      type: 'shape',
      shapeType: 'rectangle',
      x: 0,
      y: 6,
      width: 1080,
      height: 216,
      rotation: 0,
      opacity: 0.9,
      zIndex: 1,
      backgroundColor: '#0A1224',
      borderRadius: 0,
    },
    // Top tag 1
    {
      id: generateId(),
      type: 'shape',
      shapeType: 'rectangle',
      x: 60,
      y: 46,
      width: 250,
      height: 42,
      rotation: 0,
      opacity: 1,
      zIndex: 2,
      backgroundColor: '#0E223D',
      borderRadius: 6,
    },
    {
      id: generateId(),
      type: 'text',
      text: '⚡ SYSTEM: CLI_RADAR',
      x: 60,
      y: 53,
      width: 250,
      height: 28,
      rotation: 0,
      opacity: 1,
      zIndex: 3,
      fontSize: 17,
      fontFamily: '"Noto Sans SC", sans-serif',
      fontWeight: '700',
      color: '#00F0FF',
      textAlign: 'center',
      lineHeight: 1.4,
      letterSpacing: 2,
    },
    // Top tag 2
    {
      id: generateId(),
      type: 'shape',
      shapeType: 'rectangle',
      x: 770,
      y: 46,
      width: 250,
      height: 42,
      rotation: 0,
      opacity: 1,
      zIndex: 2,
      backgroundColor: '#1E1436',
      borderRadius: 6,
    },
    {
      id: generateId(),
      type: 'text',
      text: '// STATUS: VERIFIED',
      x: 770,
      y: 53,
      width: 250,
      height: 28,
      rotation: 0,
      opacity: 1,
      zIndex: 3,
      fontSize: 17,
      fontFamily: '"Noto Sans SC", sans-serif',
      fontWeight: '700',
      color: '#C084FC',
      textAlign: 'center',
      lineHeight: 1.4,
      letterSpacing: 1,
    },
    // Title
    {
      id: generateId(),
      type: 'text',
      text: 'SKILLS CLI 全网热度榜 TOP 10',
      x: 60,
      y: 106,
      width: 960,
      height: 58,
      rotation: 0,
      opacity: 1,
      zIndex: 3,
      fontSize: 46,
      fontFamily: '"Noto Sans SC", sans-serif',
      fontWeight: '900',
      color: '#FFFFFF',
      textAlign: 'left',
      lineHeight: 1.2,
      letterSpacing: 2,
    },
    // Subtitle
    {
      id: generateId(),
      type: 'text',
      text: 'CYBER MATRIX · 综合评测开发生态首选技能 · 极客硬核版',
      x: 60,
      y: 172,
      width: 960,
      height: 32,
      rotation: 0,
      opacity: 1,
      zIndex: 3,
      fontSize: 19,
      fontFamily: '"Noto Sans SC", sans-serif',
      fontWeight: '600',
      color: '#38BDF8',
      textAlign: 'left',
      lineHeight: 1.4,
      letterSpacing: 1,
    },
    // Neon line
    {
      id: generateId(),
      type: 'shape',
      shapeType: 'rectangle',
      x: 60,
      y: 216,
      width: 960,
      height: 2,
      rotation: 0,
      opacity: 1,
      zIndex: 2,
      backgroundColor: '#00F0FF',
      borderRadius: 1,
    },
  ];

  const startY = 236;
  const cardHeight = 98;
  const gap = 12;

  SKILL_ITEMS.forEach((item, idx) => {
    const cardY = startY + idx * (cardHeight + gap);
    const isTop1 = idx === 0;
    const isTop2 = idx === 1;
    const isTop3 = idx === 2;
    const rankBg = isTop1 ? '#00F0FF' : isTop2 ? '#A855F7' : isTop3 ? '#06B6D4' : '#142548';
    const rankColor = isTop1 || isTop3 ? '#060B18' : '#FFFFFF';

    // Card background
    elements.push({
      id: generateId(),
      type: 'shape',
      shapeType: 'rectangle',
      x: 60,
      y: cardY,
      width: 960,
      height: cardHeight,
      rotation: 0,
      opacity: 1,
      zIndex: 2,
      backgroundColor: '#0B152B',
      borderRadius: 8,
    });

    // Cyber left neon edge accent
    elements.push({
      id: generateId(),
      type: 'shape',
      shapeType: 'rectangle',
      x: 60,
      y: cardY,
      width: 6,
      height: cardHeight,
      rotation: 0,
      opacity: 1,
      zIndex: 3,
      backgroundColor: isTop1 ? '#00F0FF' : isTop2 ? '#A855F7' : isTop3 ? '#06B6D4' : '#1E3A5F',
      borderRadius: 0,
    });

    // Rank badge
    elements.push({
      id: generateId(),
      type: 'shape',
      shapeType: 'rectangle',
      x: 82,
      y: cardY + 24,
      width: 50,
      height: 50,
      rotation: 0,
      opacity: 1,
      zIndex: 3,
      backgroundColor: rankBg,
      borderRadius: 6,
    });
    elements.push({
      id: generateId(),
      type: 'text',
      text: item.rank,
      x: 82,
      y: cardY + 33,
      width: 50,
      height: 32,
      rotation: 0,
      opacity: 1,
      zIndex: 4,
      fontSize: 22,
      fontFamily: '"Noto Sans SC", sans-serif',
      fontWeight: '900',
      color: rankColor,
      textAlign: 'center',
      lineHeight: 1.4,
      letterSpacing: 0,
    });

    // Title
    elements.push({
      id: generateId(),
      type: 'text',
      text: `${item.name}  //  ${item.author}`,
      x: 150,
      y: cardY + 16,
      width: 650,
      height: 34,
      rotation: 0,
      opacity: 1,
      zIndex: 3,
      fontSize: 25,
      fontFamily: '"Noto Sans SC", sans-serif',
      fontWeight: '700',
      color: '#FFFFFF',
      textAlign: 'left',
      lineHeight: 1.3,
      letterSpacing: 1,
    });

    // Desc
    elements.push({
      id: generateId(),
      type: 'text',
      text: item.desc,
      x: 150,
      y: cardY + 54,
      width: 660,
      height: 28,
      rotation: 0,
      opacity: 1,
      zIndex: 3,
      fontSize: 17,
      fontFamily: '"Noto Sans SC", sans-serif',
      fontWeight: '400',
      color: '#7DD3FC',
      textAlign: 'left',
      lineHeight: 1.4,
      letterSpacing: 0.5,
    });

    // Metric pill
    elements.push({
      id: generateId(),
      type: 'shape',
      shapeType: 'rectangle',
      x: 825,
      y: cardY + 28,
      width: 175,
      height: 42,
      rotation: 0,
      opacity: 1,
      zIndex: 3,
      backgroundColor: '#0F2746',
      borderRadius: 6,
    });
    elements.push({
      id: generateId(),
      type: 'text',
      text: item.metric,
      x: 825,
      y: cardY + 36,
      width: 175,
      height: 26,
      rotation: 0,
      opacity: 1,
      zIndex: 4,
      fontSize: 19,
      fontFamily: '"Noto Sans SC", sans-serif',
      fontWeight: '700',
      color: '#00F0FF',
      textAlign: 'center',
      lineHeight: 1.3,
      letterSpacing: 1,
    });
  });

  // Footer
  elements.push({
    id: generateId(),
    type: 'shape',
    shapeType: 'rectangle',
    x: 60,
    y: 1340,
    width: 960,
    height: 2,
    rotation: 0,
    opacity: 1,
    zIndex: 2,
    backgroundColor: '#1E3A5F',
    borderRadius: 1,
  });
  elements.push({
    id: generateId(),
    type: 'text',
    text: '> skills.sh --official-radar // 微信图文贴片 · 科技硬核版',
    x: 60,
    y: 1362,
    width: 960,
    height: 36,
    rotation: 0,
    opacity: 1,
    zIndex: 3,
    fontSize: 20,
    fontFamily: '"Noto Sans SC", sans-serif',
    fontWeight: '600',
    color: '#38BDF8',
    textAlign: 'center',
    lineHeight: 1.4,
    letterSpacing: 2,
  });

  return {
    id: 'wechat-skills-cyber',
    name: 'Skills 排行榜 (赛博科技风)',
    category: 'wechat',
    thumbnail: 'https://picsum.photos/seed/skillscyber/200/266',
    state: {
      width: 1080,
      height: 1440,
      background: { type: 'color', value: '#060B18' },
      elements,
    },
  };
};

// Helper to create Fresh Pastel / Dopamine Color Blocks
const createColorfulTemplate = (): Template => {
  const elements: CanvasElement[] = [
    // Header block
    {
      id: generateId(),
      type: 'shape',
      shapeType: 'rectangle',
      x: 0,
      y: 0,
      width: 1080,
      height: 220,
      rotation: 0,
      opacity: 1,
      zIndex: 1,
      backgroundColor: '#FFFFFF',
      borderRadius: 0,
    },
    // Top badge left
    {
      id: generateId(),
      type: 'shape',
      shapeType: 'rectangle',
      x: 60,
      y: 46,
      width: 220,
      height: 42,
      rotation: 0,
      opacity: 1,
      zIndex: 2,
      backgroundColor: '#DCFCE7',
      borderRadius: 21,
    },
    {
      id: generateId(),
      type: 'text',
      text: '🌱 效率神榜',
      x: 60,
      y: 53,
      width: 220,
      height: 28,
      rotation: 0,
      opacity: 1,
      zIndex: 3,
      fontSize: 18,
      fontFamily: '"Noto Sans SC", sans-serif',
      fontWeight: '700',
      color: '#15803D',
      textAlign: 'center',
      lineHeight: 1.4,
      letterSpacing: 2,
    },
    // Top badge right
    {
      id: generateId(),
      type: 'shape',
      shapeType: 'rectangle',
      x: 800,
      y: 46,
      width: 220,
      height: 42,
      rotation: 0,
      opacity: 1,
      zIndex: 2,
      backgroundColor: '#E0F2FE',
      borderRadius: 21,
    },
    {
      id: generateId(),
      type: 'text',
      text: 'skills.sh 精选',
      x: 800,
      y: 53,
      width: 220,
      height: 28,
      rotation: 0,
      opacity: 1,
      zIndex: 3,
      fontSize: 18,
      fontFamily: '"Noto Sans SC", sans-serif',
      fontWeight: '600',
      color: '#0369A1',
      textAlign: 'center',
      lineHeight: 1.4,
      letterSpacing: 1,
    },
    // Title
    {
      id: generateId(),
      type: 'text',
      text: 'Skills CLI 实用技能 TOP 10',
      x: 60,
      y: 106,
      width: 960,
      height: 58,
      rotation: 0,
      opacity: 1,
      zIndex: 3,
      fontSize: 46,
      fontFamily: '"Noto Sans SC", sans-serif',
      fontWeight: '900',
      color: '#0F172A',
      textAlign: 'left',
      lineHeight: 1.2,
      letterSpacing: 2,
    },
    // Subtitle
    {
      id: generateId(),
      type: 'text',
      text: '清新明亮彩块排版 · 精选高赞高频开发工具 · 清晰一览',
      x: 60,
      y: 172,
      width: 960,
      height: 32,
      rotation: 0,
      opacity: 1,
      zIndex: 3,
      fontSize: 19,
      fontFamily: '"Noto Sans SC", sans-serif',
      fontWeight: '500',
      color: '#64748B',
      textAlign: 'left',
      lineHeight: 1.4,
      letterSpacing: 1,
    },
    // Divider
    {
      id: generateId(),
      type: 'shape',
      shapeType: 'rectangle',
      x: 60,
      y: 216,
      width: 960,
      height: 2,
      rotation: 0,
      opacity: 1,
      zIndex: 2,
      backgroundColor: '#E2E8F0',
      borderRadius: 1,
    },
  ];

  const startY = 236;
  const cardHeight = 98;
  const gap = 12;

  // 10 pastel color pairs (card bg, badge bg, badge text)
  const pastelStyles = [
    { cardBg: '#ECFDF5', badgeBg: '#10B981', badgeColor: '#FFFFFF', pillText: '#047857' },
    { cardBg: '#F0F9FF', badgeBg: '#0284C7', badgeColor: '#FFFFFF', pillText: '#0369A1' },
    { cardBg: '#FFFBEB', badgeBg: '#F59E0B', badgeColor: '#FFFFFF', pillText: '#B45309' },
    { cardBg: '#FFF1F2', badgeBg: '#F43F5E', badgeColor: '#FFFFFF', pillText: '#BE123C' },
    { cardBg: '#F5F3FF', badgeBg: '#8B5CF6', badgeColor: '#FFFFFF', pillText: '#6D28D9' },
    { cardBg: '#F0FDF4', badgeBg: '#059669', badgeColor: '#FFFFFF', pillText: '#047857' },
    { cardBg: '#FFF7ED', badgeBg: '#EA580C', badgeColor: '#FFFFFF', pillText: '#C2410C' },
    { cardBg: '#EEF2FF', badgeBg: '#6366F1', badgeColor: '#FFFFFF', pillText: '#4338CA' },
    { cardBg: '#ECFEFF', badgeBg: '#0891B2', badgeColor: '#FFFFFF', pillText: '#0E7490' },
    { cardBg: '#F7FEE7', badgeBg: '#65A30D', badgeColor: '#FFFFFF', pillText: '#4D7C0F' },
  ];

  SKILL_ITEMS.forEach((item, idx) => {
    const cardY = startY + idx * (cardHeight + gap);
    const style = pastelStyles[idx];

    // Card background
    elements.push({
      id: generateId(),
      type: 'shape',
      shapeType: 'rectangle',
      x: 60,
      y: cardY,
      width: 960,
      height: cardHeight,
      rotation: 0,
      opacity: 1,
      zIndex: 2,
      backgroundColor: style.cardBg,
      borderRadius: 20,
    });

    // Rank badge
    elements.push({
      id: generateId(),
      type: 'shape',
      shapeType: 'rectangle',
      x: 80,
      y: cardY + 24,
      width: 50,
      height: 50,
      rotation: 0,
      opacity: 1,
      zIndex: 3,
      backgroundColor: style.badgeBg,
      borderRadius: 14,
    });
    elements.push({
      id: generateId(),
      type: 'text',
      text: item.rank,
      x: 80,
      y: cardY + 33,
      width: 50,
      height: 32,
      rotation: 0,
      opacity: 1,
      zIndex: 4,
      fontSize: 22,
      fontFamily: '"Noto Sans SC", sans-serif',
      fontWeight: '900',
      color: style.badgeColor,
      textAlign: 'center',
      lineHeight: 1.4,
      letterSpacing: 0,
    });

    // Skill Name + Author
    elements.push({
      id: generateId(),
      type: 'text',
      text: `${item.name}  ·  ${item.author}`,
      x: 148,
      y: cardY + 16,
      width: 650,
      height: 34,
      rotation: 0,
      opacity: 1,
      zIndex: 3,
      fontSize: 25,
      fontFamily: '"Noto Sans SC", sans-serif',
      fontWeight: '700',
      color: '#0F172A',
      textAlign: 'left',
      lineHeight: 1.3,
      letterSpacing: 1,
    });

    // Description
    elements.push({
      id: generateId(),
      type: 'text',
      text: item.desc,
      x: 148,
      y: cardY + 54,
      width: 660,
      height: 28,
      rotation: 0,
      opacity: 1,
      zIndex: 3,
      fontSize: 17,
      fontFamily: '"Noto Sans SC", sans-serif',
      fontWeight: '400',
      color: '#475569',
      textAlign: 'left',
      lineHeight: 1.4,
      letterSpacing: 0.5,
    });

    // Metric pill
    elements.push({
      id: generateId(),
      type: 'shape',
      shapeType: 'rectangle',
      x: 825,
      y: cardY + 28,
      width: 175,
      height: 42,
      rotation: 0,
      opacity: 1,
      zIndex: 3,
      backgroundColor: '#FFFFFF',
      borderRadius: 21,
    });
    elements.push({
      id: generateId(),
      type: 'text',
      text: item.metric,
      x: 825,
      y: cardY + 36,
      width: 175,
      height: 26,
      rotation: 0,
      opacity: 1,
      zIndex: 4,
      fontSize: 19,
      fontFamily: '"Noto Sans SC", sans-serif',
      fontWeight: '700',
      color: style.pillText,
      textAlign: 'center',
      lineHeight: 1.3,
      letterSpacing: 1,
    });
  });

  // Footer
  elements.push({
    id: generateId(),
    type: 'shape',
    shapeType: 'rectangle',
    x: 60,
    y: 1340,
    width: 960,
    height: 2,
    rotation: 0,
    opacity: 1,
    zIndex: 2,
    backgroundColor: '#E2E8F0',
    borderRadius: 1,
  });
  elements.push({
    id: generateId(),
    type: 'text',
    text: '✨ 微信图文分享贴片 · 一键保存到相册 · 清新彩块版',
    x: 60,
    y: 1362,
    width: 960,
    height: 36,
    rotation: 0,
    opacity: 1,
    zIndex: 3,
    fontSize: 20,
    fontFamily: '"Noto Sans SC", sans-serif',
    fontWeight: '600',
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 1.4,
    letterSpacing: 2,
  });

  return {
    id: 'wechat-skills-colorful',
    name: 'Skills 排行榜 (清新彩块)',
    category: 'wechat',
    thumbnail: 'https://picsum.photos/seed/skillscolorful/200/266',
    state: {
      width: 1080,
      height: 1440,
      background: { type: 'color', value: '#F8FAFC' },
      elements,
    },
  };
};

// Helper to create Hand-drawn Cute Cozy Style
const createCuteTemplate = (): Template => {
  const elements: CanvasElement[] = [
    // Header block
    {
      id: generateId(),
      type: 'shape',
      shapeType: 'rectangle',
      x: 0,
      y: 0,
      width: 1080,
      height: 220,
      rotation: 0,
      opacity: 1,
      zIndex: 1,
      backgroundColor: '#FFFDF5',
      borderRadius: 0,
    },
    // Top badge left
    {
      id: generateId(),
      type: 'shape',
      shapeType: 'rectangle',
      x: 60,
      y: 46,
      width: 230,
      height: 44,
      rotation: 0,
      opacity: 1,
      zIndex: 2,
      backgroundColor: '#FEF3C7',
      borderRadius: 22,
    },
    {
      id: generateId(),
      type: 'text',
      text: '🧸 宝藏技能清单',
      x: 60,
      y: 53,
      width: 230,
      height: 30,
      rotation: 0,
      opacity: 1,
      zIndex: 3,
      fontSize: 18,
      fontFamily: '"Noto Sans SC", sans-serif',
      fontWeight: '700',
      color: '#92400E',
      textAlign: 'center',
      lineHeight: 1.4,
      letterSpacing: 2,
    },
    // Top badge right
    {
      id: generateId(),
      type: 'shape',
      shapeType: 'rectangle',
      x: 780,
      y: 46,
      width: 240,
      height: 44,
      rotation: 0,
      opacity: 1,
      zIndex: 2,
      backgroundColor: '#FEE2E2',
      borderRadius: 22,
    },
    {
      id: generateId(),
      type: 'text',
      text: '✨ 码住慢慢看',
      x: 780,
      y: 53,
      width: 240,
      height: 30,
      rotation: 0,
      opacity: 1,
      zIndex: 3,
      fontSize: 18,
      fontFamily: '"Noto Sans SC", sans-serif',
      fontWeight: '700',
      color: '#B91C1C',
      textAlign: 'center',
      lineHeight: 1.4,
      letterSpacing: 1,
    },
    // Title
    {
      id: generateId(),
      type: 'text',
      text: '超好用的 Skills CLI 技能 10 选',
      x: 60,
      y: 106,
      width: 960,
      height: 58,
      rotation: 0,
      opacity: 1,
      zIndex: 3,
      fontSize: 44,
      fontFamily: '"Noto Sans SC", sans-serif',
      fontWeight: '900',
      color: '#451A03',
      textAlign: 'left',
      lineHeight: 1.2,
      letterSpacing: 2,
    },
    // Subtitle
    {
      id: generateId(),
      type: 'text',
      text: '日常写代码的秘密武器！治愈系提效贴片 ~ 收藏不踩雷',
      x: 60,
      y: 172,
      width: 960,
      height: 32,
      rotation: 0,
      opacity: 1,
      zIndex: 3,
      fontSize: 19,
      fontFamily: '"Noto Sans SC", sans-serif',
      fontWeight: '600',
      color: '#78350F',
      textAlign: 'left',
      lineHeight: 1.4,
      letterSpacing: 1,
    },
    // Divider
    {
      id: generateId(),
      type: 'shape',
      shapeType: 'rectangle',
      x: 60,
      y: 216,
      width: 960,
      height: 2,
      rotation: 0,
      opacity: 1,
      zIndex: 2,
      backgroundColor: '#FDE68A',
      borderRadius: 1,
    },
  ];

  const startY = 236;
  const cardHeight = 98;
  const gap = 12;

  const cuteBadges = [
    { bg: '#FDA4AF', color: '#881337' },
    { bg: '#FDE68A', color: '#78350F' },
    { bg: '#A7F3D0', color: '#064E3B' },
    { bg: '#DDD6FE', color: '#4C1D95' },
    { bg: '#BAE6FD', color: '#0C4A6E' },
    { bg: '#FED7AA', color: '#7C2D12' },
    { bg: '#BBF7D0', color: '#14532D' },
    { bg: '#FECDD3', color: '#881337' },
    { bg: '#FEF08A', color: '#713F12' },
    { bg: '#E9D5FF', color: '#581C87' },
  ];

  SKILL_ITEMS.forEach((item, idx) => {
    const cardY = startY + idx * (cardHeight + gap);
    const badge = cuteBadges[idx];

    // Card background
    elements.push({
      id: generateId(),
      type: 'shape',
      shapeType: 'rectangle',
      x: 60,
      y: cardY,
      width: 960,
      height: cardHeight,
      rotation: 0,
      opacity: 1,
      zIndex: 2,
      backgroundColor: '#FFFFFF',
      borderRadius: 24,
    });

    // Rank round badge
    elements.push({
      id: generateId(),
      type: 'shape',
      shapeType: 'circle',
      x: 80,
      y: cardY + 24,
      width: 50,
      height: 50,
      rotation: 0,
      opacity: 1,
      zIndex: 3,
      backgroundColor: badge.bg,
      borderRadius: 25,
    });
    elements.push({
      id: generateId(),
      type: 'text',
      text: item.rank,
      x: 80,
      y: cardY + 33,
      width: 50,
      height: 32,
      rotation: 0,
      opacity: 1,
      zIndex: 4,
      fontSize: 22,
      fontFamily: '"Noto Sans SC", sans-serif',
      fontWeight: '900',
      color: badge.color,
      textAlign: 'center',
      lineHeight: 1.4,
      letterSpacing: 0,
    });

    // Skill Name + Author
    elements.push({
      id: generateId(),
      type: 'text',
      text: `${item.name}  🐾  ${item.author}`,
      x: 148,
      y: cardY + 16,
      width: 650,
      height: 34,
      rotation: 0,
      opacity: 1,
      zIndex: 3,
      fontSize: 25,
      fontFamily: '"Noto Sans SC", sans-serif',
      fontWeight: '700',
      color: '#451A03',
      textAlign: 'left',
      lineHeight: 1.3,
      letterSpacing: 1,
    });

    // Description
    elements.push({
      id: generateId(),
      type: 'text',
      text: item.desc,
      x: 148,
      y: cardY + 54,
      width: 660,
      height: 28,
      rotation: 0,
      opacity: 1,
      zIndex: 3,
      fontSize: 17,
      fontFamily: '"Noto Sans SC", sans-serif',
      fontWeight: '500',
      color: '#854D0E',
      textAlign: 'left',
      lineHeight: 1.4,
      letterSpacing: 0.5,
    });

    // Metric pill
    elements.push({
      id: generateId(),
      type: 'shape',
      shapeType: 'rectangle',
      x: 825,
      y: cardY + 28,
      width: 175,
      height: 42,
      rotation: 0,
      opacity: 1,
      zIndex: 3,
      backgroundColor: '#FFF7ED',
      borderRadius: 21,
    });
    elements.push({
      id: generateId(),
      type: 'text',
      text: `🔥 ${item.metric}`,
      x: 825,
      y: cardY + 36,
      width: 175,
      height: 26,
      rotation: 0,
      opacity: 1,
      zIndex: 4,
      fontSize: 18,
      fontFamily: '"Noto Sans SC", sans-serif',
      fontWeight: '700',
      color: '#EA580C',
      textAlign: 'center',
      lineHeight: 1.3,
      letterSpacing: 1,
    });
  });

  // Footer
  elements.push({
    id: generateId(),
    type: 'shape',
    shapeType: 'rectangle',
    x: 60,
    y: 1340,
    width: 960,
    height: 2,
    rotation: 0,
    opacity: 1,
    zIndex: 2,
    backgroundColor: '#FDE68A',
    borderRadius: 1,
  });
  elements.push({
    id: generateId(),
    type: 'text',
    text: '🎈 微信贴片 · 记得长按点赞收藏哦 🐾 · 手绘可爱版',
    x: 60,
    y: 1362,
    width: 960,
    height: 36,
    rotation: 0,
    opacity: 1,
    zIndex: 3,
    fontSize: 20,
    fontFamily: '"Noto Sans SC", sans-serif',
    fontWeight: '600',
    color: '#92400E',
    textAlign: 'center',
    lineHeight: 1.4,
    letterSpacing: 2,
  });

  return {
    id: 'wechat-skills-cute',
    name: 'Skills 排行榜 (手绘可爱)',
    category: 'wechat',
    thumbnail: 'https://picsum.photos/seed/skillscute/200/266',
    state: {
      width: 1080,
      height: 1440,
      background: { type: 'color', value: '#FFFBEB' },
      elements,
    },
  };
};

// Helper to create Neo-Brutalism Style
const createNeoBrutalTemplate = (): Template => {
  const elements: CanvasElement[] = [
    // Header block
    {
      id: generateId(),
      type: 'shape',
      shapeType: 'rectangle',
      x: 0,
      y: 0,
      width: 1080,
      height: 220,
      rotation: 0,
      opacity: 1,
      zIndex: 1,
      backgroundColor: '#FFE600',
      borderRadius: 0,
    },
    // Top badge left (Stark black box)
    {
      id: generateId(),
      type: 'shape',
      shapeType: 'rectangle',
      x: 60,
      y: 44,
      width: 240,
      height: 44,
      rotation: 0,
      opacity: 1,
      zIndex: 2,
      backgroundColor: '#000000',
      borderRadius: 0,
    },
    {
      id: generateId(),
      type: 'text',
      text: '★ TOP 10 RADAR ★',
      x: 60,
      y: 52,
      width: 240,
      height: 28,
      rotation: 0,
      opacity: 1,
      zIndex: 3,
      fontSize: 18,
      fontFamily: '"Noto Sans SC", sans-serif',
      fontWeight: '900',
      color: '#FFE600',
      textAlign: 'center',
      lineHeight: 1.4,
      letterSpacing: 2,
    },
    // Top badge right
    {
      id: generateId(),
      type: 'shape',
      shapeType: 'rectangle',
      x: 770,
      y: 44,
      width: 250,
      height: 44,
      rotation: 0,
      opacity: 1,
      zIndex: 2,
      backgroundColor: '#000000',
      borderRadius: 0,
    },
    {
      id: generateId(),
      type: 'text',
      text: '// SKILLS.SH 2026',
      x: 770,
      y: 52,
      width: 250,
      height: 28,
      rotation: 0,
      opacity: 1,
      zIndex: 3,
      fontSize: 18,
      fontFamily: '"Noto Sans SC", sans-serif',
      fontWeight: '900',
      color: '#FFFFFF',
      textAlign: 'center',
      lineHeight: 1.4,
      letterSpacing: 1,
    },
    // Title
    {
      id: generateId(),
      type: 'text',
      text: 'SKILLS CLI 排行榜',
      x: 60,
      y: 104,
      width: 960,
      height: 60,
      rotation: 0,
      opacity: 1,
      zIndex: 3,
      fontSize: 50,
      fontFamily: '"Noto Sans SC", sans-serif',
      fontWeight: '900',
      color: '#000000',
      textAlign: 'left',
      lineHeight: 1.2,
      letterSpacing: 2,
    },
    // Subtitle
    {
      id: generateId(),
      type: 'text',
      text: '全网最强 10 大 AI 编程扩展 / 新粗野高能撞色 / 直接上手',
      x: 60,
      y: 172,
      width: 960,
      height: 32,
      rotation: 0,
      opacity: 1,
      zIndex: 3,
      fontSize: 20,
      fontFamily: '"Noto Sans SC", sans-serif',
      fontWeight: '900',
      color: '#000000',
      textAlign: 'left',
      lineHeight: 1.4,
      letterSpacing: 1,
    },
    // Thick black divider line
    {
      id: generateId(),
      type: 'shape',
      shapeType: 'rectangle',
      x: 60,
      y: 216,
      width: 960,
      height: 4,
      rotation: 0,
      opacity: 1,
      zIndex: 2,
      backgroundColor: '#000000',
      borderRadius: 0,
    },
  ];

  const startY = 236;
  const cardHeight = 98;
  const gap = 12;

  const neoBadges = [
    { bg: '#FF2A6D', color: '#FFFFFF' },
    { bg: '#0055FF', color: '#FFFFFF' },
    { bg: '#00CC66', color: '#FFFFFF' },
    { bg: '#FF6B00', color: '#FFFFFF' },
    { bg: '#9900FF', color: '#FFFFFF' },
    { bg: '#000000', color: '#FFE600' },
    { bg: '#FF0055', color: '#FFFFFF' },
    { bg: '#0099FF', color: '#FFFFFF' },
    { bg: '#00AA44', color: '#FFFFFF' },
    { bg: '#000000', color: '#00F0FF' },
  ];

  SKILL_ITEMS.forEach((item, idx) => {
    const cardY = startY + idx * (cardHeight + gap);
    const badge = neoBadges[idx];

    // Neo-brutalist solid black drop shadow block
    elements.push({
      id: generateId(),
      type: 'shape',
      shapeType: 'rectangle',
      x: 66,
      y: cardY + 6,
      width: 954,
      height: cardHeight,
      rotation: 0,
      opacity: 1,
      zIndex: 2,
      backgroundColor: '#000000',
      borderRadius: 0,
    });

    // Foreground stark white card
    elements.push({
      id: generateId(),
      type: 'shape',
      shapeType: 'rectangle',
      x: 60,
      y: cardY,
      width: 954,
      height: cardHeight,
      rotation: 0,
      opacity: 1,
      zIndex: 3,
      backgroundColor: '#FFFFFF',
      borderRadius: 0,
    });

    // Sharp badge
    elements.push({
      id: generateId(),
      type: 'shape',
      shapeType: 'rectangle',
      x: 78,
      y: cardY + 24,
      width: 52,
      height: 50,
      rotation: 0,
      opacity: 1,
      zIndex: 4,
      backgroundColor: badge.bg,
      borderRadius: 0,
    });
    elements.push({
      id: generateId(),
      type: 'text',
      text: item.rank,
      x: 78,
      y: cardY + 33,
      width: 52,
      height: 32,
      rotation: 0,
      opacity: 1,
      zIndex: 5,
      fontSize: 22,
      fontFamily: '"Noto Sans SC", sans-serif',
      fontWeight: '900',
      color: badge.color,
      textAlign: 'center',
      lineHeight: 1.4,
      letterSpacing: 0,
    });

    // Skill Name + Author
    elements.push({
      id: generateId(),
      type: 'text',
      text: `${item.name}  /  ${item.author}`,
      x: 148,
      y: cardY + 16,
      width: 650,
      height: 34,
      rotation: 0,
      opacity: 1,
      zIndex: 4,
      fontSize: 25,
      fontFamily: '"Noto Sans SC", sans-serif',
      fontWeight: '900',
      color: '#000000',
      textAlign: 'left',
      lineHeight: 1.3,
      letterSpacing: 1,
    });

    // Description
    elements.push({
      id: generateId(),
      type: 'text',
      text: item.desc,
      x: 148,
      y: cardY + 54,
      width: 660,
      height: 28,
      rotation: 0,
      opacity: 1,
      zIndex: 4,
      fontSize: 17,
      fontFamily: '"Noto Sans SC", sans-serif',
      fontWeight: '700',
      color: '#1F2937',
      textAlign: 'left',
      lineHeight: 1.4,
      letterSpacing: 0.5,
    });

    // Metric pill
    elements.push({
      id: generateId(),
      type: 'shape',
      shapeType: 'rectangle',
      x: 825,
      y: cardY + 26,
      width: 175,
      height: 44,
      rotation: 0,
      opacity: 1,
      zIndex: 4,
      backgroundColor: '#000000',
      borderRadius: 0,
    });
    elements.push({
      id: generateId(),
      type: 'text',
      text: item.metric,
      x: 825,
      y: cardY + 35,
      width: 175,
      height: 26,
      rotation: 0,
      opacity: 1,
      zIndex: 5,
      fontSize: 19,
      fontFamily: '"Noto Sans SC", sans-serif',
      fontWeight: '900',
      color: '#FFE600',
      textAlign: 'center',
      lineHeight: 1.3,
      letterSpacing: 1,
    });
  });

  // Footer bar
  elements.push({
    id: generateId(),
    type: 'shape',
    shapeType: 'rectangle',
    x: 60,
    y: 1350,
    width: 960,
    height: 48,
    rotation: 0,
    opacity: 1,
    zIndex: 2,
    backgroundColor: '#000000',
    borderRadius: 0,
  });
  elements.push({
    id: generateId(),
    type: 'text',
    text: '★ SKILLS.SH 官方数据 · 微信高爆贴片 · 新粗野风 ★',
    x: 60,
    y: 1362,
    width: 960,
    height: 36,
    rotation: 0,
    opacity: 1,
    zIndex: 3,
    fontSize: 20,
    fontFamily: '"Noto Sans SC", sans-serif',
    fontWeight: '900',
    color: '#FFE600',
    textAlign: 'center',
    lineHeight: 1.4,
    letterSpacing: 2,
  });

  return {
    id: 'wechat-skills-neobrutal',
    name: 'Skills 排行榜 (新粗野风)',
    category: 'wechat',
    thumbnail: 'https://picsum.photos/seed/skillsneobrutal/200/266',
    state: {
      width: 1080,
      height: 1440,
      background: { type: 'color', value: '#FFE600' },
      elements,
    },
  };
};

// Helper to create Magazine / Editorial Minimalist Style
const createEditorialTemplate = (): Template => {
  const elements: CanvasElement[] = [
    // Header block
    {
      id: generateId(),
      type: 'shape',
      shapeType: 'rectangle',
      x: 0,
      y: 0,
      width: 1080,
      height: 220,
      rotation: 0,
      opacity: 1,
      zIndex: 1,
      backgroundColor: '#FAFAF9',
      borderRadius: 0,
    },
    // Eyebrow
    {
      id: generateId(),
      type: 'text',
      text: 'VOLUME 04 / ISSUE 2026 · TECHNOLOGY INDEX',
      x: 60,
      y: 48,
      width: 960,
      height: 28,
      rotation: 0,
      opacity: 1,
      zIndex: 3,
      fontSize: 16,
      fontFamily: '"Inter", sans-serif',
      fontWeight: '700',
      color: '#71717A',
      textAlign: 'left',
      lineHeight: 1.4,
      letterSpacing: 3,
    },
    // Title
    {
      id: generateId(),
      type: 'text',
      text: 'Skills CLI — Top 10 Index',
      x: 60,
      y: 96,
      width: 960,
      height: 58,
      rotation: 0,
      opacity: 1,
      zIndex: 3,
      fontSize: 48,
      fontFamily: '"Playfair Display", "Noto Serif SC", serif',
      fontWeight: '900',
      color: '#18181B',
      textAlign: 'left',
      lineHeight: 1.2,
      letterSpacing: 1,
    },
    // Subtitle
    {
      id: generateId(),
      type: 'text',
      text: 'A curated ranking of high-performance developer skills and autonomous tools.',
      x: 60,
      y: 164,
      width: 960,
      height: 32,
      rotation: 0,
      opacity: 1,
      zIndex: 3,
      fontSize: 18,
      fontFamily: '"Inter", sans-serif',
      fontWeight: '400',
      color: '#52525B',
      textAlign: 'left',
      lineHeight: 1.4,
      letterSpacing: 0.5,
    },
    // Hairline divider
    {
      id: generateId(),
      type: 'shape',
      shapeType: 'rectangle',
      x: 60,
      y: 214,
      width: 960,
      height: 1,
      rotation: 0,
      opacity: 1,
      zIndex: 2,
      backgroundColor: '#D4D4D8',
      borderRadius: 0,
    },
  ];

  const startY = 236;
  const cardHeight = 98;
  const gap = 12;

  SKILL_ITEMS.forEach((item, idx) => {
    const cardY = startY + idx * (cardHeight + gap);

    // Card background
    elements.push({
      id: generateId(),
      type: 'shape',
      shapeType: 'rectangle',
      x: 60,
      y: cardY,
      width: 960,
      height: cardHeight,
      rotation: 0,
      opacity: 1,
      zIndex: 2,
      backgroundColor: '#FFFFFF',
      borderRadius: 8,
    });

    // Hairline bottom line
    elements.push({
      id: generateId(),
      type: 'shape',
      shapeType: 'rectangle',
      x: 60,
      y: cardY + cardHeight - 1,
      width: 960,
      height: 1,
      rotation: 0,
      opacity: 1,
      zIndex: 3,
      backgroundColor: '#E4E4E7',
      borderRadius: 0,
    });

    // Numeral badge
    elements.push({
      id: generateId(),
      type: 'shape',
      shapeType: 'rectangle',
      x: 80,
      y: cardY + 24,
      width: 50,
      height: 50,
      rotation: 0,
      opacity: 1,
      zIndex: 3,
      backgroundColor: '#F4F4F5',
      borderRadius: 6,
    });
    elements.push({
      id: generateId(),
      type: 'text',
      text: item.rank,
      x: 80,
      y: cardY + 33,
      width: 50,
      height: 32,
      rotation: 0,
      opacity: 1,
      zIndex: 4,
      fontSize: 22,
      fontFamily: '"Inter", sans-serif',
      fontWeight: '700',
      color: '#18181B',
      textAlign: 'center',
      lineHeight: 1.4,
      letterSpacing: 0,
    });

    // Skill Name + Author
    elements.push({
      id: generateId(),
      type: 'text',
      text: `${item.name}  /  ${item.author}`,
      x: 148,
      y: cardY + 16,
      width: 650,
      height: 34,
      rotation: 0,
      opacity: 1,
      zIndex: 3,
      fontSize: 25,
      fontFamily: '"Noto Sans SC", sans-serif',
      fontWeight: '700',
      color: '#18181B',
      textAlign: 'left',
      lineHeight: 1.3,
      letterSpacing: 1,
    });

    // Description
    elements.push({
      id: generateId(),
      type: 'text',
      text: item.desc,
      x: 148,
      y: cardY + 54,
      width: 660,
      height: 28,
      rotation: 0,
      opacity: 1,
      zIndex: 3,
      fontSize: 17,
      fontFamily: '"Noto Sans SC", sans-serif',
      fontWeight: '400',
      color: '#52525B',
      textAlign: 'left',
      lineHeight: 1.4,
      letterSpacing: 0.5,
    });

    // Metric pill
    elements.push({
      id: generateId(),
      type: 'shape',
      shapeType: 'rectangle',
      x: 825,
      y: cardY + 28,
      width: 175,
      height: 42,
      rotation: 0,
      opacity: 1,
      zIndex: 3,
      backgroundColor: '#F4F4F5',
      borderRadius: 6,
    });
    elements.push({
      id: generateId(),
      type: 'text',
      text: item.metric,
      x: 825,
      y: cardY + 36,
      width: 175,
      height: 26,
      rotation: 0,
      opacity: 1,
      zIndex: 4,
      fontSize: 18,
      fontFamily: '"Inter", "Noto Sans SC", sans-serif',
      fontWeight: '600',
      color: '#27272A',
      textAlign: 'center',
      lineHeight: 1.3,
      letterSpacing: 1,
    });
  });

  // Footer
  elements.push({
    id: generateId(),
    type: 'shape',
    shapeType: 'rectangle',
    x: 60,
    y: 1340,
    width: 960,
    height: 1,
    rotation: 0,
    opacity: 1,
    zIndex: 2,
    backgroundColor: '#E4E4E7',
    borderRadius: 0,
  });
  elements.push({
    id: generateId(),
    type: 'text',
    text: 'INDEXED BY SKILLS.SH · WECHAT EDITORIAL CARD · ARCHIVAL EDITION',
    x: 60,
    y: 1362,
    width: 960,
    height: 36,
    rotation: 0,
    opacity: 1,
    zIndex: 3,
    fontSize: 18,
    fontFamily: '"Inter", sans-serif',
    fontWeight: '600',
    color: '#A1A1AA',
    textAlign: 'center',
    lineHeight: 1.4,
    letterSpacing: 2,
  });

  return {
    id: 'wechat-skills-editorial',
    name: 'Skills 排行榜 (杂志极简)',
    category: 'wechat',
    thumbnail: 'https://picsum.photos/seed/skillseditorial/200/266',
    state: {
      width: 1080,
      height: 1440,
      background: { type: 'color', value: '#FAFAF9' },
      elements,
    },
  };
};

export const WECHAT_STYLE_TEMPLATES: Template[] = [
  createDarkTemplate(),
  createCyberTemplate(),
  createColorfulTemplate(),
  createCuteTemplate(),
  createNeoBrutalTemplate(),
  createEditorialTemplate(),
];
