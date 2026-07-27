import styles from "./LoadingSpinner.module.css";

export default function LoadingSpinner({
  text = "Loading...",
  fullScreen = false,
}) {
  const content = (
    <div className={styles.wrapper}>
      <div className={styles.spinner}></div>

      <p className={styles.text}>{text}</p>
    </div>
  );

  if (fullScreen) {
    return <div className={styles.overlay}>{content}</div>;
  }

  return content;
}