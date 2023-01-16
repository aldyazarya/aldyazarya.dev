import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";

import { useRouter } from "next/router";

import Layout from "@/components/layout/Layout";
import Seo from "@/components/Seo";

export default function Home() {
  return (
    <>
      <Layout>
        <Seo />

        <main></main>
      </Layout>
    </>
  );
}
