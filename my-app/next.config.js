/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // async rewrites() {
  //   return [
  //     {
  //       source: "/",
  //       destination: "http://localhost:3000/",
  //     },
  //   ]
  // },
}

module.exports = nextConfig
