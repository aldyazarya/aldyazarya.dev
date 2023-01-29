const siteUrl = process.env.NEXT_SITE_URL || "https://aldyazarya.dev";

const toLowerCase = (val: any) => {
  return val.toLowerCase();
};

type Data = {
  data: any;
};

// item.attributes.slug

function generateSiteMapImage(posts: any) {
  return `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
          ${posts.data.map((item: any) => {
            return `
                  <url>
                      <loc>${`${siteUrl}/${item.attributes.slug}`}</loc>
                      <image:image>
                            <image:loc>${`${process.env.NEXT_API_DOMAIN}${item.attributes.banner.data.attributes.url}`}</image:loc>
                            <image:title>${`${item.attributes.banner.data.attributes.alternativeText}`}</image:title>
                            <image:caption>${`${item.attributes.banner.data.attributes.caption}`}</image:caption>
                      </image:image>
                  </url>
              `;
          })}
      </urlset>
      `;
}

function SiteMap() {}

export async function getServerSideProps({ res }: any) {
  const baseUri = `${process.env.NEXT_API_DOMAIN}/api/posts?populate=*&locale=all`;
  const token = process.env.NEXT_PUBLIC_BEARER;

  const request = await fetch(`${baseUri}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const posts: Data = await request.json();

  const sitemap = generateSiteMapImage(posts);

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;
