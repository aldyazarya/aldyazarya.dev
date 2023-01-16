import * as React from "react";

import sayHello from "@/lib/sayHello";

import Header from "./Header";
import Footer from "./Footer";

import { PreloadProvider } from "@/context/PreloadContext";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <PreloadProvider>
        <div id="skip-nav">{children}</div>
      </PreloadProvider>
      <Footer />
      
    </>
  );
}
