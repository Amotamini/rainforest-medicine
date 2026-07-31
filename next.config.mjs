/** @type {import('next').NextConfig} */
const nextConfig = {
  // Pin the tracing root — other lockfiles exist higher up the filesystem.
  outputFileTracingRoot: import.meta.dirname,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    optimizePackageImports: ['framer-motion'],
  },
};

export default nextConfig;
