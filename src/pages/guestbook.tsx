import * as React from "react";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import axios, { AxiosError } from "axios";

import Accent from "@/components/Accent";
import Comment from "@/components/content/Comment";
import Layout from "@/components/layout/Layout";
import CustomLink from "@/components/links/CustomLink";
import Seo from "@/components/Seo";
import Button from "@/components/buttons/Button";

export default function GuestbookPage() {
  const { register, handleSubmit, reset } = useForm<{
    name: string;
    email: string;
    message: string;
  }>();
  const [status, setStatus] = React.useState("idle");
  const [errMsg, setErrMsg] = React.useState(
    "Sorry, something went wrong please try again later"
  );

  const onSubmit = async (data: {
    name: string;
    email: string;
    message: string;
  }) => {
    const token = process.env.NEXT_API_TOKEN_GUESTBOOKS;
    const baseUrl = process.env.NEXT_API_DOMAIN;

    setStatus("loading");

    const datas = {
      data,
    };

    console.log("data submit", datas);

    await fetch(`${baseUrl}/api/guestbooks`, {
      method: "post",
      body: JSON.stringify({ data: data }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        reset();
        setStatus("success");
      })
      .catch((error: Error | AxiosError) => {
        if (axios.isAxiosError(error)) {
          setStatus("error");
          setErrMsg(
            error.response?.data.message ?? "Something is wrong with the API."
          );
        } else {
          setStatus("error");
          setErrMsg("Something is wrong with the API.");
        }
      });
  };

  return (
    <Layout>
      <Seo
        templateTitle="Guestbook"
        description="Leave whatever you like to say—message, appreciation, suggestions."
      />
      <main>
        <section className="">
          <div className="layout py-20">
            <h1>
              <Accent>Guestbook</Accent>
            </h1>
            <p className="mt-2 text-gray-700 dark:text-gray-200">
              Leave whatever you like to say—message, appreciation, suggestions.
              If you got some questions, you can leave them on below{" "}
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-8 block">
              <div className=" ">
                <input
                  {...register("name")}
                  className={clsx(
                    "mb-4",
                    " w-1/2 rounded-md dark:bg-dark",
                    "border border-gray-300 dark:border-gray-600",
                    "text-sm md:text-base",
                    "focus:border-primary-300 focus:outline-none focus:ring-0 dark:focus:border-primary-300"
                  )}
                  type="text"
                  placeholder="Name"
                  required
                />
              </div>
              <div className="">
                <input
                  {...register("email")}
                  className={clsx(
                    "mb-4",
                    "w-1/2 rounded-md dark:bg-dark",
                    "border border-gray-300 dark:border-gray-600",
                    "text-sm md:text-base",
                    "focus:border-primary-300 focus:outline-none focus:ring-0 dark:focus:border-primary-300"
                  )}
                  type="email"
                  placeholder="Email"
                  required
                />
              </div>
              <div className="">
                <textarea
                  rows={5}
                  {...register("message")}
                  className={clsx(
                    "mb-4",
                    "w-1/2 rounded-md dark:bg-dark",
                    "border border-gray-300 dark:border-gray-600",
                    "text-sm md:text-base",
                    "focus:border-primary-300 focus:outline-none focus:ring-0 dark:focus:border-primary-300"
                  )}
                  placeholder="Message..."
                  required
                />
              </div>
              <Button
                type="submit"
                isLoading={status === "loading"}
                className=""
              >
                Submit
              </Button>
            </form>
            <p
              className={clsx(
                "mt-3 text-sm",
                status === "success"
                  ? "text-green-500"
                  : status === "subscribed"
                  ? "text-yellow-500"
                  : status === "error"
                  ? "text-red-500 dark:text-red-400"
                  : "text-gray-700 dark:text-gray-300"
              )}
            >
              {status === "success" ? (
                "Thanks, i will reach you as soon as possible"
              ) : status === "error" ? (
                <>{errMsg}</>
              ) : status === "loading" ? (
                "Loading..."
              ) : (
                ""
              )}
            </p>
          </div>
        </section>
      </main>
    </Layout>
  );
}
