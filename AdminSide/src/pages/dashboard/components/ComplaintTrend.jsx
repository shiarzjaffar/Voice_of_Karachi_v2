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
            value: stats.users,
        },

        {
            name: "Reports",
            value: stats.reports,
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

                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis dataKey="name" />

                        <YAxis />

                        <Tooltip />

                        <Bar
                            dataKey="value"
                            fill="#114232"
                            radius={[8,8,0,0]}
                        />

                    </BarChart>

                </ResponsiveContainer>

            </div>

        </DataCard>

    );

}