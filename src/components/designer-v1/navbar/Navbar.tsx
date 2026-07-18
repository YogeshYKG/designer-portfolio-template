"use client";

import { useEffect, useRef, useState } from "react";

import styles from "@/components/designer-v1/navbar/Navbar.module.css";
import type { Designer } from "@/types/designer";

type NavbarProps = {
  navbarData: Designer;
};

export default function Navbar({ navbarData }: NavbarProps) {
  const [hidden, setHidden] = useState(false);

  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Always show at the top
      if (currentScrollY < 20) {
        setHidden(false);
        lastScrollY.current = currentScrollY;
        return;
      }

      // Ignore tiny movements
      if (Math.abs(currentScrollY - lastScrollY.current) < 8) {
        return;
      }

      if (currentScrollY > lastScrollY.current) {
        // Scrolling down
        setHidden(true);
      } else {
        // Scrolling up
        setHidden(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);

    if (!element) return;

    const rem = parseFloat(
      getComputedStyle(document.documentElement).fontSize
    );

    const offset = 4 * rem;

    window.scrollTo({
      top:
        element.getBoundingClientRect().top +
        window.scrollY -
        offset,
      behavior: "smooth",
    });
  };

  return (
    <nav
      className={`${styles.navbarContainer} ${
        hidden ? styles.hidden : ""
      }`}
    >
      <div
        className={styles.logo}
        onClick={() =>
          scrollTo(navbarData.data.navbar.navItems[0].id)
        }
      >
        {navbarData.data.navbar.logoInitials}
      </div>

      <div className={styles.links}>
        {navbarData.data.navbar.navItems
          .filter((item) => item.required)
          .map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
            >
              {item.label}
            </button>
          ))}
      </div>

      <a
        href={navbarData.profile.resume}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.resume}
      >
        Download Resume
      </a>
    </nav>
  );
}