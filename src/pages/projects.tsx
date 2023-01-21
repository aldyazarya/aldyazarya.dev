import clsx from "clsx";
import { InferGetServerSidePropsType, GetServerSideProps } from "next";
import * as React from "react";
import Image from "next/image";

import useLoaded from "@/hooks/useLoaded";

import Accent from "@/components/Accent";
import ProjectCard from "@/components/content/project/ProjectCard";
import Layout from "@/components/layout/Layout";
import Seo from "@/components/Seo";
import UnstyledLink from "@/components/links/UnstyledLink";
import TechIcons, { TechListType } from "@/components/TechIcons";

type Data = {
  data: any;
};

export default function Projects({
  dataProject,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const baseImageUrl = process.env.NEXT_API_DOMAIN;
  const isLoaded = useLoaded();
  const projects = dataProject.data;

  console.log("====================================");
  console.log("list project", projects);
  console.log("====================================");

  return (
    <>
      <Layout>
        <Seo />
        <main>
          <section className={clsx(isLoaded && "fade-in-start")}>
            <div className="layout py-12">
              <h1 className="text-3xl md:text-5xl" data-fade="0">
                <Accent>Projects</Accent>
              </h1>
              <p
                data-fade="1"
                className="mt-2 text-gray-600 dark:text-gray-300"
              >
                Showcase of my works.
              </p>

              <ul
                data-fade="2"
                className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
              >
                {projects.map((project: any) => (
                  <ProjectCard key={project.slug} project={project} />
                ))}

                <li
                  className={clsx(
                    "project-card rounded-md md:w-full",
                    "border dark:border-gray-600",
                    "scale-100 hover:scale-[1.02] active:scale-[0.97] motion-safe:transform-gpu",
                    "transition duration-100",
                    "motion-reduce:hover:scale-100",
                    "animate-shadow"
                  )}
                >
                  <UnstyledLink
                    href={sideProject.pathname}
                    className="flex h-full flex-col items-start rounded-md p-4 focus:outline-none focus-visible:ring focus-visible:ring-primary-300"
                  >
                    <h4>{sideProject.title}</h4>
                    <p className="mb-auto text-sm text-gray-700 dark:text-gray-300">
                      {sideProject.description}
                    </p>
                    <div className="my-4">
                      <TechIcons
                        techs={
                          sideProject.stack.split(",") as Array<TechListType>
                        }
                      />
                    </div>
                    <Image
                      className=" rounded-md"
                      src={`${baseImageUrl}${sideProject.banner.url}`}
                      alt={sideProject.banner.alternativeText}
                      width={1200}
                      height={(1200 * 3) / 5}
                    />
                    <p className="animated-underline mt-2 inline-block font-medium">
                      See more →
                    </p>
                  </UnstyledLink>
                </li>
              </ul>
            </div>
          </section>
        </main>
      </Layout>
    </>
  );
}

const sideProject = {
  slug: "side-projects",
  pathname: "/coming-soon",
  title: "Side Projects",
  description: "Simple projects that i built.",
  stack: "nextjs,tailwindcss",
  banner: {
    alternativeText: "side-project",
    url: "/uploads/side_projects_22ebc65da6.png",
  },
};

export const getServerSideProps: GetServerSideProps<{
  dataProject: Data;
}> = async (context) => {
  const token = process.env.NEXT_API_TOKEN_GET_POSTS;
  const baseUrl = process.env.NEXT_API_DOMAIN;

  const responseSlug = await fetch(`${baseUrl}/api/projects?populate=*`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    method: "GET",
  });

  const dataProject: Data = await responseSlug.json();

  return {
    props: {
      dataProject,
    }, // will be passed to the page component as props
  };
};
