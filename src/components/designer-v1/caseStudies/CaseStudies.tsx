"use client";

import styles from "@/components/designer-v1/caseStudies/CaseStudies.module.css";
import type { Designer } from "@/types/designer";
import { useEffect, useState } from "react";

type Props = {
  data: Designer["data"]["caseStudies"];
};

type CardProps = {
  cardDetails: Designer["data"]["caseStudies"]["projects"][number];
  indexID: number;
  totalProjects: number;
};

const CaseStudyCard = ({
  cardDetails,
  indexID,
  totalProjects,
}: CardProps) => {
  return (
    <article className={styles.card} onClick={() => window.open(cardDetails.link, "_blank", "noopener,noreferrer")}>
      <div className={styles.meta}>
        <span className={styles.serial}>
          {String(indexID + 1).padStart(2, "0")}/
          {String(totalProjects).padStart(2, "0")}
        </span>

        <h3 className={styles.title}>
          {cardDetails.title}
        </h3>

        <span className={styles.time}>
          {cardDetails.timePeriod}
        </span>
      </div>

      <div className={styles.content}>
        <div className={styles.tags}>
          {cardDetails.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>

        <p>{cardDetails.description}</p>
      </div>

      <div className={styles.imageWrapper}>
        <img
          src={cardDetails.image}
          alt={cardDetails.title}
          className={styles.image}
        />
      </div>
    </article>
  );
};

const CaseStudies = ({ data }: Props) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); // initial check after mount

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section
      className={styles.caseStudiesContainer}
      id={data.id}
    >
      <div className="section-title">
        {data.title}
      </div>

      <div className="section-description">
        {data.description}
      </div>

      <div className={styles.list}>
        {data.projects.map((project, index) => (
          <div
            key={index}
            className={styles.stickyCard}
            style={{
              top: isMobile
                ? `${2 + index * 2}rem`
                : `${6 + index * 2}rem`,
              zIndex: data.projects.length + index,
            }}
          >
            <CaseStudyCard
              cardDetails={project}
              indexID={index}
              totalProjects={data.projects.length}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default CaseStudies;