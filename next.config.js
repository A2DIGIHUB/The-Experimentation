/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'public.blob.vercel-storage.com'],
  },
  // Exclude test files from the production build
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'].filter(ext => !ext.includes('test')),
}

module.exports = nextConfig
