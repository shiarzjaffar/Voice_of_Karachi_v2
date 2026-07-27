import styles from "./PageHeader.module.css";

export default function PageHeader({
    title,
    subtitle,
    actions,
    breadcrumbs
}) {

    return (

        <div className={styles.wrapper}>

            <div className={styles.left}>

                {breadcrumbs && (
                    <div className={styles.breadcrumbs}>
                        {breadcrumbs}
                    </div>
                )}

                <h1>{title}</h1>

                {subtitle && (
                    <p>{subtitle}</p>
                )}

            </div>

            {actions && (

                <div className={styles.right}>
                    {actions}
                </div>

            )}

        </div>

    );

}