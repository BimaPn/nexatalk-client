/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3500",
        pathname: "/media/**",
      },
    ],
  },
}

module.exports = nextConfig
