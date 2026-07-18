"use client";

import { useEffect, useRef } from "react";

import styles from "@/components/designer-v1/designProcess/DesignProcess.module.css";
import type { Designer } from "@/types/designer";

type DesignProcessProps = {
  data: Designer["data"]["designProcess"];
  background?: "grid" | "image";
};

const DesignProcess = ({
  data,
  background = "grid",
}: DesignProcessProps) => {
  const phaseRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
            observer.unobserve(entry.target); // animate once
          }
        });
      },
      {
        threshold: 0.2,
      }
    );

    phaseRefs.current.forEach((phase) => {
      if (phase) observer.observe(phase);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      className={styles.designProcessContainer}
      id={data.id}
    >
      <div className="section-title-light">
        {data.title}
      </div>

      <div className="section-description-light">
        {data.description}
      </div>

      <div className={styles.processWrapper}>
        {data.phases.map((phase, index) => (
          <div
            key={index}
            ref={(el) => {
              phaseRefs.current[index] = el;
            }}
            className={`${styles.phase} ${
              index === data.phases.length - 1
                ? styles.lastPhase
                : ""
            }`}
            style={{
              marginTop: `${index * 5}rem`,
            }}
          >
            <div className={styles.phaseHeader}>
              <h3>{phase.title}</h3>

              <div className={styles.line} />

              <div className={styles.phaseMeta}>
                <span>{phase["phase-sno"]}</span>
                <span>{phase.timePeriod}</span>
              </div>

              <div className={styles.line} />
            </div>

            <ul className={styles.processList}>
              {phase.process.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {background === "grid" && (
        <div className={styles.gridBackground} />
      )}
      <div className={styles.overlay} />
    </section>
  );
};

export default DesignProcess;