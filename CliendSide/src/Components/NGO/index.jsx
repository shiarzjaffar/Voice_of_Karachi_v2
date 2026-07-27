import { useState } from "react";
import styles from "./NGO.module.css";
import {
  Phone,
  Mail,
  MapPin,
  ExternalLink,
} from "lucide-react";

export const NGO = () => {
    const [search, setSearch] = useState("");
    const filteredOrganizations = organizations.filter((item) =>
  item.name.toLowerCase().includes(search.toLowerCase()) ||
  item.category.toLowerCase().includes(search.toLowerCase()) ||
  item.description.toLowerCase().includes(search.toLowerCase()) ||
  item.address.toLowerCase().includes(search.toLowerCase()) ||
  item.name.toLowerCase().includes(search.toLowerCase()) ||
  item.category.toLowerCase().includes(search.toLowerCase()) ||
  item.description.toLowerCase().includes(search.toLowerCase()) ||
  item.address.toLowerCase().includes(search.toLowerCase()) ||
  item.phone.toLowerCase().includes(search.toLowerCase())
);


const ngoList = filteredOrganizations.filter(
  (item) => item.category === "NGO"
);

const emergencyList = filteredOrganizations.filter(
  (item) => item.category === "Emergency"
);



  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.overlay}>
          <h1>Support & Emergency Services</h1>

          <p>
            Find trusted NGOs, welfare organizations, and emergency services
            available to assist citizens across Karachi.
          </p>
        </div>
      </section>

      {/* Search */}
      <section className={styles.searchSection}>
<input
  type="text"
  placeholder="Search organization..."
  className={styles.search}
  value={search}
  onChange={(e) => setSearch(e.target.value)}
/>

<p className={styles.resultCount}>
  {filteredOrganizations.length} result
  {filteredOrganizations.length !== 1 ? "s" : ""} found
</p>
      </section>

      

      {/* NGOs */}
      <section className={styles.section}>
        <h2>Welfare Organizations</h2>

<div className={styles.grid}>
{
  ngoList.length > 0 ? (
    ngoList.map((item) => (
      <div className={styles.card} key={item.name}>
        <h3>{item.name}</h3>

        <p>{item.description}</p>

        <span>
          <Phone size={16} />
          {item.phone}
        </span>

        <span>
          <Mail size={16} />
          {item.email}
        </span>

        <span>
          <MapPin size={16} />
          {item.address}
        </span>

        <a
          href={item.map}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.mapButton}
        >
          <ExternalLink size={16} />
          View on Google Maps
        </a>
      </div>
    ))
  ) : (
    <div className={styles.emptyState}>
      No welfare organizations found.
    </div>
  )
}
</div>
      </section>

      {/* Emergency */}
      <section className={styles.section}>
        <h2>Emergency Services</h2>

<div className={styles.grid}>
{
  emergencyList.length > 0 ? (
    emergencyList.map((item) => (
      <div className={styles.card} key={item.name}>
        <h3>{item.name}</h3>

        <p>{item.description}</p>

        <span>
          <Phone size={16} />
          {item.phone}
        </span>

        <span>
          <Mail size={16} />
          {item.email}
        </span>

        <span>
          <MapPin size={16} />
          {item.address}
        </span>

        <a
          href={item.map}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.mapButton}
        >
          <ExternalLink size={16} />
          View on Google Maps
        </a>
      </div>
    ))
  ) : (
    <div className={styles.emptyState}>
      No emergency services found.
    </div>
  )
}
</div>
      </section>
    </div>
  );
};

const organizations = [
  {
    name: "Edhi Foundation",
    category: "NGO",
    phone: "115",
    email: "info@edhi.org",
    address: "Mithadar, Karachi",
    description:
      "Provides ambulance services, shelters, healthcare and humanitarian assistance.",
    map: "https://maps.google.com/?q=Edhi+Foundation+Karachi",
  },
  {
    name: "Chhipa Welfare Association",
    category: "NGO",
    phone: "1020",
    email: "info@chhipa.org",
    address: "Garden East, Karachi",
    description:
      "Offers ambulance, rescue, burial, orphan care and welfare services.",
    map: "https://maps.google.com/?q=Chhipa+Foundation+Karachi",
  },
  {
    name: "Saylani Welfare",
    category: "NGO",
    phone: "+92-21-111-729-526",
    email: "info@saylaniwelfare.com",
    address: "Bahadurabad, Karachi",
    description:
      "Supports education, food distribution, healthcare and vocational training.",
    map: "https://maps.google.com/?q=Saylani+Welfare+Karachi",
  },
  {
    name: "Al Khidmat Foundation",
    category: "NGO",
    phone: "+92-21-111-503-504",
    email: "info@alkhidmat.org",
    address: "Shahrah-e-Faisal, Karachi",
    description:
      "Provides disaster relief, healthcare, education and community welfare.",
    map: "https://maps.google.com/?q=Al+Khidmat+Foundation+Karachi",
  },
  {
    name: "Rescue 1122",
    category: "Emergency",
    phone: "1122",
    email: "-",
    address: "Sindh Emergency Service",
    description:
      "Emergency rescue, ambulance and disaster response service.",
    map: "https://maps.google.com/?q=Rescue+1122+Karachi",
  },
  {
    name: "Police Emergency",
    category: "Emergency",
    phone: "15",
    email: "-",
    address: "Karachi Police",
    description:
      "Emergency police assistance for citizens.",
    map: "https://maps.google.com/?q=Karachi+Police",
  },
  {
    name: "Fire Brigade",
    category: "Emergency",
    phone: "16",
    email: "-",
    address: "Karachi Fire Department",
    description:
      "Emergency fire response and rescue services.",
    map: "https://maps.google.com/?q=Karachi+Fire+Brigade",
  },
  {
    name: "Sindh Ambulance Service",
    category: "Emergency",
    phone: "1021",
    email: "-",
    address: "Karachi",
    description:
      "Emergency ambulance assistance for medical emergencies.",
    map: "https://maps.google.com/?q=Ambulance+Karachi",
  },
];

export default NGO;

