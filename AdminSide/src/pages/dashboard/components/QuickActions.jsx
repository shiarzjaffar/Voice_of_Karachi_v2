import { Link } from "react-router-dom";
import {
    Users,
    FileText,
    MessageSquare,
    ArrowRight
} from "lucide-react";

import DataCard from "../../../components/admin/ui/DataCard/DataCard";
import styles from "./QuickActions.module.css";

const actions = [
    {
        title: "Manage Users",
        icon: <Users size={24} />,
        link: "/user-fetch",
    },
    {
        title: "Manage Reports",
        icon: <FileText size={24} />,
        link: "/report-fetch",
    },

];

export default function QuickActions() {

    return (

        <DataCard
            title="Quick Actions"
            subtitle="Frequently used administration tools"
        >

            <div className={styles.grid}>

                {actions.map(action => (

                    <Link
                        key={action.title}
                        to={action.link}
                        className={styles.card}
                    >

                        <div className={styles.icon}>
                            {action.icon}
                        </div>

                        <h4>
                            {action.title}
                        </h4>

                        <span>
                            Open
                            <ArrowRight size={16}/>
                        </span>

                    </Link>

                ))}

            </div>

        </DataCard>

    );

}