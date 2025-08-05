'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'

// Dynamically import VoiceRecorder with no SSR to avoid Worker API issues
const VoiceRecorder = dynamic(() => import('@/components/VoiceRecorder'), {
  ssr: false,
  loading: () => (
    <div className="flex flex-col items-center space-y-4">
      <div className="w-32 h-32 rounded-full bg-gray-200 animate-pulse flex items-center justify-center">
        <span className="text-gray-500">Loading...</span>
      </div>
      <p className="text-gray-500">Đang tải voice recorder...</p>
    </div>
  ),
})

interface VoiceResponse {
  transcript: string
  response: string
  audioUrl: string
  language: 'vi' | 'en'
}

export default function Home() {
  const [transcript, setTranscript] = useState<string>('')
  const [response, setResponse] = useState<string>('')
  const [audioUrl, setAudioUrl] = useState<string>('')
  const [isProcessing, setIsProcessing] = useState<boolean>(false)

  const handleVoiceProcessed = (result: VoiceResponse) => {
    setTranscript(result.transcript)
    setResponse(result.response)
    setAudioUrl(result.audioUrl)
    setIsProcessing(false)
  }

  const handleProcessingStart = () => {
    setIsProcessing(true)
    setTranscript('')
    setResponse('')
    setAudioUrl('')
  }

  const handleError = (error: string) => {
    setIsProcessing(false)
    setResponse(`Lỗi: ${error}`)
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container max-w-2xl mx-auto p-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            🎓 Bootcamp Voice Assistant
          </h1>
          <p className="text-gray-600">
            Hỏi về bootcamp bằng giọng nói - Ask about bootcamp with your voice
          </p>
        </div>

        {/* Voice Recorder */}
        <div className="mb-8">
          <VoiceRecorder
            onVoiceProcessed={handleVoiceProcessed}
            onProcessingStart={handleProcessingStart}
            onError={handleError}
            isProcessing={isProcessing}
          />
        </div>

        {/* Transcript Display */}
        {transcript && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Bạn nói / You said:
            </h3>
            <div className="bg-gray-100 rounded-lg p-4 border">
              <p className="text-gray-800">{transcript}</p>
            </div>
          </div>
        )}

        {/* Response Display */}
        {response && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Trả lời / Response:
            </h3>
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <p className="text-gray-800">{response}</p>
            </div>
          </div>
        )}

        {/* Audio Player */}
        {audioUrl && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Nghe phản hồi / Listen to response:
            </h3>
            <audio controls className="w-full" src={audioUrl}>
              Your browser does not support the audio element.
            </audio>
          </div>
        )}

        {/* Processing State */}
        {isProcessing && (
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-lg">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
              <span className="text-blue-600">Đang xử lý...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
