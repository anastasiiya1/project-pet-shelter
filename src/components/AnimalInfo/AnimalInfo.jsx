import styles from './AnimalInfo.module.css';

function AnimalInfo() {
    return (
        <div className={styles.card}>
            <div className={styles.imageContainer}>
                <img
                    src="https://t3.ftcdn.net/jpg/01/59/17/98/240_F_159179817_F8joMJLDzGCjFSENf7ectW43ZJ7mlXvr.jpg"
                    alt="animal.name"
                    className={styles.image}
                />
            </div>
            <div className={styles.info}>
                <div className={styles.headerRow}>
                    <h3 className={styles.title}>Name, years</h3>
                    <button className={styles.favoriteButton}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                            fill="currentColor"
                        >
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                        </svg>
                    </button>
                </div>
                <p className={styles.description}>animal description</p>
                <div className={styles.actionButtons}>
                    <button className={styles.meetButton}>MEET</button>
                    <button className={styles.donateButton}>DONATE</button>
                </div>
            </div>
        </div>
    );
}

export default AnimalInfo;