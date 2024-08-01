import styles from './AnimalCard.module.css';

function AnimalCard({children}) {
    return (
        <div className={styles.card}>
            <img
                src="https://t3.ftcdn.net/jpg/01/59/17/98/240_F_159179817_F8joMJLDzGCjFSENf7ectW43ZJ7mlXvr.jpg"
                alt="animal.name"
            />
            <h3>{children}</h3>
        </div>
    );
}

export default AnimalCard;
