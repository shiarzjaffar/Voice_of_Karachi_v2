import styles from "./ReportsStats.module.css";

export default function ReportsStats({ reports }) {
  const total = reports.length;

  const pending = reports.filter(
    (r) => r.status === "Pending"
  ).length;

  const progress = reports.filter(
    (r) => r.status === "In Progress"
  ).length;

  const closed = reports.filter(
    (r) => r.status === "Closed"
  ).length;

  const cards = [
    {
      title: "Total Reports",
      value: total,
    },
    {
      title: "Pending",
      value: pending,
    },
    {
      title: "In Progress",
      value: progress,
    },
    {
      title: "Closed",
      value: closed,
    },
  ];

  return (
    <div className={styles.grid}>
      {cards.map((card) => (
        <div
          key={card.title}
          className={styles.card}
        >
          <h4>{card.title}</h4>

          <h2>{card.value}</h2>
        </div>
      ))}
    </div>
  );
}