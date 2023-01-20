import clsx from "clsx";
import { format } from "date-fns";
import * as React from "react";
import { HiOutlineClock, HiOutlineEye } from "react-icons/hi";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";

import Accent from "@/components/Accent";
import Tag from "@/components/content/Tag";
import CloudinaryImg from "@/components/images/CloudinaryImg";
import UnstyledLink from "@/components/links/UnstyledLink";

type post = {
  attributes: any;
};

type BlogCardProps = {
  post: post;
} & React.ComponentPropsWithoutRef<"li">;

export default function BlogCard({ post, className, onClick }: BlogCardProps) {
  const baseImageUrl = process.env.NEXT_API_DOMAIN;

  return (
    <li
      className={clsx(
        "w-full rounded-md border border-gray-300 bg-white dark:border-gray-600 dark:bg-dark",
        "scale-100 hover:scale-[1.02] active:scale-[0.97] motion-safe:transform-gpu",
        "transition duration-100",
        "motion-reduce:hover:scale-100",
        "animate-shadow",
        className
      )}
      onClick={onClick}
    >
      <UnstyledLink
        className="block h-full rounded-md focus:outline-none focus-visible:ring focus-visible:ring-primary-300"
        href={`/blog/${post.attributes.slug}`}
      >
        <div className="relative">
          <Image
            src={`${baseImageUrl}${post.attributes.banner.data.attributes.formats.thumbnail.url}`}
            alt={post.attributes.banner.data.attributes.alternativeText}
            width={1200}
            height={(1200 * 3) / 5}
          />
          <div
            className={clsx(
              "absolute bottom-2 w-full px-4 py-2",
              "mt-2 flex flex-wrap justify-end gap-y-1 gap-x-2 text-sm text-black dark:text-gray-100"
            )}
          >
            {/* create page tag by tag selected */}
            {post.attributes.tags.map((tag: string) => (
              <Tag
                tabIndex={-1}
                className="bg-opacity-80 dark:!bg-opacity-60"
                key={tag}
              >
                {tag}
              </Tag>
            ))}
          </div>
        </div>
        <div className="p-4">
          <h4 className="text-gray-800 dark:text-gray-100">
            {post.attributes.title}
          </h4>
          <div className="mt-2 flex items-center justify-start gap-2 text-sm font-medium text-gray-600 dark:text-gray-300">
            <div className="flex items-center gap-1">
              <HiOutlineClock className="inline-block text-base" />
              <Accent>{post.attributes.readingTime} min read</Accent>
            </div>
          </div>
          <p className="mt-4 mb-2 text-sm text-gray-600 dark:text-gray-300">
            <span className="font-bold text-gray-800 dark:text-gray-100">
              {format(new Date(post.attributes.updatedAt), "MMMM dd, yyyy")}
            </span>
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            {post.attributes.description}
          </p>
        </div>
      </UnstyledLink>
    </li>
  );
}
