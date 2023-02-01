import { InferGetServerSidePropsType, GetServerSideProps } from "next";
import clsx from "clsx";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/router";

import useLoaded from "@/hooks/useLoaded";

import Accent from "@/components/Accent";
import Layout from "@/components/layout/Layout";
import CustomLink from "@/components/links/CustomLink";
import Seo from "@/components/Seo";
import StyledInput from "@/components/form/StyledInput";
import Button from "@/components/buttons/Button";
import BlogCard from "@/components/content/blog/BlogCard";
import ContentPlaceholder from "@/components/content/ContentPlaceholder";

type Post = {
  title: string;
  description: string;
  content: string;
  slug: string;
  banner: string;
  locale: string;
  updatedAt: Date;
};

type Data = {
  data: [];
  meta: [];
};

export default function Blog() {
  const [postsData, setPostsData] = useState<Data[]>([]);
  const [isEnglish, setIsEnglish] = useState(true);

  const isLoaded = useLoaded();
  const router = useRouter();
  const listPost: any = postsData;

  console.log("====================================");
  console.log("post Data", listPost.data);
  console.log("====================================");

  // const getPostsData = () => {
  //   const token = process.env.NEXT_API_TOKEN_GET_POSTS;
  //   const baseUrl = process.env.NEXT_API_DOMAIN;

  //   const response = fetch(
  //     `${baseUrl}/api/posts?populate=*&locale=${
  //       isEnglish === true ? "en" : "id"
  //     }`,
  //     {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //       method: "GET",
  //     }
  //   ).then(async (res) => {
  //     const data = await res.json();
  //     await setPostsData(data);
  //   });
  // };

  const getPostsData = useCallback(() => {
    const token = process.env.NEXT_API_TOKEN_GET_POSTS;
    const baseUrl = process.env.NEXT_API_DOMAIN;
    const response = fetch(
      `${baseUrl}/api/posts?populate=*&locale=${
        isEnglish === true ? "en" : "id"
      }`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        method: "GET",
      }
    ).then(async (res) => {
      const data = await res.json();
      await setPostsData(data);
    });
  }, [isEnglish]);

  useEffect(() => {
    getPostsData();
  }, [getPostsData]);

  const InternationalizationRead = () => {
    if (isEnglish === true) {
      setIsEnglish(false);
    } else {
      setIsEnglish(true);
    }
    // router.reload()
  };

  return (
    <>
      <Layout>
        <Seo
          templateTitle={"Blog"}
          description={
            "Conceptual Model is an abstract representation of the information architecture, user flows, and visual design of the application, and serves as ablueprint for development."
          }
          keywords={
            "blog, aldy azarya blog, aldyazarya blog, aldy blog, azarya blog"
          }
        />
        <main>
          <section className={clsx(isLoaded && "fade-in-start")}>
            <div className="layout py-12">
              <h1 className="text-3xl md:text-5xl" data-fade="0">
                <Accent>Blog </Accent>
              </h1>
              <p
                className="mt-2 text-gray-600 dark:text-gray-300"
                data-fade="1"
              >
                Thoughts, conceptual models, tutorials about front-end
                development, and everything about digital things.
              </p>
              <StyledInput
                data-fade="2"
                className="mt-4"
                placeholder="Search..."
                // onChange={handleSearch}
                // value={search}
                type="text"
              />
              <div
                className="relative z-10 mt-6 flex flex-col items-end gap-4 text-gray-600 dark:text-gray-300 md:flex-row md:items-center md:justify-between"
                data-fade="4"
              >
                <Button
                  onClick={InternationalizationRead}
                  className="text-sm !font-medium"
                >
                  Read in {isEnglish === true ? "English" : "Bahasa Indonesia"}
                </Button>
              </div>
              <ul
                className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
                data-fade="5"
              >
                {listPost?.data?.length > 0 ? (
                  listPost?.data?.map((item: any, i: any) => {
                    return <BlogCard key={i} post={item} />;
                  })
                ) : (
                  <ContentPlaceholder />
                )}
              </ul>
            </div>
          </section>
        </main>
      </Layout>
    </>
  );
}

// export default function Blog({
//   postsData,
// }: InferGetServerSidePropsType<typeof getServerSideProps>) {
//   console.log("====================================");
//   console.log("post data", postsData);
//   console.log("====================================");

//   return (
//     <>
//       <h1>Blog Page</h1>
//     </>
//   );
// }

// export const getServerSideProps: GetServerSideProps = async () => {
//   //   const token = process.env.NEXT_API_TOKEN_GET_POSTS;
//   const token =
//     "f60e2b88c9cc6bf13617e0b2c72840c5f71df58c60c7bc42e12af43824fd5e65e271519a3495000b37ee495abea5677f0b34d2e22d228dad8ec5466286173910d9b6e6cbb2da2ec14b7d458b0f2a7bae6d23f6b9eee5561764ae113e3ca50e160673c70fbed5b20a7ff20a5ea25622346c21a3370309eaa39f80e78c307f6280";
//   //   const baseUrl = process.env.NEXT_API_DOMAIN;
//   const baseUrl = "http://localhost:1337/";

//   const response = await fetch(`http://localhost:1337/api/posts?populate=*`, {
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//     method: "GET",
//   });

//   const postsData = await response.json();

//   return {
//     props: {
//       postsData,
//     },
//   };
// };
