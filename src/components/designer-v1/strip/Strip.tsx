"use client";

import styles from "@/components/designer-v1/strip/Strip.module.css";

type Props = {
  type: 1 | 2;
};

const stripData = {
  1: [
    "UI DESIGN",
    "PROTOTYPING",
    "DESIGN SYSTEMS",
    "USER TESTING",
    "COLLABORATION",
    "WIREFRAMING",
  ],

  2: [
    "RESEARCH",
    "DESIGN",
    "DEVELOPMENT",
    "RESEARCH",
    "DESIGN",
    "DEVELOPMENT",
  ],
};

export default function Strip({ type }: Props) {
  const items = [...stripData[type], ...stripData[type]];

  return (
    <section
      className={`${styles.strip} ${
        type === 1 ? styles.dark : styles.outline
      }`}
    >
      <div className={styles.track}>
        {items.map((item, index) => (
          <div key={index} className={styles.item}>
            <span>{item}</span>

            {type === 1 && (
              <span className={styles.star}>✦</span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}