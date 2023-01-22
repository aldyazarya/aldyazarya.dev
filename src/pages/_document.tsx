import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@900,700,500,301,701,300,501,401,901,400&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className="bg-white transition-colors dark:bg-dark dark:text-white">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
