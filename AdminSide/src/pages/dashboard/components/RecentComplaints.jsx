import DataCard from "../../../components/admin/ui/DataCard/DataCard";
import StatusBadge from "../../../components/admin/ui/StatusBadge/StatusBadge";
import ActionButton from "../../../components/admin/ui/ActionButton/ActionButton";

export default function RecentComplaints() {

const complaints = [
    {
        id:1001,
        citizen:"Ahmed Ali",
        department:"KMC",
        status:"Pending",
        date:"18 Jul"
    },
    {
        id:1002,
        citizen:"Sara Khan",
        department:"Water Board",
        status:"Resolved",
        date:"18 Jul"
    },
    {
        id:1003,
        citizen:"Bilal Ahmed",
        department:"KE",
        status:"In Progress",
        date:"17 Jul"
    },
    {
        id:1004,
        citizen:"Ayesha Noor",
        department:"SSWMB",
        status:"Pending",
        date:"17 Jul"
    }
];

    return (

        <DataCard
            title="Recent Complaints"
            subtitle="Latest complaints submitted by citizens"
        >

            {/* table goes here */}

        </DataCard>

    );

}