import styles from "./StatisticsCards.module.css";

const StatisticsCards = ({ reports }) => {

    const total = reports.length;

    const pending = reports.filter(r => r.status === "Pending").length;

    const progress = reports.filter(r => r.status === "In Progress").length;

    const resolved = reports.filter(r => r.status === "Resolved").length;

    const assigned = reports.filter(r => r.status === "Assigned").length;

    const stats = [

        { title:"Total", value:total },

        { title:"Pending", value:pending },

        { title:"Assigned", value:assigned },

        { title:"In Progress", value:progress },

        { title:"Resolved", value:resolved },

    ];

    return (

        <div className={styles.grid}>

            {stats.map((item,index)=>(

                <div
                    key={index}
                    className={styles.card}
                >

                    <h2>{item.value}</h2>

                    <p>{item.title}</p>

                </div>

            ))}

        </div>

    );

};

export default StatisticsCards;