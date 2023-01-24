import { GetServerSideProps } from "next";
import { getServerSideSitemap, ISitemapField } from "next-sitemap";

type Data = {
  data: any;
};

export const GetPosts = async () => {
  const baseUri = `${process.env.NEXT_API_DOMAIN}/api/posts?populate=*&locale=all`;
  const token = process.env.NEXT_API_TOKEN_GET_POSTS;

  const data = await fetch(`${baseUri}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const res = await data.json();
  return res;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const baseUri = `${process.env.NEXT_API_DOMAIN}/api/posts?populate=*&locale=all`;
  const token = process.env.NEXT_API_TOKEN_GET_POSTS;

  const toLowerCase = (val: String) => {
    return val.toLowerCase();
  };

  const response = await fetch(`${baseUri}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const posts: Data = await response.json();

  //   item.attributes.slug

  // posts.

  const siteUrl = process.env.NEXT_SITE_URL || "https://aldyazarya.vercel.app";

  const fields: ISitemapField[] = posts.data.map((item: any) => ({
    loc: `${siteUrl}/blog/${item.attributes.slug}`,
    lastmod: new Date().toISOString(),
  }));

  return getServerSideSitemap(ctx, fields);
};

export default function Site() {}
