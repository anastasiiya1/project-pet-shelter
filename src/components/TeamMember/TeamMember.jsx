import styles from './TeamMember.module.css';

function TeamMember() {
    return (
        <div className={styles.teamMember}>
            <img
                src="https://t3.ftcdn.net/jpg/01/59/17/98/240_F_159179817_F8joMJLDzGCjFSENf7ectW43ZJ7mlXvr.jpg"
                alt="member.name"
                className={styles.image}
            />
            <h5 className={styles.name}>Name</h5>
            <p className={styles.position}>Position</p>
        </div>
    );
}

export default TeamMember;