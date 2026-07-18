"use client";

import styles from "./Hero.module.css";
import type { Designer } from "@/types/designer";

type HeroProps = {
    data: Designer["data"]["hero"];
    background?: "grid" | "image";
};

const Hero = ({
    data,
    background = "grid",
}: HeroProps) => {


    const scrollTo = (id: string) => {
        const element = document.getElementById(id);

        if (!element) return;

        const rem = parseFloat(
            getComputedStyle(document.documentElement).fontSize
        );

        const offset = 1 * rem;

        window.scrollTo({
            top:
                element.getBoundingClientRect().top +
                window.scrollY -
                offset,
            behavior: "smooth",
        });
    };

    return (
        <section className={styles.heroContainer} id={data.id}>

            {background === "image" ? (
                <img
                    src={data.image}
                    alt={data.title}
                    className={styles.backgroundImage}
                />
            ) : (
                <div className={styles.gridBackground} />
            )}

            <div className={styles.overlay} />
            <img
                src={data.modelImage}
                alt={data.title}
                className={styles.modelBgImageTop}
            />
            <img
                src={data.modelImage}
                alt={data.title}
                className={styles.modelBgImageBottom}
            />

            <div className={styles.content}>

                <span className={styles.greeting}>
                    {data.greeting}
                </span>

                <h1 className={styles.title}>
                    {data.title}
                </h1>

                <p className={styles.description}>
                    {data.description}
                </p>

                <button className={styles.button} onClick={() => scrollTo("case-studies")}>
                    {data.CTA}
                </button>

            </div>

        </section>
    );
};

export default Hero;