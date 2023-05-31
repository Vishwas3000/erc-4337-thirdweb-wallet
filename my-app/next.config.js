/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: "/user/create",
        destination: "http://localhost:3000/user/create",
      },
    ]
  },
}

module.exports = nextConfig
