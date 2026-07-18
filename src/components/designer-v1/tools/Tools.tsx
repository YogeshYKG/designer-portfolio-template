import styles from "@/components/designer-v1/tools/Tools.module.css";
import type { Designer } from "@/types/designer";

type Props = {
    data: Designer["data"]["tools"];
};

const Tools = ({ data }: Props) => {
    return (
        <section className={styles.toolsContainer} id={data.id}>
            <div className="section-title">{data.title}</div>

            <div className="section-description">
                {data.description}
            </div>

            <div className={styles.marquee}>
                <div className={styles.track}>
                    {[...data.toolIcons, ...data.toolIcons].map((tool, index) => (
                        <div key={index} className={styles.card}>
                            <img src={tool.icon} alt={tool.name} className={styles.icon} />
                            <span className={styles.name}>{tool.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Tools
