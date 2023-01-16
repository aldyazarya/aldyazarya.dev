/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = {
  nextConfig,
  eslint: {
    dirs: ["src"],
  },
  images: {
    domains: [
      "res.cloudinary.com",

      // Spotify Album
      "i.scdn.co",
    ],
  },
};
