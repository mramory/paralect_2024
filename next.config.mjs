/** @type {import('next').NextConfig} */

const nextConfig = {
  sassOptions: {
    includePaths: ["src/app/scss"],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://api.themoviedb.org/3/:path*?api_key=dffcc4daf8974ea794bc12880496b722',
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: process.env.NEXT_PUBLIC_IMAGES_HOSTNAME,
      },
    ],
  },
};

export default nextConfig;
