interface MCPResponse {
  success: boolean
  data: any[]
  error?: string
}

export async function searchBootcamp(query: string): Promise<MCPResponse> {
  try {
    // Mock data for demo purposes since MCP server might not be available
    const mockData = getMockBootcampData(query.toLowerCase())
    
    if (mockData.length > 0) {
      return {
        success: true,
        data: mockData
      }
    }

    // Try to connect to actual MCP server
    const mcpUrl = process.env.MCP_SERVER_URL || 'http://localhost:3000/api/mcp'
    
    const response = await fetch(mcpUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        method: 'search_bootcamp_content',
        params: { query }
      })
    })

    if (!response.ok) {
      throw new Error(`MCP server error: ${response.status}`)
    }

    const result = await response.json()
    
    return {
      success: true,
      data: result.data || result.results || []
    }
  } catch (error) {
    console.error('MCP connection error:', error)
    
    // Fallback to mock data
    const fallbackData = getMockBootcampData(query.toLowerCase())
    
    return {
      success: fallbackData.length > 0,
      data: fallbackData,
      error: fallbackData.length === 0 ? 'No information found' : undefined
    }
  }
}

function getMockBootcampData(query: string): any[] {
  const mockDatabase = {
    'học phí': [
      {
        title: 'Học phí Bootcamp',
        content: 'Học phí bootcamp lập trình tại Australia là AUD $15,000 cho khóa học 16 tuần. Có thể trả góp 3 kỳ, mỗi kỳ AUD $5,000. Sinh viên quốc tế có thể được hỗ trợ tài chính nếu đáp ứng điều kiện.'
      }
    ],
    'tuition': [
      {
        title: 'Bootcamp Tuition',
        content: 'The bootcamp tuition in Australia is AUD $15,000 for a 16-week program. Payment can be made in 3 installments of AUD $5,000 each. Financial aid is available for qualified international students.'
      }
    ],
    'thời gian': [
      {
        title: 'Thời gian học',
        content: 'Bootcamp kéo dài 16 tuần (4 tháng), học toàn thời gian từ thứ 2 đến thứ 6, mỗi ngày 8 tiếng theo múi giờ Australia (AEST). Có lịch học part-time 6 tháng cho người đi làm.'
      }
    ],
    'duration': [
      {
        title: 'Program Duration',
        content: 'The bootcamp lasts 16 weeks (4 months), full-time Monday to Friday, 8 hours per day in Australian Eastern Standard Time (AEST). Part-time schedule of 6 months is available for working professionals.'
      }
    ],
    'curriculum': [
      {
        title: 'Chương trình học',
        content: 'Chương trình bao gồm: HTML/CSS, JavaScript, React, Node.js, MongoDB, Git, Deployment. Có dự án thực tế với công ty Australia và portfolio development theo tiêu chuẩn ngành.'
      }
    ],
    'job': [
      {
        title: 'Cơ hội việc làm',
        content: 'Tỷ lệ có việc làm sau tốt nghiệp là 85% trong vòng 6 tháng tại Australia. Mức lương trung bình AUD $60,000-80,000 cho junior developer. Có hỗ trợ tìm việc và career coaching.'
      }
    ]
  }

  // Search for relevant information
  const results: any[] = []
  
  Object.entries(mockDatabase).forEach(([key, value]) => {
    if (query.includes(key)) {
      results.push(...value)
    }
  })

  // If no specific match, return general info
  if (results.length === 0) {
    results.push({
      title: 'General Information',
      content: 'This is a 16-week full-stack programming bootcamp located in Australia. For more details about tuition (AUD $15,000), curriculum, or job opportunities, please contact us.'
    })
  }

  return results
}
