/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_SITE_URL || "https://aldyazarya.vercel.app/",
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    additionalSitemaps: [
      `${process.env.NEXT_SITE_URL}/server-sitemap.xml`,
      `${process.env.NEXT_SITE_URL}/sitemap.xml`,
      `${process.env.NEXT_SITE_URL}/images-sitemap.xml`,
    ],
  },

  // additionalSitemaps: [
  //   `${process.env.NEXT_SITE_URL}/server-sitemap.xml`,
  //   `${process.env.NEXT_SITE_URL}/sitemap.xml`,
  // ],
};
