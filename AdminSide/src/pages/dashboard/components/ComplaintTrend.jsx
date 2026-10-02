import {
    ResponsiveContainer,
    BarChart,
    Bar,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
} from "recharts";

import DataCard from "../../../components/admin/ui/DataCard/DataCard";
import styles from "./ComplaintTrend.module.css";

export default function ComplaintTrend({ stats }) {

    const chartData = [

    {
        name: "Users",
        value: stats.users || 0,
    },
        {
        name: "Employees",
        value: stats.employees || 0,
    },

     {
        name: "Pending Reports",
        value: stats.pending || 0,
    },

    {
        name: "Reports",
        value: stats.reports || 0,
    },

];
    return (

        <DataCard
            title="System Overview"
            subtitle="Current platform statistics"
        >

            <div className={styles.chart}>

                <ResponsiveContainer
                    width="100%"
                    height={320}
                >

                    <BarChart data={chartData}>

                        <CartesianGrid
    strokeDasharray="3 3"
    vertical={false}
/>

                        <XAxis dataKey="name" />

                        <YAxis
    allowDecimals={false}
/>

                        <Tooltip
    formatter={(value) => [value, "Count"]}
/>

                        <Bar
    dataKey="value"
    fill="#114232"
    radius={[8, 8, 0, 0]}
    animationDuration={900}
/>

                    </BarChart>

                </ResponsiveContainer>

            </div>

        </DataCard>

    );

}