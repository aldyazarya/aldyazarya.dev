import clsx from "clsx";
import * as React from "react";
import Image from "next/image";

import UnstyledLink from "@/components/links/UnstyledLink";
import TechIcons, { TechListType } from '@/components/TechIcons';

type project = {
  attributes: any;
};

type ProjectCardProps = {
  project: project;
} & React.ComponentPropsWithoutRef<"li">;

export default function ProjectCard({ project, className }: ProjectCardProps) {
  const baseImageUrl = process.env.NEXT_API_DOMAIN;

  return (
    <li
      className={clsx(
        "project-card rounded-md md:w-full",
        "border dark:border-gray-600",
        "scale-100 hover:scale-[1.02] active:scale-[0.97] motion-safe:transform-gpu",
        "transition duration-100",
        "motion-reduce:hover:scale-100",
        "animate-shadow",
        className
      )}
    >
      <UnstyledLink
        href={`/project/${project.attributes.slug}`}
        className="flex h-full flex-col items-start rounded-md p-4 focus:outline-none focus-visible:ring focus-visible:ring-primary-300"
      >
        <h4>{project.attributes.title}</h4>
        <p className="mb-auto text-sm text-gray-700 dark:text-gray-300">
          {project.attributes.description}
        </p>
        <div className='my-4'>
          <TechIcons techs={project.attributes.stack.split(',') as Array<TechListType>} />
        </div>

        <Image
        className=" rounded-md"
          src={`${baseImageUrl}${project.attributes.banner.data.attributes.formats.medium.url}`}
          alt={project.attributes.banner.data.attributes.alternativeText}
          width={1200}
          height={(1200 * 3) / 5}
        />
        <p className="animated-underline mt-2 inline-block font-medium">
          See more →
        </p>
      </UnstyledLink>
    </li>
  );
}
