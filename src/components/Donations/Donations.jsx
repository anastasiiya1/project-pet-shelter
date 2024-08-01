import styles from './Donations.module.css';

function Donations() {
  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Donations</h1>
      <p className={styles.description}>Your support helps us continue our mission. Thank you for your generosity!</p>
      <div className={styles.buttonGroup}>
        <button className={styles.donateButton}>Donate Now</button>
        <button className={styles.learnMoreButton}>Learn More</button>
      </div>
    </div>
  );
}

export default Donations;