<div align="center">
  <img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

<div align="center">

# 🎨 小红书 / 微信封面模版生成器
### Social Media Cover Template Generator

**一款专为小红书、微信、公众号设计的智能封面模版工具**  
*An intelligent cover template tool designed for Xiaohongshu, WeChat & Official Accounts*

[![AI Powered](https://img.shields.io/badge/AI-Gemini%20Powered-blue?style=flat-square&logo=google)](https://ai.google.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-Required-green?style=flat-square&logo=node.dot.js)](https://nodejs.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](./LICENSE)

[**🔗 在线体验 / Live Demo**](https://ai.studio/apps/a3fa1066-f8d8-4cd7-b844-b42629eb96bd) · [**🐛 反馈问题 / Issues**](../../issues) · [**💡 功能建议 / Feature Request**](../../issues)

</div>

---

## 📖 目录 / Table of Contents

- [✨ 功能特性 / Features](#-功能特性--features)
- [🚀 快速开始 / Quick Start](#-快速开始--quick-start)
- [🛠️ 本地运行 / Run Locally](#️-本地运行--run-locally)
- [📐 支持平台 / Supported Platforms](#-支持平台--supported-platforms)
- [🎛️ 使用指南 / Usage Guide](#️-使用指南--usage-guide)
- [📁 项目结构 / Project Structure](#-项目结构--project-structure)
- [🤝 贡献 / Contributing](#-贡献--contributing)

---

## ✨ 功能特性 / Features

<table>
<tr>
<td width="50%">

### 🇨🇳 中文

- 🖼️ **多平台模版** — 内置小红书、微信、公众号等主流封面尺寸
- 🖊️ **文字编辑** — 自由添加、修改文字内容，支持多种字体样式
- 🎨 **背景定制** — 动态修改背景颜色、渐变、图案
- 📷 **图片上传** — 支持添加自定义图片素材
- ✏️ **元素装饰** — 添加图标、贴纸等装饰元素
- 📏 **尺寸调节** — 灵活调整文字大小、元素比例
- ⬇️ **一键导出** — 高清导出封面图片

</td>
<td width="50%">

### 🇬🇧 English

- 🖼️ **Multi-platform Templates** — Built-in sizes for Xiaohongshu, WeChat, Official Accounts & more
- 🖊️ **Text Editing** — Freely add and customize text with multiple font styles
- 🎨 **Background Customization** — Dynamically change colors, gradients, and patterns
- 📷 **Image Upload** — Add your own custom image assets
- ✏️ **Decorative Elements** — Add icons, stickers, and decorative components
- 📏 **Size Adjustment** — Flexibly resize text and element proportions
- ⬇️ **One-click Export** — Export high-quality cover images

</td>
</tr>
</table>

---

## 🚀 快速开始 / Quick Start

> 无需本地安装，直接在线体验！  
> No local setup needed — try it online instantly!

**👉 [点击这里在线使用 / Click here to use online](https://ai.studio/apps/a3fa1066-f8d8-4cd7-b844-b42629eb96bd)**

---

## 🛠️ 本地运行 / Run Locally

### 环境要求 / Prerequisites

| 工具 / Tool | 版本 / Version | 说明 / Notes |
|---|---|---|
| [Node.js](https://nodejs.org/) | >= 18.x | 必须 / Required |
| Gemini API Key | — | [获取 / Get it here](https://aistudio.google.com/app/apikey) |

### 安装步骤 / Installation Steps

**1. 克隆仓库 / Clone the repository**

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

**2. 安装依赖 / Install dependencies**

```bash
npm install
```

**3. 配置 API 密钥 / Set your API key**

将你的 Gemini API Key 填入 `.env.local` 文件：  
Add your Gemini API Key to the `.env.local` file:

```env
GEMINI_API_KEY=your_api_key_here
```

> 💡 还没有 API Key？前往 [Google AI Studio](https://aistudio.google.com/app/apikey) 免费获取。  
> 💡 Don't have an API key? Get one for free at [Google AI Studio](https://aistudio.google.com/app/apikey).

**4. 启动项目 / Start the app**

```bash
npm run dev
```

浏览器打开 / Open in browser: **`http://localhost:3000`**

---

## 📐 支持平台 / Supported Platforms

| 平台 / Platform | 封面类型 / Cover Type | 推荐尺寸 / Recommended Size |
|---|---|---|
| 📕 小红书 | 笔记封面 / Post Cover | 3:4 (1080 × 1440px) |
| 📕 小红书 | 头像封面 / Profile Cover | 1:1 (1080 × 1080px) |
| 💬 微信 | 朋友圈封面 / Moments Cover | 16:9 (1920 × 1080px) |
| 📰 微信公众号 | 文章封面 / Article Cover | 900 × 383px |
| 📰 微信公众号 | 次图封面 / Secondary Cover | 200 × 200px |

---

## 🎛️ 使用指南 / Usage Guide

### 🇨🇳 中文使用步骤

1. **选择模版** — 从左侧面板选择适合的平台封面尺寸
2. **添加图片** — 点击「上传图片」按钮，添加你的素材图片
3. **编辑文字** — 双击画布添加文字，或在右侧面板输入内容
4. **调整样式** — 修改字体、字号、颜色、对齐方式等
5. **修改背景** — 在背景设置中选择颜色、渐变或自定义背景图
6. **添加元素** — 从元素库中拖拽装饰图标或贴纸
7. **导出图片** — 点击「导出」按钮，保存高清封面图

### 🇬🇧 English Usage Steps

1. **Choose a Template** — Select a platform cover size from the left panel
2. **Add Images** — Click "Upload Image" to add your own image assets
3. **Edit Text** — Double-click on the canvas to add text, or type in the right panel
4. **Adjust Styles** — Modify font, size, color, alignment, and more
5. **Change Background** — Pick a solid color, gradient, or custom background image
6. **Add Elements** — Drag decorative icons or stickers from the element library
7. **Export** — Click "Export" to save your high-quality cover image

---

## 📁 项目结构 / Project Structure

```
.
├── 📂 app/                  # Next.js App Router pages
├── 📂 components/           # Reusable UI components / 可复用组件
│   ├── canvas/              # Canvas editor components / 画布编辑器
│   ├── toolbar/             # Toolbar & controls / 工具栏
│   └── panels/              # Side panels / 侧边面板
├── 📂 public/               # Static assets / 静态资源
│   ├── templates/           # Preset templates / 预设模版
│   └── elements/            # Decorative elements / 装饰元素
├── 📂 lib/                  # Utilities & helpers / 工具函数
├── .env.local               # Environment variables / 环境变量 (⚠️ 不要上传 / do not commit)
├── package.json
└── README.md
```

---

## 🤝 贡献 / Contributing

欢迎提交 Issue 和 Pull Request！  
Issues and Pull Requests are welcome!

```bash
# Fork 本仓库 / Fork this repo
# 创建你的分支 / Create your branch
git checkout -b feature/your-feature-name

# 提交更改 / Commit your changes
git commit -m "feat: add some feature"

# 推送分支 / Push to branch
git push origin feature/your-feature-name

# 创建 Pull Request / Open a Pull Request
```

---

<div align="center">

如果这个项目对你有帮助，欢迎 ⭐ Star 支持！  
If this project helped you, please consider giving it a ⭐ Star!

Made with ❤️ using [Google Gemini](https://ai.google.dev/) & [AI Studio](https://aistudio.google.com/)

</div>
