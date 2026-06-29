/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/server/:path*",
        destination: `${process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000"}/:path*`,
      },
    ];
  },
};
 
module.exports = nextConfig;