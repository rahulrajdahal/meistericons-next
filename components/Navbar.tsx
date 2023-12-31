"use client";

import { routes } from "@/utils/routes";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { useWindowSize } from "@/hooks";
import Image from "next/image";
import { close, ellipsisV, githubFill, search } from "@/assets/icons";
import { Logo } from ".";
import styled from "styled-components";
import { event } from "@/utils/gtag";

interface INavbar extends React.ComponentPropsWithoutRef<"div"> {
  position?: string;
}

const StartButton = styled(Link)`
  box-shadow: 0px 3px 20px 0px rgba(62, 100, 255, 0.4);
`;
const links = [
  {
    link: (
      <Link href={routes.landing} className="flex items-center gap-[0.31rem]">
        <Image
          src={search}
          alt={"search"}
          width={24}
          height={24}
          className="w-6 h-6"
        />
        Icons
      </Link>
    ),
    id: 1,
  },
  {
    link: <Link href={`/${routes.howToUse}/${routes.figma}`}>How to Use?</Link>,
    id: 2,
  },
  {
    link: <Link href={routes.landing}>Sponsor</Link>,
    id: 3,
  },
  {
    link: (
      <StartButton
        href="https://github.com/rahulrajdahal/meistericons"
        target="_blank"
        rel="noreferrer"
        className="text-lg font-medium inline-flex gap-1 items-center px-4 py-2 bg-[#3E64FF] rounded-[10px] text-grey-100"
      >
        <Image
          src={githubFill}
          alt={"githubFill"}
          width={24}
          height={24}
          className="w-6 h-6"
        />
        Start Here
      </StartButton>
    ),
    id: 4,
  },
];
export default function Navbar({ position, ...props }: Readonly<INavbar>) {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const { width } = useWindowSize();

  const renderHamburgerMenu = () => {
    const linkVariants = {
      hidden: { y: 20, opacity: 0 },
      visible: {
        y: 0,
        opacity: 1,
      },
    };

    const menusVariants = {
      hidden: { opacity: 1, scale: 0 },
      visible: {
        opacity: 1,
        scale: 1,
        transition: {
          delayChildren: 0.3,
          staggerChildren: 0.2,
        },
      },
      exit: {
        opacity: 1,
        scale: 0,
        transition: {
          delayChildren: 0.3,
          staggerChildren: 0.2,
        },
      },
    };

    return (
      <>
        <Image
          src={ellipsisV}
          alt="menu"
          onClick={() => {
            setIsOpen(() => true);
          }}
          width={20}
          height={10}
          className="w-5 h-5"
        />

        {isOpen ? (
          <div className="px-4 py-3 z-50 animate_hamburger_menu fixed top-0 bottom-0 left-0 right-0 bg-white">
            <span className="inline-flex items-center w-full justify-between">
              <Logo />
              <motion.button
                onClick={() => setIsOpen(false)}
                whileHover={{ rotate: 90 }}
              >
                <Image
                  width={24}
                  height={24}
                  src={close}
                  alt="close"
                  className="w-6 h-6"
                />
              </motion.button>
            </span>

            <motion.ul
              variants={menusVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex flex-col items-center gap-6 mt-12"
            >
              {links.map(({ link, id }) => (
                <motion.li
                  key={id}
                  onClick={() => {
                    setIsOpen(() => false);
                    let value = "Icons";

                    switch (id) {
                      case 2:
                        value = "how to use";
                        break;

                      case 3:
                        value = "Sponsor";
                        break;

                      case 4:
                        value = "start here";
                        break;

                      default:
                        break;
                    }

                    event({
                      action: "icons clicked",
                      category: "Navbar",
                      label: "Navlink",
                      value,
                    });
                  }}
                  variants={linkVariants}
                >
                  {id !== 4 ? (
                    <p className="font-medium inline-flex items-center gap-[5px] text-lg text-grey-700">
                      {link}
                    </p>
                  ) : (
                    link
                  )}
                </motion.li>
              ))}
            </motion.ul>
          </div>
        ) : null}
      </>
    );
  };

  const navVariants = {
    hidden: {
      y: -100,
      scale: 1.5,
    },
    visible: {
      y: 0,
      scale: 1,
      transition: {
        delay: 0.2,
      },
    },
  };

  return (
    <motion.nav
      animate="visible"
      initial="hidden"
      variants={navVariants}
      className={`${props.className} sticky top-0 max-h-[3.75rem] bg-white z-10 w-full h-full inline-flex items-center justify-between px-[4%] py-3 md:py-7 md:px-[12.5%]`}
    >
      <Logo />

      {width > 768 ? renderLinks() : renderHamburgerMenu()}
    </motion.nav>
  );
}
const renderLinks = () => (
  <ul className="inline-flex w-full items-center justify-end gap-[74px]">
    {links.map(({ link, id }) => (
      <li
        key={id}
        onClick={() => {
          let value = "Icons";

          switch (id) {
            case 2:
              value = "how to use";
              break;

            case 3:
              value = "Sponsor";
              break;

            case 4:
              value = "start here";
              break;

            default:
              break;
          }

          event({
            action: "icons clicked",
            category: "Navbar",
            label: "Navlink",
            value,
          });
        }}
      >
        {id !== 4 ? (
          <p className="font-medium inline-flex items-center gap-[5px] text-lg text-grey-700">
            {link}
          </p>
        ) : (
          link
        )}
      </li>
    ))}
  </ul>
);
