"use client";

import { useEffect, useRef, useState } from "react";

import styles from "@/components/designer-v1/navbar/Navbar.module.css";
import type { Designer } from "@/types/designer";

type NavbarProps = {
  navbarData: Designer;
};

export default function Navbar({ navbarData }: NavbarProps) {
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 20) {
        setHidden(false);
        lastScrollY.current = currentScrollY;
        return;
      }

      if (
        Math.abs(currentScrollY - lastScrollY.current) <
        8
      ) {
        return;
      }

      if (currentScrollY > lastScrollY.current) {
        setHidden(true);
        setMenuOpen(false);
      } else {
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

  const handleNavClick = (id: string) => {
    scrollTo(id);
    setMenuOpen(false);
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
          handleNavClick(
            navbarData.data.navbar.navItems[0].id
          )
        }
      >
        {navbarData.data.navbar.logoInitials}
      </div>

      {/* Desktop Navigation */}
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

      {/* Mobile Hamburger */}
      <button
        type="button"
        aria-label="Toggle navigation"
        className={`${styles.hamburger} ${
          menuOpen ? styles.hamburgerOpen : ""
        }`}
        onClick={() =>
          setMenuOpen((prev) => !prev)
        }
      >
        <span />
        <span />
        <span />
      </button>

      {/* Mobile Menu */}
      <div
        className={`${styles.mobileMenu} ${
          menuOpen ? styles.mobileMenuOpen : ""
        }`}
      >
        {navbarData.data.navbar.navItems
          .filter((item) => item.required)
          .map((item) => (
            <button
              key={item.id}
              onClick={() =>
                handleNavClick(item.id)
              }
            >
              {item.label}
            </button>
          ))}

        <a
          href={navbarData.profile.resume}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.mobileResume}
          onClick={() => setMenuOpen(false)}
        >
          Download Resume
        </a>
      </div>
    </nav>
  );
}