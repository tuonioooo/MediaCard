<div align="center">
  <img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

<div align="center">

**[English](./README.md)** · [简体中文](./README.zh-CN.md)

</div>

---

<div align="center">

# Social Media Cover Template Generator

*An intelligent cover template tool designed for Xiaohongshu, WeChat & Official Accounts*

[![AI Powered](https://img.shields.io/badge/AI-Gemini%20Powered-blue?style=flat-square&logo=google)](https://ai.google.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-Required-green?style=flat-square&logo=node.dot.js)](https://nodejs.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](./LICENSE)

[**🔗 Live Demo**](https://ai.studio/apps/a3fa1066-f8d8-4cd7-b844-b42629eb96bd) · [**🐛 Report Issues**](../../issues) · [**💡 Feature Request**](../../issues)

</div>

---

## 📖 Table of Contents

- [✨ Features](#-features)
- [🚀 Quick Start](#-quick-start)
- [🛠️ Run Locally](#️-run-locally)
- [📐 Supported Platforms](#-supported-platforms)
- [🎛️ Usage Guide](#️-usage-guide)
- [📁 Project Structure](#-project-structure)
- [🤝 Contributing](#-contributing)

---

## ✨ Features

- 🖼️ **Multi-platform Templates** — Built-in cover sizes for Xiaohongshu, WeChat, Official Accounts & more
- 🖊️ **Text Editing** — Freely add and customize text with multiple font styles
- 🎨 **Background Customization** — Dynamically change colors, gradients, and patterns
- 📷 **Image Upload** — Add your own custom image assets to the canvas
- ✏️ **Decorative Elements** — Add icons, stickers, and decorative components
- 📏 **Size Adjustment** — Flexibly resize text and adjust element proportions
- ⬇️ **One-click Export** — Export high-resolution cover images instantly

---

## 🚀 Quick Start

> No local setup needed — try it online instantly!

**👉 [Click here to use online](https://ai.studio/apps/a3fa1066-f8d8-4cd7-b844-b42629eb96bd)**

---

## 🛠️ Run Locally

### Prerequisites

| Tool | Version | Notes |
|---|---|---|
| [Node.js](https://nodejs.org/) | >= 18.x | Required |
| Gemini API Key | — | [Get it here](https://aistudio.google.com/app/apikey) |

### Installation Steps

**1. Clone the repository**

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

**2. Install dependencies**

```bash
npm install
```

**3. Set your API key**

Add your Gemini API Key to the `.env.local` file:

```env
GEMINI_API_KEY=your_api_key_here
```

> 💡 Don't have an API key? Get one for free at [Google AI Studio](https://aistudio.google.com/app/apikey).

**4. Start the app**

```bash
npm run dev
```

Open in browser: **`http://localhost:3000`**

---

## 📐 Supported Platforms

| Platform | Cover Type | Recommended Size |
|---|---|---|
| 📕 Xiaohongshu | Post Cover | 3:4 (1080 × 1440px) |
| 📕 Xiaohongshu | Profile Cover | 1:1 (1080 × 1080px) |
| 💬 WeChat | Moments Cover | 16:9 (1920 × 1080px) |
| 📰 WeChat Official Account | Article Cover | 900 × 383px |
| 📰 WeChat Official Account | Secondary Cover | 200 × 200px |

---

## 🎛️ Usage Guide

1. **Choose a Template** — Select a platform cover size from the left panel
2. **Add Images** — Click "Upload Image" to add your own image assets
3. **Edit Text** — Double-click on the canvas to add text, or type in the right panel
4. **Adjust Styles** — Modify font, size, color, alignment, and more
5. **Change Background** — Pick a solid color, gradient, or custom background image
6. **Add Elements** — Drag decorative icons or stickers from the element library
7. **Export** — Click "Export" to save your high-quality cover image

---

## 📁 Project Structure

```
.
├── 📂 app/                  # Next.js App Router pages
├── 📂 components/           # Reusable UI components
│   ├── canvas/              # Canvas editor components
│   ├── toolbar/             # Toolbar & controls
│   └── panels/              # Side panels
├── 📂 public/               # Static assets
│   ├── templates/           # Preset templates
│   └── elements/            # Decorative elements
├── 📂 lib/                  # Utilities & helpers
├── .env.local               # Environment variables (⚠️ do not commit)
├── package.json
└── README.md
```

---

## 🤝 Contributing

Issues and Pull Requests are welcome!

```bash
# Fork this repo, then:
git checkout -b feature/your-feature-name
git commit -m "feat: add some feature"
git push origin feature/your-feature-name
# Open a Pull Request
```

---

<div align="center">

If this project helped you, please consider giving it a ⭐ Star!

Made with ❤️ using [Google Gemini](https://ai.google.dev/) & [AI Studio](https://aistudio.google.com/)

</div>
