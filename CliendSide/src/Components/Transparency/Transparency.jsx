import { useEffect, useState } from "react";
import { getTransparencyDashboard } from "../../services/transparencyService";

import styles from "./Transparency.module.css";

import HeroMap from "./HeroMap";
import FloatingStats from "./FloatingStats";

import ComplaintHotspots from "./ComplaintHotspots";
import DepartmentPerformance from "./DepartmentPerformance";
import ResolutionPerformance from "./ResolutionPerformance";
import CategoryChart from "./CategoryChart";
import MonthlyTrend from "./MonthlyTrend";
import DistrictComparison from "./DistrictComparison";
import RecentReports from "./RecentReports";

const Transparency = () => {

    /*
    =====================================
    Shared Filters
    =====================================
    */

    const [selectedArea, setSelectedArea] = useState(null);

    const [selectedDepartment, setSelectedDepartment] =
        useState(null);

    const [selectedCategory, setSelectedCategory] =
        useState(null);

    const [selectedStatus, setSelectedStatus] =
        useState(null);

    const [selectedMonth, setSelectedMonth] =
        useState(null);

    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

    const loadDashboard = async () => {

        try {

            const data = await getTransparencyDashboard();

            setDashboardData(data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    };

    loadDashboard();

}, []);

    if (loading) {
    return <h2>Loading Transparency Dashboard...</h2>;
}


    /*
    =====================================
    Dummy Heatmap Data
    =====================================
    */


    return (
        <main className={styles.container}>

            {/* ==========================
                Hero Section
            ========================== */}

            <section className={styles.hero}>

                <HeroMap
                    heatmapData={dashboardData.heatmap ?? []}
                    selectedArea={selectedArea}
                    selectedDepartment={selectedDepartment}
                    selectedCategory={selectedCategory}
                    selectedStatus={selectedStatus}
                    selectedMonth={selectedMonth}
                />

<FloatingStats
    stats={dashboardData.stats}
/>

            </section>

            {/* ==========================
                Analytics
            ========================== */}

            <section className={styles.analytics}>

                <section className={styles.analytics}>

    {/* Row 1 */}

    <div className={styles.gridTwo}>

        <ResolutionPerformance
            data={dashboardData.resolutionPerformance}
        />

        <CategoryChart
            categories={dashboardData.categories}
        />

    </div>

    {/* Row 2 */}

    <div className={styles.gridTwo}>

        <MonthlyTrend
            monthlyData={dashboardData.monthlyTrend ?? []}
        />

        <DistrictComparison
            data={dashboardData.districtComparison}
            totalReports={dashboardData.stats.total}
        />

    </div>

    {/* Row 3 */}

   <div className={`${styles.gridTwoLarge} ${styles.dashboardSection}`}>

        <DepartmentPerformance
            departments={dashboardData.departments}
        />

        <ComplaintHotspots
            hotspots={dashboardData.complaintHotspots ?? []}
            onAreaHover={setSelectedArea}
            onAreaLeave={() => setSelectedArea(null)}
        />

    </div>

    {/* Row 4 */}

    <RecentReports
        reports={dashboardData.recentReports}
    />

</section>


            </section>

        </main>
    );

};

export default Transparency;