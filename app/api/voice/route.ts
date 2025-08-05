import { NextRequest, NextResponse } from 'next/server'
import { transcribeAudio, generateResponse, textToSpeech } from '@/lib/openai'
import { searchBootcamp } from '@/lib/mcp-client'

export async function POST(request: NextRequest) {
  try {
    // Get audio file from FormData
    const formData = await request.formData()
    const audioFile = formData.get('audio') as File
    
    if (!audioFile) {
      return NextResponse.json(
        { error: 'No audio file provided' },
        { status: 400 }
      )
    }

    // Step 1: Transcribe audio to text
    console.log('Transcribing audio...')
    const transcript = await transcribeAudio(audioFile)
    
    if (!transcript) {
      return NextResponse.json(
        { error: 'Could not transcribe audio' },
        { status: 400 }
      )
    }

    console.log('Transcript:', transcript)

    // Step 2: Search MCP for relevant content
    console.log('Searching bootcamp content...')
    const mcpResults = await searchBootcamp(transcript)
    
    // Step 3: Generate AI response
    console.log('Generating AI response...')
    const aiResponse = await generateResponse(transcript, mcpResults.data)
    
    // Step 4: Convert response to speech
    console.log('Converting to speech...')
    const audioUrl = await textToSpeech(aiResponse.text, aiResponse.language)

    // Return complete response
    return NextResponse.json({
      transcript,
      response: aiResponse.text,
      audioUrl,
      language: aiResponse.language,
      mcpResults: mcpResults.data
    })

  } catch (error) {
    console.error('API Error:', error)
    
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Internal server error',
        details: process.env.NODE_ENV === 'development' ? error : undefined
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Voice API endpoint is working',
    endpoints: {
      POST: 'Upload audio file for processing'
    }
  })
}
