import styles from './VolunteersList.module.css';

const volunteersList = [
    { name: 'Name Surname', role: 'Volunteer' },
    { name: 'Name Surname', role: 'Volunteer' },
    { name: 'Name Surname', role: 'Volunteer' },
    { name: 'Name Surname', role: 'Volunteer' },

];

function VolunteersList() {
    return (
        <ul className={styles.list}>
            {volunteersList.map((volunteer, index) => (
                <li key={index} className={styles.item}>
                    <img
                        src="https://t3.ftcdn.net/jpg/01/59/17/98/240_F_159179817_F8joMJLDzGCjFSENf7ectW43ZJ7mlXvr.jpg"
                        alt="member.name"
                        className={styles.image}
                    />
                    <p className={styles.name}>{volunteer.name} </p>
                    <p className={styles.role}>{volunteer.role}</p>
                </li>
            ))}
        </ul>
    );
}

export default VolunteersList;
