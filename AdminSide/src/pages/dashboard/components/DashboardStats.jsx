import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
    Users,
    FileText,
    Clock3,
    UserCog,
} from "lucide-react";

import StatCard from "../../../components/admin/ui/StatCard/StatCard";
import styles from "./DashboardStats.module.css";

export default function DashboardStats({
    stats = {},
    loading = false,
}) {

    const cards = [
        {
            title: "Total Users",
            value: stats.users,
            icon: <Users size={26} />,
            color: "primary",
            link: "/user-fetch",
            footer: "Registered Citizens"
        },
        {
            title: "Total Reports",
            value: stats.reports,
            icon: <FileText size={26} />,
            color: "warning",
            link: "/report-fetch",
            footer: "Citizen Complaints"
        },

        {
            title: "Pending Reports",
            value: stats.pending,
            icon: <Clock3 size={26} />,
            color: "danger",
            link: "/reports",
            footer: "Awaiting Action"
        },
                {
            title: "Employees",
            value: stats.employees,
            icon: <UserCog size={26} />,
            color: "success",
            link: "/employees",
            footer: "Active Staff"
        }

    ];

    return (

        <div className={styles.grid}>

            {cards.map((card) => (

                <Link
                    key={card.title}
                    to={card.link}
                    className={styles.link}
                >

                    <motion.div
                        whileHover={{ y: -5 }}
                    >

                        <StatCard
                            title={card.title}
                            value={loading ? "..." : card.value}
                            icon={card.icon}
                            color={card.color}
                            footer={card.footer}
                        />

                    </motion.div>

                </Link>

            ))}

        </div>

    );

}