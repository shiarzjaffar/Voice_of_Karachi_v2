import styles from "./TableToolbar.module.css";

export default function TableToolbar({
    left,
    right
}) {

    return (

        <div className={styles.toolbar}>

            <div className={styles.left}>
                {left}
            </div>

            <div className={styles.right}>
                {right}
            </div>

        </div>

    );

}