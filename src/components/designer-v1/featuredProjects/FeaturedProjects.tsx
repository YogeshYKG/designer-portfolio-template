"use client";

import { useEffect, useRef, useState } from "react";

import styles from "@/components/designer-v1/featuredProjects/FeaturedProjects.module.css";
import type { Designer } from "@/types/designer";

type FeaturedProjectsProps = {
    data: Designer["data"]["featuredProjects"];
};

type CardProps = {
    cardDetails: Designer["data"]["featuredProjects"]["projects"][number];
    indexID: number;
    totalProjects: number;
};

const ProjectCard = ({
    cardDetails,
    indexID,
    totalProjects,
}: CardProps) => {
    return (
        <article className={styles.card}>
            <div className={styles.left}>
                <div className={styles.leftCanvas}>
                    <h2 className={styles.backgroundTitle}>
                        {cardDetails.shadowTitle}
                    </h2>

                    <span className={styles.serial}>
                        {String(indexID + 1).padStart(2, "0")}/
                        {String(totalProjects).padStart(2, "0")}
                    </span>

                    <img
                        src={cardDetails.brandimage}
                        alt={`${cardDetails.title} Brand`}
                        className={styles.brandImage}
                    />

                    <img
                        src={cardDetails.image}
                        alt={cardDetails.title}
                        className={styles.projectImage}
                    />
                </div>
            </div>

            <div className={styles.right}>
                <div>
                    <h3 className={styles.title}>
                        {cardDetails.title}
                    </h3>

                    <p className={styles.description}>
                        {cardDetails.description}
                    </p>
                </div>

                <div className={styles.bottom}>
                    <div className={styles.tags}>
                        {cardDetails.tags.map((tag) => (
                            <span key={tag}>{tag}</span>
                        ))}
                    </div>

                    <a
                        href={cardDetails.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.cta}
                    >
                        {cardDetails.CTA}
                    </a>
                </div>
            </div>
        </article>
    );
};

const FeaturedProjects = ({ data }: FeaturedProjectsProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [nextIndex, setNextIndex] = useState(0);

    const [direction, setDirection] = useState<"next" | "prev">("next");
    const [stage, setStage] = useState<"idle" | "out" | "in">("idle");

    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const startAutoplay = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        intervalRef.current = setInterval(() => {
            if (stage !== "idle") return;

            const next =
                (currentIndex + 1) % data.projects.length;

            setDirection("next");
            setNextIndex(next);
            setStage("out");
        }, 3000);
    };

    useEffect(() => {
        startAutoplay();

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [currentIndex, stage, data.projects.length]);

    const changeSlide = (index: number) => {
        if (stage !== "idle" || index === currentIndex) return;

        setDirection(index > currentIndex ? "next" : "prev");
        setNextIndex(index);
        setStage("out");
    };

    const handleAnimationEnd = () => {
        if (stage === "out") {
            setCurrentIndex(nextIndex);
            setStage("in");
        } else if (stage === "in") {
            setStage("idle");
        }
    };

    const animationClass =
        stage === "out"
            ? direction === "next"
                ? styles.slideOutLeft
                : styles.slideOutRight
            : stage === "in"
              ? direction === "next"
                  ? styles.slideInRight
                  : styles.slideInLeft
              : "";

    return (
        <section
            className={styles.featuredProjectsContainer}
            id={data.id}
        >
            <div className="section-title">
                {data.title}
            </div>

            <div className="section-description">
                {data.description}
            </div>

            <div className={styles.slider}>
                <div
                    className={animationClass}
                    onAnimationEnd={handleAnimationEnd}
                >
                    <ProjectCard
                        cardDetails={data.projects[currentIndex]}
                        indexID={currentIndex}
                        totalProjects={data.projects.length}
                    />
                </div>

                <div className={styles.dots}>
                    {data.projects.map((_, index) => (
                        <button
                            key={index}
                            type="button"
                            onClick={() => changeSlide(index)}
                            className={`${styles.dot} ${
                                currentIndex === index
                                    ? styles.activeDot
                                    : ""
                            }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedProjects;