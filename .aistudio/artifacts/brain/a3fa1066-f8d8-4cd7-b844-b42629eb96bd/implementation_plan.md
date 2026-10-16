# 微信贴片：Skills CLI 排行榜 Top 10 模板实现计划

## 1. 需求与设计规范
- **贴片尺寸**：1080 × 1440 px（3:4 比例，适合微信公众号长图文贴片与长图分享）。
- **内容完整性**：完整收录 skills.sh 官方生态前10名 Skills CLI 技能（涵盖名称、出品方、安装/热度数据如 240万+、核心功能介绍）。
- **视觉风格与色彩规范**：严格保持原贴图专业硬核的技术黑金/极客深色调（主背景 `#0A0E17`、科技青 `#00E5FF`、高亮金/橙 `#FFB300`、浅灰说明文字 `#94A3B8`、纯白标题 `#FFFFFF`），不改变色彩规范。
- **排版结构**：单列纵向排版，顶部包含分类徽章与醒目标题，中间 10 张清晰规整的排名卡片，底部带有生态标注与来源说明。
- **完全可编辑**：所有榜单卡片、数字标签、文案、热度数据均转为画布可交互图层（文本与矩形背景图层），用户在画布上可直接双击修改文字、拖拽移动与调节颜色。

---

## 2. 详细数据清单 (Top 10)
1. **No.01 `find-skills`** | Vercel Labs | 240万+ | 技能生态入口与CLI核心管理工具，支持搜索/安装扩展
2. **No.02 `frontend-design`** | Anthropic | 62.8万+ | 拒绝AI套样，生成高质感独特的前端界面与组件设计
3. **No.03 `vercel-react-best-practices`** | Vercel Labs | 52.7万+ | 70+条React与Next.js全栈性能优化与反模式规避法则
4. **No.04 `agent-browser`** | Vercel Labs | 51.4万+ | 高效Token快照与Ref映射，赋能AI Agent自主浏览网页
5. **No.05 `grill-me`** | Matt Pocock | 45.9万+ | 灵魂拷问型结构化访谈，深度排查方案潜在漏洞与盲点
6. **No.06 `web-design-guidelines`** | Vercel Labs | 44.0万+ | Vercel官方UI设计与交互规范审查器，确保视觉一致性
7. **No.07 `microsoft-foundry`** | Microsoft | 43.2万+ | 覆盖Azure AI Foundry智能体全生命周期构建与管理
8. **No.08 `remotion-best-practices`** | Remotion | 41.6万+ | 使用React编程式生成视频的最佳工程实践与性能指南
9. **No.09 `improve-codebase-architecture`** | Matt Pocock | 40.8万+ | 全局代码架构体检师，系统性发现并清理技术债
10. **No.10 `tdd`** | Matt Pocock | 39.0万+ | 测试驱动开发辅助技能，引导Agent高标准编写自动化测试

---

## 3. 实现步骤

### 步骤 1：在 `src/constants.ts` 中新增微信贴片模板
- 模板 ID：`wechat-skills-ranking`
- 分类：`wechat`
- 尺寸：`width: 1080`, `height: 1440`
- 构建完整的层级图元（Header 标题区域、10 个精细定位的卡片背景框与高亮排名 Badge、两行结构化文本：第一行技能名称与热度标签，第二行作用与出品方说明、Footer 底部版权）。

### 步骤 2：在 `src/App.tsx` 中同步载入当前画布
- 将初始状态 `currentTemplateId` 与 `state` 设置为 `wechat-skills-ranking`。
- 保证用户刷新或启动应用时，第一眼就能看到此贴片完整呈现并处于立即可编辑状态。

### 步骤 3：验证与构建检查
- 执行 `compile_applet` 确保 TypeScript 无编译报错。
- 确认文字换行、卡片间距在 1080x1440 画布下完美居中且无文字重叠。
