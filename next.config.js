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
    NEXT_SITE_URL: "https://aldyazarya.dev",
    NEXT_API_TOKEN_GUESTBOOKS:
      "a4b3dd15774efc2ff3725b5718d2f4316c1553a0a6ca4848f7f40f9b6b16feda550f0613b331bf2ed5f377ba16d995e35d50d8c34fc21db5ad7baf61c6f279397c5cfb12747e794ff288be866e4dc70742b39a8d41c0fdbec5657ae6c373a5e098d8c25fa95a9e4b7bed6e07d2208487daf732f6741130acd3e7b18c7b69aae5",
    NEXT_API_TOKEN_GET_POSTS:
      "e91be604f2540d13edd3cfe2b56642410ad0bd0467b1307de9709aa61856815cef724fae6e56230da05d2a656e8d32604ae3980feae3bf8da53fdc13c64766e3abad2bba68f40516d95c2b41a905dd03034dc85f8520a9f94030b30c5e1c73bfb529b81ca5c72393d63643fd0ec11511c2961ef445cc5e4813e7d4cf9930f5c6",
  },
};
