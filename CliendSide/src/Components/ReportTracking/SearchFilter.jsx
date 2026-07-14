import styles from "./SearchFilter.module.css";

const SearchFilter = ({
    search,
    setSearch
}) => {

    return (

        <div className={styles.card}>

            <input

                type="text"

                placeholder="Search by Tracking ID or Title..."

                value={search}

                onChange={(e)=>setSearch(e.target.value)}

            />

        </div>

    );

};

export default SearchFilter;