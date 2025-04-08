const nextConfig = {
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
    reactRemoveProperties: process.env.NODE_ENV === 'production',
  },
  experimental: {
    swcFileReading: false,
    staleTimes: {
      dynamic: 60, // 1 minute cache for dynamic pages
      static: 3600 // 1 hour cache for static pages
    }
  },
  images: {
    minimumCacheTTL: 3600,
  }
}

module.exports = nextConfig