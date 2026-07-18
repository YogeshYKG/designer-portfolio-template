"use client";

import { useEffect, useRef, useState } from "react";
import {
  FaBehance,
  FaDribbble,
  FaLinkedinIn,
  FaInstagram,
  FaGithub,
} from "react-icons/fa";

import styles from "./Sidebar.module.css";
import type { Designer } from "@/types/designer";

type SidebarProps = {
  sidebarData: Designer["socials"];
};

export default function Sidebar({
  sidebarData,
}: SidebarProps) {
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;

      if (current < 20) {
        setHidden(false);
        lastScrollY.current = current;
        return;
      }

      if (Math.abs(current - lastScrollY.current) < 8) return;

      setHidden(current > lastScrollY.current);

      lastScrollY.current = current;
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  const socials = [
    {
      icon: <FaBehance />,
      href: sidebarData.behance,
    },
    {
      icon: <FaDribbble />,
      href: sidebarData.dribbble,
    },
    {
      icon: <FaLinkedinIn />,
      href: sidebarData.linkedin,
    },
    {
      icon: <FaInstagram />,
      href: sidebarData.instagram,
    },
    {
      icon: <FaGithub />,
      href: sidebarData.github,
    },
  ];

  return (
    <aside
      className={`${styles.sidebarContainer} ${
        hidden ? styles.hidden : ""
      }`}
    >
      {socials.map(
        ({ icon, href }, index) =>
          href && (
            <a
              key={index}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.icon}
            >
              {icon}
            </a>
          )
      )}
    </aside>
  );
}