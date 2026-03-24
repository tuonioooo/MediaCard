<div align="center">
  <img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

<div align="center">

[English](./README.md) · **[简体中文](./README.zh-CN.md)**

</div>

---

<div align="center">

# 社交媒体封面模版生成器

*一款专为小红书、微信、公众号设计的智能封面模版工具*

[![AI Powered](https://img.shields.io/badge/AI-Gemini%20驱动-blue?style=flat-square&logo=google)](https://ai.google.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-必须安装-green?style=flat-square&logo=node.dot.js)](https://nodejs.org/)
[![License](https://img.shields.io/badge/许可证-MIT-yellow?style=flat-square)](./LICENSE)

[**🔗 在线体验**](https://ai.studio/apps/a3fa1066-f8d8-4cd7-b844-b42629eb96bd) · [**🐛 反馈问题**](../../issues) · [**💡 功能建议**](../../issues)

</div>

---

## 📖 目录

- [✨ 功能特性](#-功能特性)
- [🚀 快速开始](#-快速开始)
- [🛠️ 本地运行](#️-本地运行)
- [📐 支持平台与尺寸](#-支持平台与尺寸)
- [🎛️ 使用指南](#️-使用指南)
- [📁 项目结构](#-项目结构)
- [🤝 参与贡献](#-参与贡献)

---

## ✨ 功能特性

- 🖼️ **多平台模版** — 内置小红书、微信、公众号等主流封面尺寸，开箱即用
- 🖊️ **文字编辑** — 自由添加、修改文字内容，支持多种字体样式与排版
- 🎨 **背景定制** — 动态修改背景颜色、渐变效果或自定义图案
- 📷 **图片上传** — 支持上传并添加自定义图片素材到画布
- ✏️ **元素装饰** — 从元素库中添加图标、贴纸等装饰元素
- 📏 **尺寸调节** — 灵活调整文字大小、元素位置与比例
- ⬇️ **一键导出** — 高清导出封面图片，直接使用

---

## 🚀 快速开始

> 无需本地安装，直接在线体验！

**👉 [点击这里立即在线使用](https://ai.studio/apps/a3fa1066-f8d8-4cd7-b844-b42629eb96bd)**

---

## 🛠️ 本地运行

### 环境要求

| 工具 | 版本 | 说明 |
|---|---|---|
| [Node.js](https://nodejs.org/) | >= 18.x | 必须安装 |
| Gemini API Key | — | [点击免费获取](https://aistudio.google.com/app/apikey) |

### 安装步骤

**1. 克隆仓库**

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

**2. 安装依赖**

```bash
npm install
```

**3. 配置 API 密钥**

将你的 Gemini API Key 填入项目根目录下的 `.env.local` 文件：

```env
GEMINI_API_KEY=你的密钥填在这里
```

> 💡 还没有 API Key？前往 [Google AI Studio](https://aistudio.google.com/app/apikey) 免费申请，无需付费。

**4. 启动项目**

```bash
npm run dev
```

在浏览器打开：**`http://localhost:3000`**

---

## 📐 支持平台与尺寸

| 平台 | 封面类型 | 推荐尺寸 |
|---|---|---|
| 📕 小红书 | 笔记封面 | 3:4（1080 × 1440px） |
| 📕 小红书 | 头像封面 | 1:1（1080 × 1080px） |
| 💬 微信 | 朋友圈封面 | 16:9（1920 × 1080px） |
| 📰 微信公众号 | 文章封面首图 | 900 × 383px |
| 📰 微信公众号 | 文章封面次图 | 200 × 200px |

---

## 🎛️ 使用指南

1. **选择模版** — 从左侧面板选择适合你发布平台的封面尺寸
2. **添加图片** — 点击「上传图片」按钮，将自己的图片素材添加到画布
3. **编辑文字** — 双击画布空白处新增文字，或在右侧面板直接输入内容
4. **调整样式** — 修改字体、字号、颜色、粗细、对齐方式等文字样式
5. **修改背景** — 在背景设置区选择纯色、渐变色，或上传自定义背景图
6. **添加元素** — 从元素库中拖入装饰图标、贴纸或分割线等素材
7. **导出图片** — 完成设计后点击「导出」按钮，保存高清封面图

---

## 📁 项目结构

```
.
├── 📂 app/                  # Next.js App Router 页面
├── 📂 components/           # 可复用 UI 组件
│   ├── canvas/              # 画布编辑器组件
│   ├── toolbar/             # 工具栏与操作控件
│   └── panels/              # 左右侧边面板
├── 📂 public/               # 静态资源文件
│   ├── templates/           # 预设模版文件
│   └── elements/            # 装饰元素素材
├── 📂 lib/                  # 工具函数与辅助模块
├── .env.local               # 环境变量配置（⚠️ 请勿提交到 Git）
├── package.json
└── README.md
```

---

## 🤝 参与贡献

欢迎提交 Issue 和 Pull Request，一起完善这个项目！

```bash
# Fork 本仓库后：
git checkout -b feature/你的功能名称

# 提交更改
git commit -m "feat: 添加某某功能"

# 推送分支
git push origin feature/你的功能名称

# 在 GitHub 上创建 Pull Request
```

---

<div align="center">

如果这个项目对你有帮助，欢迎点个 ⭐ Star 支持一下！

Made with ❤️ using [Google Gemini](https://ai.google.dev/) & [AI Studio](https://aistudio.google.com/)

</div>
