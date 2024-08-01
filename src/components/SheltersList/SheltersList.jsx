import styles from './SheltersList.module.css';

const sheltersList = [
    { name: 'Shelter', location: 'Address' },
    { name: 'Shelter', location: 'Address' },
    { name: 'Shelter', location: 'Address' },
    { name: 'Shelter', location: 'Address' }
];

function SheltersList() {
    return (
        <ul className={styles.list}>
            {sheltersList.map((shelter, index) => (
                <li key={index} className={styles.item}>
                    <img
                        src="https://t3.ftcdn.net/jpg/01/59/17/98/240_F_159179817_F8joMJLDzGCjFSENf7ectW43ZJ7mlXvr.jpg"
                        alt="shelters.name"
                        className={styles.image}
                    />
                    <p className={styles.name}> {shelter.name}</p>
                    <p className={styles.location}>{shelter.location}</p>
                </li>
            ))}
        </ul>
    );
}

export default SheltersList;
