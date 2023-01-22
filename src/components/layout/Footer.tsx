import { FeedbackFish } from "@feedback-fish/react";
import * as React from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { FiMail } from "react-icons/fi";
import { SiGithub, SiLinkedin, SiTwitter } from "react-icons/si";
import { Tooltip as TooltipTippy } from "react-tippy";

import Accent from "@/components/Accent";
import Spotify from "@/components/layout/Spotify";
import UnstyledLink from "@/components/links/UnstyledLink";
import Tooltip from "@/components/Tooltip";

import { feedbackFlag, spotifyFlag } from "@/constants/env";

export default function Footer() {
  return (
    <footer className="mt-4 pb-2">
      <main className="layout flex flex-col items-center border-t pt-6 dark:border-gray-600 ">
        <FooterLinks />

        {spotifyFlag && <Spotify className="mt-8" />}

        <p className="mt-12 font-medium text-gray-600 dark:text-gray-300">
          Reach me out
        </p>
        <SocialLinks />

        <p className="mt-8 text-sm text-gray-600 dark:text-gray-300">
          © Aldy Azarya {new Date().getFullYear()}
          {feedbackFlag && (
            <>
              {" • "}
              <FeedbackFish projectId="0c8ae9db77c74d">
                <button className="rounded-sm hover:text-gray-800 focus:outline-none focus-visible:ring focus-visible:ring-primary-300 dark:hover:text-gray-100">
                  Got any feedback?
                </button>
              </FeedbackFish>
            </>
          )}
        </p>
      </main>
    </footer>
  );
}

function FooterLinks() {
  return (
    <div className="flex flex-wrap justify-center gap-y-4 gap-x-8">
      {footerLinks.map(({ href, text, tooltip }) => (
        <Tooltip interactive={false} key={href} content={tooltip}>
          <UnstyledLink
            className="animated-underline rounded-sm text-sm font-medium focus:outline-none focus-visible:ring focus-visible:ring-primary-300 dark:text-gray-200"
            href={href}
          >
            {text}
          </UnstyledLink>
        </Tooltip>
      ))}
    </div>
  );
}

function SocialLinks() {
  const [copyStatus, setCopyStatus] = React.useState(
    "Click the mail logo to copy"
  );

  return (
    <div className="mt-2 flex space-x-4">
      <div className="flex items-center justify-center">
        <TooltipTippy
          trigger="mouseenter"
          hideOnClick={false}
          interactive
          html={
            <div className="inline-block rounded-md border bg-white p-2 text-gray-600 shadow-md dark:border-gray-600 dark:bg-dark dark:text-gray-200">
              {copyStatus} <br/>
              <Accent className="inline-block font-medium">
                azarya.dev@tgmail.com
              </Accent>
            </div>
          }
        >
          <CopyToClipboard
            text="azarya.dev@tgmail.com"
            onCopy={() => {
              setCopyStatus("Copied to clipboard 🥳");
              setTimeout(
                () => setCopyStatus("Click the mail logo to copy"),
                1500
              );
            }}
          >
            <button className="rounded-sm align-middle focus:outline-none focus-visible:ring focus-visible:ring-primary-300">
              <FiMail className="h-7 w-7 align-middle text-gray-600 hover:text-primary-300 dark:text-gray-300 dark:hover:text-primary-300" />
            </button>
          </CopyToClipboard>
        </TooltipTippy>
      </div>
      {socials.map((social) => (
        <Tooltip interactive={false} key={social.href} content={social.text}>
          <UnstyledLink
            className="inline-flex items-center justify-center rounded-sm focus:outline-none focus-visible:ring focus-visible:ring-primary-300"
            href={social.href}
          >
            <social.icon className="my-auto h-6 w-6 align-middle text-gray-600 transition-colors hover:text-primary-300 dark:text-gray-300 dark:hover:text-primary-300" />
          </UnstyledLink>
        </Tooltip>
      ))}
    </div>
  );
}

const footerLinks = [
  {
    href: "/design",
    text: "Design",
    tooltip: "theodorusclarence.com color palette",
  },
  // {
  //   href: "https://clarence.link/docs",
  //   text: "Docs",
  //   tooltip: "Personal documentation about my best practices on development",
  // },
  // {
  //   href: "https://clarence.link/booknotes",
  //   text: "Book Notes",
  //   tooltip: "Note collection of books that I read",
  // },
  // {
  //   href: "https://clarence.link/starters",
  //   text: "Starter Templates",
  //   tooltip: "Starter that I build and use throughout my projects",
  // },
  {
    href: "/coming-soon",
    text: "Analytics",
    tooltip: "aldyazarya.com views and visitors analytics",
  },
  // {
  //   href: "/statistics",
  //   text: "Statistics",
  //   tooltip: "Blog, Projects, and Library Statistics",
  // },
  {
    href: "/guestbook",
    text: "Guestbook",
    tooltip:
      "Leave whatever you like to say—message, appreciation, suggestions",
  },
  {
    href: "/coming-soon",
    text: "Subscribe",
    tooltip: "Get an email whenever I post, no spam",
  },
  {
    href: "/coming-soon",
    text: "RSS",
    tooltip: "Add aldyazarya.com blog to your feeds",
  },
];

const socials = [
  {
    href: "https://github.com/aldyazarya",
    icon: SiGithub,
    id: "Github",
    text: (
      <>
        See my projects on <Accent className="font-medium">Github</Accent>
      </>
    ),
  },
  {
    href: "https://www.linkedin.com/in/aldyazarya/",
    icon: SiLinkedin,
    id: "Linkedin",
    text: (
      <>
        Find me on <Accent className="font-medium">Linkedin</Accent>
      </>
    ),
  },
  {
    href: "https://twitter.com/aldyazarya",
    icon: SiTwitter,
    id: "Twitter",
    text: (
      <>
        I post updates, tips, insight, and sometimes do some talk. Follow me on{" "}
        <Accent className="font-medium">Twitter</Accent>!
      </>
    ),
  },
];
