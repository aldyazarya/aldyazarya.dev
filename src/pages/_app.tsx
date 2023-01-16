import axios from "axios";
import type { AppProps } from "next/app";
import Router from "next/router";
import nProgress from "nprogress";
import { ThemeProvider } from "next-themes";
import { SWRConfig } from "swr";

import 'react-tippy/dist/tippy.css';
import "@/styles/globals.css";
import "@/styles/dracula.css";

Router.events.on("routeChangeStart", nProgress.start);
Router.events.on("routeChangeError", nProgress.done);
Router.events.on("routeChangeComplete", nProgress.done);

 function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <SWRConfig
        value={{
          fetcher: (url) => axios.get(url).then((res) => res.data),
        }}
      >
        <Component {...pageProps} />
      </SWRConfig>
    </ThemeProvider>
  );
}

export default App