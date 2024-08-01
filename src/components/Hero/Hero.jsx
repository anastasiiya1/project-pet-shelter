import styles from './Hero.module.css'

function Hero() {
    return (
        <div className={styles.hero}>
            <h1> Find Your New Friend and Give Them a Loving Home</h1>
            <p>We are activists and animal lovers who created this platform to help animals find homes.</p>
            <div className={styles.btns}>
            <button>Adopt a friend</button>
            <button>Donate</button>
            </div>
        </div>
    );
}

export default Hero;
