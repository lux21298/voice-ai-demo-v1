# 🎤 Voice AI Demo V1 - Bootcamp Assistant

> Simple voice AI assistant for programming bootcamp in Australia

## ✨ Features

- 🎤 **Voice Recording** (max 10 seconds)
- 🔊 **Speech-to-Text** using OpenAI Whisper
- 🔍 **Bootcamp Info Search** via MCP integration
- 🤖 **AI Response** using GPT-4o-mini
- 🗣️ **Text-to-Speech** for audio responses
- 🌐 **Multi-language** - Vietnamese & English support

## 🚀 Quick Start

1. **Clone & Install**
   ```bash
   git clone <repository-url>
   cd voice-demo-v1
   npm install
   ```

2. **Environment Setup**
   ```bash
   cp .env.example .env.local
   # Add your OpenAI API key to .env.local
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```

4. **Open** http://localhost:3000

## 🔧 Required API Keys

- **OpenAI API Key** - For Whisper STT, GPT-4o-mini, and TTS

## 💰 Bootcamp Information (Mock Data)

- **Tuition**: AUD $15,000 (3 installments of AUD $5,000)
- **Duration**: 16 weeks full-time in Australia (AEST)
- **Curriculum**: HTML/CSS, JavaScript, React, Node.js, MongoDB
- **Job Rate**: 85% placement within 6 months, AUD $60,000-80,000 salary

## 🎯 Example Questions

**Vietnamese**: "Học phí bootcamp bao nhiêu?"  
**English**: "How much is the tuition?"

## 🛠️ Tech Stack

- Next.js 14 + TypeScript
- OpenAI (Whisper, GPT-4o-mini, TTS)
- Tailwind CSS
- react-media-recorder

## 📱 Demo Flow

Voice → Whisper STT → MCP Search → GPT Response → TTS Audio

---

**Version**: V1 Simple  
**Development Time**: 3 days  
**Complexity**: ⭐⭐☆☆☆ (2/5)
