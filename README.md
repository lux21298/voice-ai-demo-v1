# Voice AI Demo V1 - Bootcamp Assistant

Ứng dụng Voice AI đơn giản cho phép người dùng hỏi về thông tin bootcamp bằng giọng nói và nhận phản hồi bằng cả text và audio.

## ✨ Tính năng

- 🎤 **Ghi âm giọng nói** (tối đa 10 giây)
- 🔊 **Speech-to-Text** sử dụng OpenAI Whisper
- 🔍 **Tìm kiếm thông tin** bootcamp qua MCP server
- 🤖 **AI Response** sử dụng GPT-4o-mini
- 🗣️ **Text-to-Speech** cho phản hồi
- 🌐 **Đa ngôn ngữ** - Tiếng Việt và English

## 🚀 Cài đặt

### 1. Clone và cài đặt dependencies

```bash
cd voice-demo-v1
npm install
```

### 2. Cấu hình environment variables

Tạo file `.env.local`:

```bash
cp .env.example .env.local
```

Cập nhật file `.env.local`:

```env
OPENAI_API_KEY=your_openai_api_key_here
MCP_SERVER_URL=http://localhost:3000/api/mcp
```

### 3. Chạy ứng dụng

```bash
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000) trong browser.

## 📁 Cấu trúc project

```
voice-demo-v1/
├── app/
│   ├── page.tsx              # Main UI
│   ├── layout.tsx            # Layout
│   ├── globals.css           # Global styles
│   └── api/
│       └── voice/
│           └── route.ts      # API endpoint
├── components/
│   └── VoiceRecorder.tsx     # Voice recording component
├── lib/
│   ├── openai.ts            # OpenAI integration
│   └── mcp-client.ts        # MCP client with mock data
├── .env.example             # Environment variables template
└── package.json
```

## 🔧 API Keys cần thiết

### OpenAI API Key
1. Đăng ký tại [platform.openai.com](https://platform.openai.com)
2. Tạo API key
3. Thêm vào `.env.local`

### MCP Server (Optional)
- Nếu không có MCP server, app sẽ sử dụng mock data
- Mock data bao gồm thông tin cơ bản về học phí, thời gian, chương trình

## 🎯 Cách sử dụng

1. **Cho phép microphone access** khi browser hỏi
2. **Nhấn nút 🎤** để bắt đầu ghi âm
3. **Nói câu hỏi** trong 10 giây (ví dụ: "Học phí bootcamp bao nhiêu?")
4. **Đợi xử lý** - app sẽ hiển thị transcript và response
5. **Nghe phản hồi** qua audio player

## 🔍 Ví dụ câu hỏi

### Tiếng Việt:
- "Học phí bootcamp bao nhiêu?"
- "Thời gian học bao lâu?"
- "Chương trình học những gì?"
- "Cơ hội việc làm ở Australia như thế nào?"

### English:
- "How much is the tuition?"
- "How long is the program?"
- "What does the curriculum include?"
- "What are the job opportunities in Australia?"

## 🚨 Troubleshooting

### Lỗi microphone
- Kiểm tra browser đã cho phép microphone access
- Refresh page và thử lại
- Kiểm tra microphone hoạt động với ứng dụng khác

### Lỗi OpenAI API
- Kiểm tra API key đúng format
- Kiểm tra có credits trong tài khoản
- Xem console logs để debug

### Lỗi không có âm thanh
- Kiểm tra speaker/headphone hoạt động
- Thử refresh page
- Kiểm tra browser support audio playback

## 🔄 Mock Data

App có sẵn mock data cho demo khi MCP server không available:

- **Học phí**: AUD $15,000, trả góp 3 kỳ (AUD $5,000 mỗi kỳ)
- **Thời gian**: 16 tuần full-time hoặc 6 tháng part-time (Australia timezone AEST)
- **Chương trình**: HTML/CSS, JavaScript, React, Node.js, MongoDB
- **Việc làm**: 85% có việc trong 6 tháng tại Australia, lương AUD $60,000-80,000

## 🚀 Deploy lên Vercel

1. Push code lên GitHub
2. Connect với Vercel
3. Add environment variables trong Vercel dashboard
4. Deploy

**Lưu ý**: MCP server cần accessible từ internet nếu deploy production.

## 📊 Performance

- **Transcription**: ~2-3 giây
- **AI Response**: ~3-5 giây  
- **TTS**: ~2-3 giây
- **Total**: ~10-15 giây cho full flow

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Voice Recording**: react-media-recorder
- **AI Services**: OpenAI (Whisper, GPT-4o-mini, TTS)
- **Deployment**: Vercel

## 📝 Next Steps (V2)

- [ ] Conversation history
- [ ] User authentication  
- [ ] Real-time streaming
- [ ] Phone integration
- [ ] Booking functions
- [ ] Advanced error handling
- [ ] Caching responses

---

**Phiên bản**: V1 - Simple Version  
**Thời gian phát triển**: 3 ngày  
**Mức độ**: ⭐⭐☆☆☆ (2/5)
