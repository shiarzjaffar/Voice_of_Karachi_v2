import styles from "./DataCard.module.css";

export default function DataCard({
    title,
    subtitle,
    actions,
    children,
    noPadding = false,
    footer
}) {

    return (

        <section className={styles.card}>

            {(title || subtitle || actions) && (

                <div className={styles.header}>

                    <div>

                        {title && (
                            <h3>{title}</h3>
                        )}

                        {subtitle && (
                            <p>{subtitle}</p>
                        )}

                    </div>

                    {actions && (

                        <div className={styles.actions}>
                            {actions}
                        </div>

                    )}

                </div>

            )}

            <div
                className={
                    noPadding
                        ? styles.contentNoPadding
                        : styles.content
                }
            >

                {children}

            </div>

            {footer && (

                <div className={styles.footer}>
                    {footer}
                </div>

            )}

        </section>

    );

}