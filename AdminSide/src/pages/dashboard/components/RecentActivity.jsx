import DataCard from "../../../components/admin/ui/DataCard/DataCard";
import styles from "./RecentActivity.module.css";

export default function RecentActivity() {

    return (

        <DataCard
            title="Recent Activity"
            subtitle="Latest platform updates"
        >

<ul className={styles.list}>
    <li>Latest complaints will appear here.</li>
    <li>Newest users will appear here.</li>
    <li>Latest citizen messages.</li>
</ul>

        </DataCard>

    );

}