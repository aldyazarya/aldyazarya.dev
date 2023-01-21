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

import { SiGithub } from "react-icons/si";
import { HiLink, HiOutlineEye, HiPlay, HiUser } from "react-icons/hi";

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

export default function SingleProjectPage({
  dataSlug,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";

  const baseImageUrl = process.env.NEXT_API_DOMAIN;

  const project = dataSlug.data.attributes;

  console.log("====================================");
  console.log("project", project);
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
  }, [project.slug]);

  return (
    <>
      <Layout>
        <Seo
          templateTitle={project.title}
          description={project.description}
          isBlog
          banner={`${baseImageUrl}${project.banner.data.attributes.url}`}
          date={new Date(project.publishedAt).toISOString()}
        />
        <main>
          <ReloadDevtool />
          <section className="">
            <div className="layout">
              <Image
                src={`${baseImageUrl}${project.banner.data.attributes.url}`}
                alt={project.banner.data.attributes.alternativeText}
                width={1200}
                height={(1200 * 3) / 5}
              />
              <h1 className="mt-4">{project.title}</h1>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                {project.description}
              </p>

              <div className="mt-2 flex flex-wrap items-center justify-start gap-3 text-sm font-medium text-gray-600 dark:text-gray-300">
                <div className="inline-flex items-center gap-2">
                  <HiPlay className="text-xl text-gray-800 dark:text-white" />
                  <CustomLink href={project.demoVideo} className="mt-1">
                    Demo Video
                  </CustomLink>
                </div>
                {project.demoVideo && project.url && " - "}
                {project.url && (
                  <div className="inline-flex items-center gap-2">
                    <HiLink className="text-lg text-gray-800 dark:text-white" />
                    <CustomLink href={project.url} className="mt-1">
                      Open Live Site
                    </CustomLink>
                  </div>
                )}
              </div>

              {project.totalMember && (
                <p className="mt-2 flex items-center justify-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                  <HiUser className="text-lg text-gray-800 dark:text-white" />{" "}
                  Team of {project.totalMember}
                </p>
              )}

              <hr className="dark:border-gray-600 mt-4" />

              <section className="lg:grid lg:grid-cols-[auto,250px] lg:gap-8">
                <article className="mdx prose text-justify mt-4 w-full transition-colors dark:prose-invert">
                  <ReactMarkdown
                    children={project.content}
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
                    <TableOfContents
                      toc={toc}
                      minLevel={minLevel}
                      activeSection={activeSection}
                    />
                  </div>
                </aside>
              </section>
              <div className="mt-8  items-start gap-4 md:flex-row-reverse md:justify-start">
            <CustomLink href="/projects">← Back to projects</CustomLink>
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
}> = async (context) => {
  const { slug } = context.query;
  const token = process.env.NEXT_API_TOKEN_GET_POSTS;
  const baseUrl = process.env.NEXT_API_DOMAIN;

  const responseSlug = await fetch(
    `${baseUrl}/api/projects/${slug}?populate=*`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "GET",
    }
  );

  const dataSlug: Data = await responseSlug.json();

  return {
    props: {
      dataSlug,
    }, // will be passed to the page component as props
  };
};
