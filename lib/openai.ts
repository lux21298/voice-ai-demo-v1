import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function transcribeAudio(audioBlob: Blob): Promise<string> {
  try {
    const formData = new FormData()
    formData.append('file', audioBlob, 'recording.webm')
    formData.append('model', 'whisper-1')
    formData.append('language', 'auto') // Auto-detect language

    const response = await openai.audio.transcriptions.create({
      file: audioBlob as any,
      model: 'whisper-1',
    })

    return response.text.trim()
  } catch (error) {
    console.error('Transcription error:', error)
    throw new Error('Failed to transcribe audio')
  }
}

export async function generateResponse(
  transcript: string, 
  mcpResults: any[]
): Promise<{ text: string; language: 'vi' | 'en' }> {
  try {
    // Detect language based on transcript
    const isVietnamese = /[àáảãạăắằẳẵặâấầẩẫậèéẻẽẹêếềểễệìíỉĩịòóỏõọôốồổỗộơớờởỡợùúủũụưứừửữựỳýỷỹỵđ]/i.test(transcript)
    const language: 'vi' | 'en' = isVietnamese ? 'vi' : 'en'

    // Prepare context from MCP results
    const context = mcpResults.length > 0 
      ? `Context from bootcamp information: ${JSON.stringify(mcpResults, null, 2)}`
      : 'No specific bootcamp information found. Please provide general helpful response.'

    const systemPrompt = language === 'vi' 
      ? `Bạn là trợ lý AI cho bootcamp lập trình tại Australia. Trả lời câu hỏi bằng tiếng Việt một cách ngắn gọn và hữu ích. Luôn sử dụng tiền tệ AUD và thông tin chính xác về Australia. Nếu có thông tin từ context, hãy sử dụng. Nếu không có thông tin cụ thể, hãy đưa ra câu trả lời chung và gợi ý liên hệ để biết thêm chi tiết.`
      : `You are an AI assistant for a programming bootcamp located in Australia. Answer questions in English concisely and helpfully. Always use AUD currency and accurate Australian information. If you have context information, use it. If not, provide general helpful answers and suggest contacting for more details.`

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `Context: ${context}\n\nQuestion: ${transcript}` }
      ],
      max_tokens: 150,
      temperature: 0.7,
    })

    const responseText = response.choices[0]?.message?.content?.trim() || 'Sorry, I could not generate a response.'
    
    return {
      text: responseText,
      language
    }
  } catch (error) {
    console.error('Response generation error:', error)
    throw new Error('Failed to generate response')
  }
}

export async function textToSpeech(text: string, language: 'vi' | 'en'): Promise<string> {
  try {
    // Choose voice based on language
    const voice = language === 'vi' ? 'nova' : 'alloy'

    const response = await openai.audio.speech.create({
      model: 'tts-1',
      voice: voice,
      input: text,
    })

    // Convert response to base64 for client-side playback
    const arrayBuffer = await response.arrayBuffer()
    const base64 = Buffer.from(arrayBuffer).toString('base64')
    
    // Return data URL for audio playback
    const audioUrl = `data:audio/mpeg;base64,${base64}`
    
    return audioUrl
  } catch (error) {
    console.error('Text-to-speech error:', error)
    throw new Error('Failed to convert text to speech')
  }
}
