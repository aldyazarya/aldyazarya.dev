import * as React from "react";
import Head from "next/head";
import Image from "next/image";
import clsx from "clsx";
import { useRouter } from "next/router";

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
// import TCTC from "@/components/TC";

export default function Home() {
  const isLoaded = useLoaded();

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
                <CustomLink href="/coming-soon">guestbook</CustomLink>!
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
                  <ButtonLink href="/coming-soon">Read the blog</ButtonLink>
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
                " transform-gpu translate-y-[30%] ",
                "w-[calc(100%-3rem)] md:w-[400px] 2xl:w-[600px]",
                "z-[-1] opacity-100 dark:opacity-100"
              )}
            >
              <Image src={svgBackground} alt="svg-background" />
            </div>
          </section>
        </main>
      </Layout>
    </>
  );
}
