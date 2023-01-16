import clsx from "clsx";
import * as React from "react";
import { IoLogoVercel } from "react-icons/io5";
import {
  SiNextdotjs,
  SiNodedotjs,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiJavascript,
  SiDocker,
  SiHtml5,
  SiSolidity,
  SiSass,
} from "react-icons/si";

import CustomLink from "@/components/links/CustomLink";
import Tooltip from "@/components/Tooltip";

export default function TechStack() {
  return (
    <div className="flex space-x-2 md:space-x-4">
      {stacks.map((tech) => (
        <Tooltip key={tech.id} content={<p>{tech.tooltip}</p>}>
          <tech.icon
            key={tech.id}
            className={clsx(
              "h-8 w-8 md:h-10 md:w-10",
              "text-gray-600 hover:text-primary-300 dark:text-gray-200 dark:hover:text-primary-300",
              "transition-colors"
            )}
          />
        </Tooltip>
      ))}
    </div>
  );
}

const stacks = [
  {
    id: "nextjs",
    icon: SiNextdotjs,
    tooltip: (
      <>
        <CustomLink href="https://nextjs.org">Next.js</CustomLink>, currently my
        go-to framework because of the static generation, dynamic paths, and
        built-in api.
      </>
    ),
  },
  {
    id: "react",
    icon: SiReact,
    tooltip: (
      <>
        <CustomLink href="https://reactjs.org/">Create React App</CustomLink>,
        first frontend framework that I learned, great if you are making an
        authenticated website.
      </>
    ),
  },
  {
    id: "typescript",
    icon: SiTypescript,
    tooltip: (
      <>
        <CustomLink href="https://www.typescriptlang.org/">
          TypeScript
        </CustomLink>
        , finally jumping on this one, I love the experience!
      </>
    ),
  },
  {
    id: "javascript",
    icon: SiJavascript,
    tooltip: (
      <>
        <CustomLink href="https://javascript.info/js">Javascript</CustomLink>,
        the first programming language I learned!
      </>
    ),
  },
  {
    id: "html",
    icon: SiHtml5,
    tooltip: (
      <>
        <CustomLink href="https://html5.org/">Html5</CustomLink>, if a website
        is a person, then hmtl5 is its bones!
      </>
    ),
  },
  {
    id: "sass",
    icon: SiSass,
    tooltip: (
      <>
        <CustomLink href="https://sass-lang.com/">
          Sass
        </CustomLink>
        , if you want to make your css neater, then you should learn it !
      </>
    ),
  },
  {
    id: "tailwind",
    icon: SiTailwindcss,
    tooltip: (
      <>
        <CustomLink href="https://tailwindcss.com/">Tailwind CSS</CustomLink> is
        awesome, I have never achieved this much reusability. Make sure you get
        the{" "}
        <CustomLink href="https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss">
          extension
        </CustomLink>
        .
      </>
    ),
  },
  {
    id: "node",
    icon: SiNodedotjs,
    tooltip: (
      <>
        <CustomLink href="https://nodejs.org/">Node.js</CustomLink>, simple
        backend language so you don&apos;t need to learn another language. Not
        using this too often because Next.js already has a backend built-in.
      </>
    ),
  },
  {
    id: "docker",
    icon: SiDocker,
    tooltip: (
      <>
        <CustomLink href="https://www.docker.com/">Docker</CustomLink>, dude,
        you have to use it !
      </>
    ),
  },
  {
    id: "solidity",
    icon: SiSolidity,
    tooltip: (
      <>
        <CustomLink href="https://docs.soliditylang.org/en/v0.8.17/#">
          Solidity
        </CustomLink>
        , jump into web3 Blockchain development, still learn it
      </>
    ),
  },
];
