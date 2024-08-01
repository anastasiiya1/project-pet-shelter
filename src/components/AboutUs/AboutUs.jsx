import styles from './AboutUs.module.css';

function AboutUs() {
    return (
        <>
            <h2 className={styles.header}>About us</h2>
            <div className={styles.container}>
                <div className={styles.imageWrapper}>
                    <img
                        src="https://as1.ftcdn.net/v2/jpg/05/59/55/28/1000_F_559552850_Qca6ZAulEZk0Lm7TrceTdBI3D2YwRM1b.jpg"
                        alt="About us"
                        className={styles.image}
                    />
                </div>
                <div className={styles.textWrapper}>
                    <h3>Our mission</h3>
                    <p>
                        We are activists and animal lovers who created this platform to help animals find homes. Our
                        goal is to support shelters and volunteers by increasing visibility for their wards, so they can
                        be adopted or receive financial assistance.
                    </p>
                </div>
            </div>
        </>
    );
}

export default AboutUs;
