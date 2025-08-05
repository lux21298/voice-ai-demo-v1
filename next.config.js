/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    MCP_SERVER_URL: process.env.MCP_SERVER_URL || 'http://localhost:3000/api/mcp'
  }
}

module.exports = nextConfig
