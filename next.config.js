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
      "aldyazarya-strapi.herokuapp.com",

      // Spotify Album
      "i.scdn.co",
    ],
  },
  env: {
    NEXT_API_DOMAIN: "https://aldyazarya-strapi.herokuapp.com",
    NEXT_API_TOKEN_GET_POSTS:
      "e91be604f2540d13edd3cfe2b56642410ad0bd0467b1307de9709aa61856815cef724fae6e56230da05d2a656e8d32604ae3980feae3bf8da53fdc13c64766e3abad2bba68f40516d95c2b41a905dd03034dc85f8520a9f94030b30c5e1c73bfb529b81ca5c72393d63643fd0ec11511c2961ef445cc5e4813e7d4cf9930f5c6",
  },
};
