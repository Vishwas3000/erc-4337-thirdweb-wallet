/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
  },
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
