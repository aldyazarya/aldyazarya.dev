import * as React from "react";
import Head from "next/head";
import Image from "next/image";
import clsx from "clsx";
import { useRouter } from "next/router";
import { InView } from "react-intersection-observer";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

import useLoaded from "@/hooks/useLoaded";

import { IoArrowDownOutline } from "react-icons/io5";
import { IoNewspaperSharp } from "react-icons/io5";
import { SiGithub, SiTwitter } from "react-icons/si";
import svgBackground from "public/images/svg-background.svg";

import UnstyledLink from "@/components/links/UnstyledLink";
import ButtonLink from "@/components/links/ButtonLink";
import CustomLink from "@/components/links/CustomLink";
import Accent from "@/components/Accent";
import Layout from "@/components/layout/Layout";
import Seo from "@/components/Seo";
import Tooltip from "@/components/Tooltip";
import BlogCard from "@/components/content/blog/BlogCard";
import ProjectCard from "@/components/content/project/ProjectCard";

type Data = {
  data: any;
};

export default function Home({
  dataIntroPost,
  dataLatestPost,
  dataLatestProject,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const isLoaded = useLoaded();

  console.log("====================================");
  console.log("article", dataIntroPost);
  console.log("other", dataLatestPost);
  console.log("project", dataLatestProject);
  console.log("====================================");

  const introPost = dataIntroPost.data;
  const latestPost = dataLatestPost.data;
  const latestProject = dataLatestProject.data;

  return (
    <>
      <Layout>
        <Seo />

        <main>
          <section
            className={clsx(
              "min-h-main -mt-20 mb-20 flex flex-col justify-center",
              isLoaded && "fade-in-start"
            )}
          >
            <article className="layout">
              <h2 className="text-2xl md:text-4xl 2xl:text-5xl" data-fade="1">
                Hi!
              </h2>
              <h1
                className="mt-1 text-3xl md:text-5xl 2xl:text-6xl"
                data-fade="2"
              >
                You can call me <Accent>Aldy</Accent>
              </h1>
              <p
                className={clsx(
                  "mt-4 max-w-4xl text-gray-700 dark:text-gray-200 md:mt-6",
                  "md:text-lg 2xl:text-xl"
                )}
                data-fade="3"
              >
                I work with react ecosystem, and write to sharing with <br />{" "}
                people how to create a high-level digital product through
                conceptual models.
              </p>
              <p
                className="mt-3 max-w-4xl leading-relaxed text-gray-700 dark:text-gray-200 md:mt-4 md:text-lg 2xl:text-xl"
                data-fade="4"
              >
                Don&apos;t forget to sign my{" "}
                <CustomLink href="/guestbook">guestbook</CustomLink>!
              </p>
              <div
                data-fade="5"
                className="mt-8 flex flex-wrap gap-4 md:!text-lg"
              >
                <div className="group relative">
                  <div
                    className={clsx(
                      "absolute -inset-0.5 animate-tilt rounded blur",
                      "bg-gradient-to-r from-primary-300 to-primary-400",
                      "dark:from-primary-200 dark:via-primary-300",
                      "opacity-75 transition duration-1000 group-hover:opacity-100 group-hover:duration-200"
                    )}
                  />
                  <ButtonLink href="/blog">Read the blog</ButtonLink>
                </div>
                <ButtonLink href="/about">Learn more about me</ButtonLink>
              </div>
              <div
                data-fade="6"
                className="mt-4 flex flex-wrap gap-4 gap-y-2 md:mt-8"
              >
                <UnstyledLink
                  href="/"
                  className={clsx(
                    "inline-flex items-center gap-1 text-sm font-medium md:text-base",
                    "text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white",
                    "focus:outline-none focus-visible:ring focus-visible:ring-primary-300",
                    "transition-colors"
                  )}
                >
                  <IoNewspaperSharp className="shrink-0" />
                  <span>Resume</span>
                </UnstyledLink>
                <UnstyledLink
                  href="https://twitter.com/aldyazarya"
                  className={clsx(
                    "inline-flex items-center gap-1 text-sm font-medium md:text-base",
                    "group text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white",
                    "focus:outline-none focus-visible:ring focus-visible:ring-primary-300",
                    "transition-colors"
                  )}
                >
                  <SiTwitter className="shrink-0 transition-colors group-hover:text-[#1da1f2]" />
                  <span>@aldyazarya</span>
                </UnstyledLink>
                <UnstyledLink
                  href="https://github.com/aldyazarya"
                  className={clsx(
                    "inline-flex items-center gap-1 text-sm font-medium md:text-base",
                    "text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white",
                    "focus:outline-none focus-visible:ring focus-visible:ring-primary-300",
                    "transition-colors"
                  )}
                >
                  <SiGithub className="shrink-0" />
                  <span>aldyazarya</span>
                </UnstyledLink>
              </div>
            </article>
            <UnstyledLink
              href="#intro"
              className={clsx(
                "absolute bottom-2 left-1/2 -translate-x-1/2 md:bottom-10",
                "cursor-pointer rounded-md transition-colors",
                "hover:text-primary-300 focus-visible:text-primary-300"
              )}
            >
              <IoArrowDownOutline className="h-8 w-8 animate-bounce md:h-10 md:w-10" />
            </UnstyledLink>
            <div
              className={clsx(
                "absolute bottom-0 right-6",
                " transform-gpu translate-y-[0%] ",
                "w-[calc(100%-3rem)] md:w-[500px] 2xl:w-[600px]",
                "z-[-1] opacity-100 dark:opacity-100"
              )}
            >
              <Image src={svgBackground} alt="svg-background" />
            </div>
          </section>

          <InView triggerOnce rootMargin="-40% 0px">
            {({ ref, inView }) => (
              <section
                ref={ref}
                id="intro"
                className={clsx("py-20", inView && "fade-in-start")}
              >
                <article
                  className={clsx(
                    "layout flex flex-col-reverse items-center md:flex-row md:justify-start",
                    "md:gap-4"
                  )}
                  data-fade="0"
                >
                  <div className="mt-8 h-full w-full md:mt-0">
                    <h2 className="text-4xl md:text-6xl">
                      <Accent className="inline decoration-clone leading-snug dark:leading-none">
                        Lorem ipsum dolor sit
                      </Accent>
                    </h2>
                    <p className="mt-4 text-base text-gray-600 dark:text-gray-300 md:text-lg">
                      <Tooltip
                        withUnderline
                        content={
                          <>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua.
                          </>
                        }
                      >
                        Lorem ipsum
                      </Tooltip>{" "}
                      dolor sit amet, consectetur adipiscing elit,{" "}
                      <strong className="text-gray-700 dark:text-gray-200">
                        sed do
                      </strong>{" "}
                      eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat
                    </p>
                  </div>
                  <div className="h-full w-full">
                    <ul className="relative h-full">
                      <BlogCard
                        className={clsx(
                          "absolute max-w-[350px] transform-gpu",
                          "top-1/2 translate-y-[-55%] md:translate-y-[-50%] lg:translate-y-[-60%]",
                          "left-1/2 -translate-x-1/2 md:translate-x-[-50%] lg:translate-x-[-30%]",
                          "rotate-3 md:rotate-6 lg:rotate-12",
                          "pointer-events-none md:pointer-events-auto"
                        )}
                        post={introPost[1]}
                      />
                      <BlogCard
                        className="mx-auto max-w-[350px]"
                        post={introPost[0]}
                      />
                    </ul>
                  </div>
                </article>
              </section>
            )}
          </InView>

          <InView triggerOnce rootMargin="-40% 0px">
            {({ ref, inView }) => (
              <section
                ref={ref}
                className={clsx("py-20", inView && "fade-in-start")}
              >
                <article className="layout" data-fade="0">
                  <h2 className="text-2xl md:text-4xl" id="blog">
                    <Accent>Featured Posts</Accent>
                  </h2>
                  <ul className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {latestPost.slice(0, 6).map((post: any, i: any) => (
                      <BlogCard
                        key={post.slug}
                        post={post}
                        className={clsx(i > 2 && "hidden sm:block")}
                      />
                    ))}
                  </ul>
                  <ButtonLink className="mt-4" href="/blog">
                    See more post
                  </ButtonLink>
                </article>
              </section>
            )}
          </InView>

          <InView triggerOnce rootMargin="-40% 0px">
            {({ ref, inView }) => (
              <section
                ref={ref}
                className={clsx("py-20", inView && "fade-in-start")}
              >
                <article className="layout" data-fade="0">
                  <h2 className="text-2xl md:text-4xl" id="projects">
                    <Accent>Featured Projects</Accent>
                  </h2>
                  <p className="mt-2 text-gray-600 dark:text-gray-300">
                    Some projects that I&apos;m proud of
                  </p>
                  <ul className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {latestProject.slice(0, 4).map((project: any, i: any) => (
                      <ProjectCard
                        key={project.slug}
                        project={project}
                        className={clsx(i > 2 && "hidden sm:block")}
                      />
                    ))}
                  </ul>
                  <ButtonLink className="mt-4" href="/projects">
                    See more project
                  </ButtonLink>
                </article>
              </section>
            )}
          </InView>
        </main>
      </Layout>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<{
  dataIntroPost: Data;
  dataLatestPost: Data;
  dataLatestProject: Data;
}> = async (context) => {
  const token = process.env.NEXT_API_TOKEN_GET_POSTS;
  const baseUrl = process.env.NEXT_API_DOMAIN;

  const responseIntro = await fetch(`${baseUrl}/api/posts?populate=*`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    method: "GET",
  });

  const responseLatest = await fetch(
    `${baseUrl}/api/posts?populate=*&sort=updatedAt`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "GET",
    }
  );

  const responseLatestProejct = await fetch(
    `${baseUrl}/api/projects?populate=*&sort=updatedAt`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "GET",
    }
  );

  const dataIntroPost: Data = await responseIntro.json();
  const dataLatestPost: Data = await responseLatest.json();
  const dataLatestProject: Data = await responseLatestProejct.json();

  return {
    props: {
      dataIntroPost,
      dataLatestPost,
      dataLatestProject,
    },
  };
};
