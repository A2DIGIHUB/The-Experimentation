/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Add Vercel Blob to allowed domains for images
  images: {
    domains: ['images.unsplash.com', 'public.blob.vercel-storage.com'],
  },
  // Exclude test files from the production build
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'].filter(ext => !ext.includes('test')),
  // Exclude test files from compilation
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      Object.assign(config.resolve.alias, {
        // These packages should be excluded from the client bundle
        '@testing-library/react': false,
        '@testing-library/jest-dom': false,
        'jest-environment-jsdom': false,
      });
    }
    return config;
  },
}

module.exports = nextConfig
