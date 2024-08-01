import TeamMember from "../TeamMember/TeamMember";
import styles from './OurTeam.module.css';

function OurTeam() {
    return (
        <div className={styles.container}>
            <h2 className={styles.header}>Who are we?</h2>
            <h3 className={styles.subHeader}>We help animals find homes by supporting shelters and volunteers</h3>
            <div className={styles.teamMembers}>
                <TeamMember />
                <TeamMember />
                <TeamMember />
                <TeamMember />
            </div>
			<button className={styles.btn}>More</button>
        </div>
    );
}

export default OurTeam;