/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    MCP_SERVER_URL: process.env.MCP_SERVER_URL || 'http://localhost:3000/api/mcp'
  },
  webpack: (config, { isServer }) => {
    // Fix for react-media-recorder on server-side
    if (isServer) {
      config.externals.push({
        'react-media-recorder': 'react-media-recorder'
      })
    }
    return config
  },
  // Optimize for Vercel deployment
  experimental: {
    serverComponentsExternalPackages: ['react-media-recorder']
  }
}

module.exports = nextConfig
