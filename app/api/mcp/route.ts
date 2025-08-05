import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Dummy MCP proxy - returns mock data
    // Thay thế bằng actual MCP server URL khi có
    
    const { method, params } = body
    
    if (method === 'search_bootcamp_content') {
      // Simulate MCP server response
      const query = params?.query?.toLowerCase() || ''
      
      let mockResults = []
      
      if (query.includes('học phí') || query.includes('tuition')) {
        mockResults = [
          {
            title: 'Tuition Information',
            content: 'Học phí bootcamp tại Australia là AUD $15,000 cho khóa học 16 tuần. Có thể trả góp 3 kỳ, mỗi kỳ AUD $5,000. / The bootcamp tuition in Australia is AUD $15,000 for 16 weeks, payable in 3 installments of AUD $5,000 each.',
            type: 'pricing'
          }
        ]
      } else if (query.includes('thời gian') || query.includes('duration')) {
        mockResults = [
          {
            title: 'Program Duration',
            content: 'Bootcamp kéo dài 16 tuần (4 tháng) theo múi giờ Australia (AEST). Học full-time từ thứ 2 đến thứ 6. / The bootcamp lasts 16 weeks (4 months) in Australian Eastern Standard Time, full-time Monday to Friday.',
            type: 'schedule'
          }
        ]
      } else if (query.includes('curriculum') || query.includes('chương trình')) {
        mockResults = [
          {
            title: 'Curriculum',
            content: 'Chương trình bao gồm: Frontend (HTML, CSS, JavaScript, React), Backend (Node.js, Express), Database (MongoDB), và deployment. Dự án thực tế với công ty Australia. / Curriculum includes Frontend, Backend, Database, and real projects with Australian companies.',
            type: 'curriculum'
          }
        ]
      } else {
        mockResults = [
          {
            title: 'General Information',
            content: 'Bootcamp lập trình full-stack 16 tuần tại Australia. Học phí AUD $15,000, tỷ lệ có việc làm 85%, lương trung bình AUD $60,000-80,000. / 16-week full-stack bootcamp in Australia. Tuition AUD $15,000, 85% job placement rate, average salary AUD $60,000-80,000.',
            type: 'general'
          }
        ]
      }
      
      return NextResponse.json({
        success: true,
        data: mockResults,
        results: mockResults // Alternative format
      })
    }
    
    return NextResponse.json({
      success: false,
      error: 'Method not supported'
    }, { status: 400 })
    
  } catch (error) {
    console.error('MCP Proxy Error:', error)
    
    return NextResponse.json({
      success: false,
      error: 'MCP proxy error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'MCP Proxy is working',
    available_methods: ['search_bootcamp_content'],
    note: 'This is a mock proxy. Replace with actual MCP server when available.'
  })
}
