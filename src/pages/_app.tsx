import axios from "axios";
import type { AppProps } from "next/app";
import Router from "next/router";
import nProgress from "nprogress";
import { ThemeProvider } from "next-themes";
import { SWRConfig } from "swr";

import Script from "next/script";

import TagManager from "react-gtm-module";
import { useEffect } from "react";

import "react-tippy/dist/tippy.css";
import "@/styles/globals.css";
import "@/styles/dracula.css";

Router.events.on("routeChangeStart", nProgress.start);
Router.events.on("routeChangeError", nProgress.done);
Router.events.on("routeChangeComplete", nProgress.done);

function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    TagManager.initialize({ gtmId: "GTM-PBG5TX4" });
  }, []);

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <SWRConfig
        value={{
          fetcher: (url) => axios.get(url).then((res) => res.data),
        }}
      >
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-9R45TJTLYG"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-9R45TJTLYG');
        `}
        </Script>
        <Component {...pageProps} />
      </SWRConfig>
    </ThemeProvider>
  );
}

export default App;
