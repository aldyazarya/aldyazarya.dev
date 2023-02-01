import clsx from "clsx";
import { useTheme } from "next-themes";
import * as React from "react";

import useLoaded from "@/hooks/useLoaded";

import Accent from "@/components/Accent";
import ThemeButton from "@/components/buttons/ThemeButton";
import ColorSwatch from "@/components/ColorSwatch";
import Layout from "@/components/layout/Layout";
import Seo from "@/components/Seo";

export default function DesignPage() {
  const { theme } = useTheme();
  const isLoaded = useLoaded();

  return (
    <Layout>
            <Seo
        templateTitle={"Design"}
        description={
          "In this website I will be writing some blogs and showcase my projects. I believe that writing what I have learned is the best way to remember things, and I can share my knowledge along the way. So do contact me and I will be very happy to help!"
        }
        keywords={
          "design, aldy azarya design, aldyazarya design, aldy design, azarya design, design"
        }
      />

      <main>
        <section className={clsx(isLoaded && "fade-in-start")}>
          <div className="layout py-12">
            <h1 data-fade="0">
              <Accent>Website&apos;s Design</Accent>
            </h1>

            <p data-fade="1" className="mt-2 text-gray-600 dark:text-gray-300">
              aldyazarya.com color palette
            </p>

            <div
              data-fade="2"
              className={clsx(
                "mt-8 rounded p-4",
                "border-2 border-dashed border-gray-300 dark:border-gray-600 "
              )}
            >
              <div className="flex items-end justify-between">
                <h2 className="capitalize">{theme} Mode</h2>
                <ThemeButton />
              </div>

              <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                Font Family: Satoshi
              </p>

              <div className="grid sm:grid-cols-2">
                {THEME_COLORS.map((color) => (
                  <ColorSwatch key={color.title} {...color} />
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}

const THEME_COLORS = [
  {
    title: "White Background",
    subTitle: "#FFFFFF",
    colorClassName: "bg-white",
  },
  {
    title: "Dark Background",
    subTitle: "#001021",
    colorClassName: "bg-dark",
  },
  {
    title: "Primary 200",
    subTitle: "#FF7B00",
    colorClassName: "bg-primary-200",
  },
  {
    title: "Primary 300",
    subTitle: "#FF9500",
    colorClassName: "bg-primary-300",
  },
  {
    title: "Primary 400",
    subTitle: "#FFEA00",
    colorClassName: "bg-primary-400",
  },
  {
    title: "Primary 500",
    subTitle: "#FFC300",
    colorClassName: "bg-primary-500",
  },
  {
    title: "Gradient",
    subTitle: "#FF7B00 to #FFEA00",
    colorClassName: "bg-gradient-to-tr from-primary-300 to-primary-500",
  },
];
