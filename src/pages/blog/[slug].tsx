/* eslint-disable react/no-children-prop */
import * as React from "react";
import { useRouter } from "next/router";
import clsx from "clsx";
import { format } from "date-fns";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { HeadingProps } from "react-markdown/lib/ast-to-react";

import useScrollSpy from "@/hooks/useScrollspy";

import { HiOutlineClock, HiOutlineEye } from "react-icons/hi";

import TableOfContents, {
  HeadingScrollSpy,
} from "@/components/content/TableOfContents";
import Layout from "@/components/layout/Layout";
import Seo from "@/components/Seo";
import Accent from "@/components/Accent";
import ReloadDevtool from "@/components/content/ReloadDevtool";
import ShareTweetButton from "@/components/links/ShareTweetButton";
import Comment from "@/components/content/Comment";
import BlogCard from "@/components/content/blog/BlogCard";
import CustomLink from "@/components/links/CustomLink";

type Data = {
  data: any;
};

type Article = {
  attributes: any;
};

export default function SingleBlogPage({
  dataSlug,
  dataOtherPost,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { asPath } = useRouter();
  const router = useRouter();

  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";

  const urlSite = `${origin}`;

  const article = dataSlug.data.attributes;
  const otherPost = dataOtherPost.data;
  const baseImageUrl = process.env.NEXT_API_DOMAIN;

  console.log("====================================");
  console.log("article", article);
  console.log("other", otherPost);
  console.log("url", urlSite);
  console.log("====================================");

  //#region  //*=========== Scrollspy ===========
  const activeSection = useScrollSpy();

  const tocType: {
    level: number;
    id: string;
    text: string;
  }[] = [];

  const addToTOC = ({
    children,
    ...props
  }: React.PropsWithChildren<HeadingProps>) => {
    const level = Number(props.node.tagName.match(/h(\d)/)?.slice(1));
    if (level && children && typeof children[0] === "string") {
      const id = children[0].toLowerCase().replace(/[^a-z0-9]+/g, "-");
      tocType.push({
        level,
        id,
        text: children[0],
      });
      return React.createElement(props.node.tagName, { id }, children);
    } else {
      return React.createElement(props.node.tagName, props, children);
    }
  };

  const [toc, setToc] = React.useState<HeadingScrollSpy>(tocType);
  const minLevel =
    toc?.reduce((min, item) => (item.level < min ? item.level : min), 10) ?? 0;

  React.useEffect(() => {
    const headings = document.querySelectorAll(".mdx h1, .mdx h2, .mdx h3");

    const headingArr: HeadingScrollSpy = [];
    headings.forEach((heading) => {
      const id = heading.id;
      const level = +heading.tagName.replace("H", "");
      const text = heading.textContent + "";

      headingArr.push({ id, level, text });
    });

    setToc(headingArr);
  }, [article.slug]);

  return (
    <>
      <Layout>
        <Seo
          templateTitle={article.title}
          description={article.description}
          isBlog
          banner={`${baseImageUrl}${article.banner.data.attributes.url}`}
          date={new Date(article.publishedAt).toISOString()}
        />
        <main>
          <ReloadDevtool />
          <section className="">
            <div className="layout">
              <div className="pb-4 dark:border-gray-600">
                <Image
                  src={`${baseImageUrl}${article.banner.data.attributes.url}`}
                  alt={article.banner.data.attributes.alternativeText}
                  width={1200}
                  height={(1200 * 2) / 5}
                />

                <h1 className="mt-4">{article.title}</h1>

                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                  {article.updatedAt
                    ? `                  Written on${" "}
                        ${format(
                          new Date(article.updatedAt),
                          "MMMM dd, yyyy"
                        )} by${" "}
                        ${article.author}.`
                    : `                  Written on${" "}
                        ${format(
                          new Date(article.publishedAt),
                          "MMMM dd, yyyy"
                        )} by${" "}
                        ${article.author}.`}
                </p>
                <div className="mt-6 flex items-center justify-start gap-2 text-sm font-medium text-gray-600 dark:text-gray-300">
                  <div className="flex items-center gap-1">
                    <HiOutlineClock className="inline-block text-base" />
                    <Accent>{article.readingTime} min read</Accent>
                  </div>
                </div>

                <hr className="dark:border-gray-600 mt-4" />

                <section className="lg:grid lg:grid-cols-[auto,250px] lg:gap-8">
                  <article className="mdx prose text-justify mt-4 w-full transition-colors dark:prose-invert">
                    <ReactMarkdown
                      children={article.content}
                      components={{
                        h1: addToTOC,
                        h2: addToTOC,
                        h3: addToTOC,
                        h4: addToTOC,
                        h5: addToTOC,
                        h6: addToTOC,
                      }}
                    />
                  </article>
                  <aside className="py-4">
                    <div className="sticky top-36">
                      {/* <TOC /> */}
                      <TableOfContents
                        toc={toc}
                        minLevel={minLevel}
                        activeSection={activeSection}
                      />
                    </div>
                  </aside>
                </section>

                <ShareTweetButton
                  className="mt-12"
                  url={`${urlSite}/blog/${article.slug}`}
                  title={article.title}
                />

                {/* <figure className="mt-12">
                  <Comment key={article.slug} />
                </figure> */}

                {otherPost.length > 0 && (
                  <div className="mt-20">
                    <h2>
                      <Accent>Other posts that you might like</Accent>
                    </h2>
                    <ul className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                      {otherPost.map((post: any, i: any) => {
                        return (
                          <BlogCard
                            key={post.slug}
                            post={post}
                            className={clsx({ "hidden xl:block": i === 2 })}
                          />
                        );
                      })}
                    </ul>
                  </div>
                )}

                <div className="mt-8  items-start gap-4 md:flex-row-reverse md:justify-start">
                  <CustomLink href="/blog">← Back to blog</CustomLink>
                </div>
              </div>
            </div>
          </section>
        </main>
      </Layout>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<{
  dataSlug: Data;
  dataOtherPost: Data;
}> = async (context) => {
  const { slug } = context.query;
  const token = process.env.NEXT_API_TOKEN_GET_POSTS;
  const baseUrl = process.env.NEXT_API_DOMAIN;

  const responseSlug = await fetch(`${baseUrl}/api/posts/${slug}?populate=*`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    method: "GET",
  });

  const responseOtherPost = await fetch(
    `${baseUrl}/api/posts?populate=*&sort=updatedAt`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "GET",
    }
  );

  const dataSlug: Data = await responseSlug.json();
  const dataOtherPost: Data = await responseOtherPost.json();

  return {
    props: {
      dataSlug,
      dataOtherPost,
    }, // will be passed to the page component as props
  };
};
