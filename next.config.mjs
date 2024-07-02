/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === "production";
const nextConfig = {
  basePath: isProd ? process.env.NEXT_PUBLIC_BASE_PATH : "",
  images: {
    remotePatterns: [
      {
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
